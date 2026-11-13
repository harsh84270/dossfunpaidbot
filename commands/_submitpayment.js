/*CMD
  command: /submitpayment
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: 📸 Please send your payment screenshot as a photo here.

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var adminId = "8587100887";
var planId = User.getProperty("selected_plan_id");

if (!planId) {
  Bot.sendMessage("❌ Please select a plan first.");
  return;
}

var plan = Bot.getProperty("premium_plan_" + planId);

if (!plan) {
  Bot.sendMessage("❌ Plan not found. Please select your plan again.");
  return;
}

if (!request.photo || request.photo.length === 0) {
  Bot.sendMessage("❌ Please send the screenshot as a PHOTO, not as a file.");
  return;
}

var photos = request.photo;
var photoFileId = photos[photos.length - 1].file_id;

var paymentId = "PAY_" + new Date().getTime();

var payment = {
  id: paymentId,
  user_id: String(user.telegramid),
  user_name: user.first_name || "User",
  plan_id: plan.id,
  plan_name: plan.name,
  price: plan.price,
  currency: plan.currency,
  duration: plan.duration,
  group_access: plan.group_access,
  group_link: plan.group_link || "",
  screenshot: photoFileId,
  status: "pending",
  created_at: new Date().getTime()
};

Bot.setProperty("payment_" + paymentId, payment, "json");

var pendingList = Bot.getProperty("pending_payment_list", []);
if (!Array.isArray(pendingList)) {
  pendingList = [];
}

pendingList.push(paymentId);
Bot.setProperty("pending_payment_list", pendingList, "json");

var caption =
  "🔔 NEW PAYMENT REQUEST\n\n" +
  "🆔 Payment ID: " + paymentId + "\n" +
  "👤 User: " + payment.user_name + "\n" +
  "🆔 User ID: " + payment.user_id + "\n" +
  "💎 Plan: " + payment.plan_name + "\n" +
  "💰 Amount: " + payment.currency + payment.price + "\n" +
  "⏳ Duration: " + payment.duration + "\n" +
  "📌 Status: Pending Approval";

Api.sendPhoto({
  chat_id: adminId,
  photo: photoFileId,
  caption: caption
});

var adminButtons = [
  [
    {
      title: "✅ Approve",
      command: "/approvepayment " + paymentId
    },
    {
      title: "❌ Reject",
      command: "/rejectpayment " + paymentId
    }
  ]
];

Bot.sendInlineKeyboardToChatWithId(
  adminId,
  adminButtons,
  "👇 Admin action for Payment ID:\n" + paymentId
);

Bot.sendMessage(
  "✅ Screenshot received successfully!\n\n" +
  "Your payment is pending admin verification.\n" +
  "You will be notified after approval."
);
