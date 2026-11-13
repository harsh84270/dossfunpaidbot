/*CMD
  command: /pendingpayments
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

var paymentList = Bot.getProperty("pending_payment_list", []);

if (!Array.isArray(paymentList) || paymentList.length === 0) {
  Bot.sendMessage("📭 No payment requests found.");
  return;
}

var buttons = [];
var pendingCount = 0;

for (var i = paymentList.length - 1; i >= 0; i--) {
  var paymentId = paymentList[i];
  var payment = Bot.getProperty("payment_" + paymentId);

  if (!payment || payment.status !== "pending") {
    continue;
  }

  pendingCount++;

  buttons.push([{
    title: "⏳ " + payment.user_name + " - " +
      payment.currency + payment.price + " (" + payment.plan_name + ")",
    command: "/paymentview " + paymentId
  }]);
}

if (pendingCount === 0) {
  Bot.sendMessage("✅ No pending payments right now.");
  return;
}

Bot.sendInlineKeyboard(
  buttons,
  "⏳ PENDING PAYMENTS\n\n" +
  "Pending requests: " + pendingCount + "\n\n" +
  "Select a payment to view its details:"
);
