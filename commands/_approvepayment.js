/*CMD
  command: /approvepayment
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var ADMIN_ID = "8587100887";

if (String(user.telegramid) !== ADMIN_ID) {
  Bot.sendMessage("⛔ Admin only.");
  return;
}

var paymentId = String(params || "").trim();

if (!paymentId) {
  Bot.sendMessage("❌ Payment ID missing.");
  return;
}

var payment = Bot.getProperty("payment_" + paymentId);

if (!payment) {
  Bot.sendMessage("❌ Payment record nahi mila.");
  return;
}

if (String(payment.status).toLowerCase() !== "pending") {
  Bot.sendMessage(
    "⚠️ Ye payment already process ho chuki hai.\nStatus: " +
    payment.status
  );
  return;
}

// Get the original plan's saved group link
var plan = Bot.getProperty("premium_plan_" + String(payment.plan_id));

if (!plan) {
  Bot.sendMessage(
    "❌ Original plan record nahi mila.\nPayment approve nahi hui."
  );
  return;
}

// Always use the selected plan's own group link
var finalGroupLink = plan.group_link || "";

// Duration calculation
var durationText = String(payment.duration || "").trim().toLowerCase();
var now = Date.now();
var expiryTime = 0;
var isLifetime = false;

if (
  durationText.indexOf("lifetime") !== -1 ||
  durationText.indexOf("life time") !== -1
) {
  isLifetime = true;
} else {
  var match = durationText.match(
    /(\d+)\s*(hour|hours|hr|hrs|day|days|week|weeks|month|months|year|years)/i
  );

  if (!match) {
    Bot.sendMessage(
      "❌ Duration format samajh nahi aaya: " +
      payment.duration +
      "\nPayment approve nahi hui."
    );
    return;
  }

  var amount = parseInt(match[1], 10);
  var unit = match[2].toLowerCase();
  var milliseconds = 0;

  if (unit.indexOf("hour") === 0 || unit.indexOf("hr") === 0) {
    milliseconds = amount * 60 * 60 * 1000;
  } else if (unit.indexOf("day") === 0) {
    milliseconds = amount * 24 * 60 * 60 * 1000;
  } else if (unit.indexOf("week") === 0) {
    milliseconds = amount * 7 * 24 * 60 * 60 * 1000;
  } else if (unit.indexOf("month") === 0) {
    milliseconds = amount * 30 * 24 * 60 * 60 * 1000;
  } else if (unit.indexOf("year") === 0) {
    milliseconds = amount * 365 * 24 * 60 * 60 * 1000;
  }

  expiryTime = now + milliseconds;
}

// Update payment
payment.status = "approved";
payment.approved_at = now;
payment.is_lifetime = isLifetime;
payment.expiry_time = isLifetime ? 0 : expiryTime;
payment.group_link = finalGroupLink;

Bot.setProperty("payment_" + paymentId, payment, "json");

// Save subscription
var subscription = {
  payment_id: paymentId,
  user_id: String(payment.user_id),
  plan_id: payment.plan_id,
  plan_name: payment.plan_name,
  price: payment.price,
  currency: payment.currency,
  duration: payment.duration,
  status: "active",
  start_time: now,
  expiry_time: isLifetime ? 0 : expiryTime,
  is_lifetime: isLifetime,
  group_access: payment.group_access,
  group_link: finalGroupLink
};

Bot.setProperty(
  "subscription_" + String(payment.user_id) + "_" + paymentId,
  subscription,
  "json"
);

// Notify user
var userMessage =
  "✅ Payment Approved!\n\n" +
  "📦 Plan: " + (payment.plan_name || "Premium Plan") + "\n" +
  "💰 Amount: " + (payment.currency || "") + " " + (payment.price || "") + "\n" +
  "⏳ Duration: " + (payment.duration || "N/A") + "\n\n" +
  "Your subscription is now active.";

if (
  String(payment.group_access).toLowerCase() === "yes" &&
  finalGroupLink
) {
  userMessage +=
    "\n\n🔗 Your Plan's Group Join Link:\n" + finalGroupLink;
}

Api.sendMessage({
  chat_id: payment.user_id,
  text: userMessage
});

Bot.sendMessage(
  "✅ Payment approved successfully.\n\n" +
  "Payment ID: " + paymentId +
  (finalGroupLink
    ? "\n✅ Original plan group link sent."
    : "\n⚠️ This plan has no group link.")
);
