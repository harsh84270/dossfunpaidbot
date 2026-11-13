/*CMD
  command: /checkexpiry
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

var now = new Date().getTime();
var paymentList = Bot.getProperty("pending_payment_list", []);

if (!Array.isArray(paymentList)) {
  paymentList = [];
}

var checked = 0;
var expired = 0;

for (var i = 0; i < paymentList.length; i++) {
  var paymentId = paymentList[i];
  var payment = Bot.getProperty("payment_" + paymentId);

  if (!payment || payment.status !== "approved") {
    continue;
  }

  if (payment.is_lifetime || !payment.expiry_time) {
    continue;
  }

  checked++;

  if (now >= payment.expiry_time) {
    payment.status = "expired";
    payment.expired_at = now;

    Bot.setProperty("payment_" + paymentId, payment, "json");

    var subKey =
      "subscription_" + payment.user_id + "_" + paymentId;

    var subscription = Bot.getProperty(subKey);

    if (subscription) {
      subscription.status = "expired";
      subscription.expired_at = now;
      Bot.setProperty(subKey, subscription, "json");
    }

    Bot.sendMessageToChatWithId(
      payment.user_id,
      "⏰ YOUR SUBSCRIPTION HAS EXPIRED\n\n" +
      "💎 Plan: " + payment.plan_name + "\n\n" +
      "Your subscription period has ended. Please purchase a plan again to continue."
    );

    expired++;
  }
}

Bot.sendMessage(
  "⏳ EXPIRY CHECK COMPLETED\n\n" +
  "Subscriptions checked: " + checked + "\n" +
  "Expired: " + expired + "\n\n" +
  "Note: This command updates subscription status and notifies users. It does not automatically remove members from Telegram groups."
);
