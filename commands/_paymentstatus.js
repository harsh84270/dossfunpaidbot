/*CMD
  command: /paymentstatus
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

var userId = String(user.telegramid);
var paymentIds = Bot.getProperty("pending_payment_list", []);

if (!Array.isArray(paymentIds)) {
  paymentIds = [];
}

var latestPayment = null;
var latestTime = 0;

for (var i = 0; i < paymentIds.length; i++) {
  var paymentId = paymentIds[i];
  var payment = Bot.getProperty("payment_" + paymentId);

  if (!payment) {
    continue;
  }

  if (String(payment.user_id) !== userId) {
    continue;
  }

  var createdAt = Number(payment.created_at || 0);

  if (!latestPayment || createdAt >= latestTime) {
    latestPayment = payment;
    latestTime = createdAt;
  }
}

if (!latestPayment) {
  Bot.sendMessage(
    "💳 Payment Status\n\nAapki koi payment submission nahi mili.\nPlan select karke payment screenshot submit karein."
  );
  return;
}

var status = String(latestPayment.status || "pending").toLowerCase();
var statusText = "⏳ Pending";

if (status === "approved") {
  statusText = "✅ Approved";
} else if (status === "rejected") {
  statusText = "❌ Rejected";
}

var message =
  "💳 Payment Status\n\n" +
  "📦 Plan: " + (latestPayment.plan_name || "Premium Plan") + "\n" +
  "💰 Amount: " + (latestPayment.currency || "") + " " + (latestPayment.price || "") + "\n" +
  "📌 Status: " + statusText;

if (status === "pending") {
  message += "\n\nAdmin aapki payment verify kar raha hai. Please wait.";
} else if (status === "approved") {
  message += "\n\nPayment approved hai. Group invite link approval message mein check karein.";
} else if (status === "rejected") {
  message += "\n\nPayment reject hui hai. Correct payment screenshot ke saath dobara submit kar sakte hain.";
}

Bot.sendMessage(message);
