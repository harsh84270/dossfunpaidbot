/*CMD
  command: /mysubscription
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
var found = false;
var message = "👤 My Subscription\n\n";

if (!Array.isArray(paymentIds)) {
  paymentIds = [];
}

for (var i = 0; i < paymentIds.length; i++) {
  var paymentId = paymentIds[i];
  var payment = Bot.getProperty("payment_" + paymentId);

  if (!payment) {
    continue;
  }

  if (String(payment.user_id) !== userId) {
    continue;
  }

  if (payment.status !== "approved") {
    continue;
  }

  found = true;

  message += "📦 Plan: " + (payment.plan_name || "Premium Plan") + "\n";
  message += "💰 Price: " + (payment.currency || "") + " " + (payment.price || "") + "\n";
  message += "⏳ Duration: " + (payment.duration || "N/A") + "\n";

  if (payment.is_lifetime) {
    message += "📅 Validity: Lifetime\n";
    message += "🟢 Status: Active\n";
  } else if (payment.expiry_time) {
    var expiry = Number(payment.expiry_time);
    var expiryDate = new Date(expiry);
    var now = Date.now();

    message += "📅 Expires: " + expiryDate.toLocaleString() + "\n";

    if (expiry > now) {
      message += "🟢 Status: Active\n";
    } else {
      message += "🔴 Status: Expired\n";
    }
  } else {
    message += "📅 Validity: Not available\n";
  }

  message += "\n";
}

if (!found) {
  message = "👤 My Subscription\n\nYou don't have any approved subscription yet.";
}

Bot.sendMessage(message);
