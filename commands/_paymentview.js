/*CMD
  command: /paymentview
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

var details =
  "🧾 PAYMENT DETAILS\n\n" +
  "🆔 Payment ID: " + payment.id + "\n" +
  "👤 User: " + payment.user_name + "\n" +
  "🆔 User ID: " + payment.user_id + "\n" +
  "💎 Plan: " + payment.plan_name + "\n" +
  "💰 Amount: " + payment.currency + payment.price + "\n" +
  "⏳ Duration: " + payment.duration + "\n" +
  "📌 Status: " + payment.status;

if (payment.status !== "pending") {
  Bot.sendMessage(details + "\n\n⚠️ This payment is already processed.");
  return;
}

var buttons = [
  [
    {
      title: "✅ Approve",
      command: "/approvepayment " + paymentId
    },
    {
      title: "❌ Reject",
      command: "/rejectpayment " + paymentId
    }
  ],
  [
    {
      title: "⬅️ Back to Pending",
      command: "/pendingpayments"
    }
  ]
];

Bot.sendInlineKeyboard(buttons, details);
