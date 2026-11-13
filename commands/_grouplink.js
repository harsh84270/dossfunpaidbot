/*CMD
  command: /grouplink
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: 🔗 Please send your Telegram group invite link.

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

var groupLink = message.trim();

if (
  groupLink.indexOf("https://t.me/") !== 0 &&
  groupLink.indexOf("http://t.me/") !== 0
) {
  Bot.sendMessage(
    "❌ Invalid Telegram link!\n\nPlease send a valid link starting with https://t.me/"
  );
  return;
}

Bot.setProperty(
  "draft_plan_group_link_" + user.telegramid,
  groupLink,
  "string"
);

Bot.sendMessage("✅ Group invite link saved!");

Bot.runCommand("/saveplan");

