/*CMD
  command: /setaboutme
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

  <<ANSWER
Apni About Me details bhejo.

Example:

👋 Welcome to my Premium Bot!

📌 I provide premium subscriptions and services.

📩 Contact Admin: @YourUsername
💬 Support: @YourSupportUsername

Thank you for choosing us!
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

var details = String(message || "").trim();

if (details.length < 5) {
  Bot.sendMessage("❌ Please enter valid About Me details.");
  return;
}

if (details.length > 3500) {
  Bot.sendMessage("❌ Details bahut lambi hain. 3500 characters tak rakho.");
  return;
}

Bot.setProperty("public_about_me", details, "string");

Bot.sendMessage(
  "✅ ABOUT ME DETAILS SAVED!\n\n" +
  "Ab users ko About Me button par ye details dikhenगी."
);

Bot.runCommand("/aboutmeadmin");

