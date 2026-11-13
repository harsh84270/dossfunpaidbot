/*CMD
  command: /rejectpayment
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

var paymentId = params;

if (Array.isArray(paymentId)) {
  paymentId = paymentId[0];
}

if (!paymentId) {
  Bot.sendMessage("❌ Payment ID missing.");
  return;
}

var payment = Bot.getProperty("payment_" + paymentId);

if (!payment) {
  Bot.sendMessage("❌ Payment request not found.");
  return;
}

if (payment.status !== "pending") {
  Bot.sendMessage(
    "⚠️ This payment has already been processed.\nStatus: " +
    payment.status
  );
  return;
}

payment.status = "rejected";
payment.rejected_at = new Date().getTime();

Bot.setProperty("payment_" + paymentId, payment, "json");

Bot.sendMessage(
  "❌ PAYMENT REJECTED\n\n" +
  "Payment ID: " + paymentId + "\n" +
  "User: " + payment.user_name + "\n" +
  "Plan: " + payment.plan_name
);

Bot.sendMessageToChatWithId(
  payment.user_id,
  "❌ YOUR PAYMENT WAS REJECTED\n\n" +
  "💎 Plan: " + payment.plan_name + "\n" +
  "💰 Amount: " + payment.currency + payment.price + "\n\n" +
  "Please contact the admin if you believe this was a mistake."
);
