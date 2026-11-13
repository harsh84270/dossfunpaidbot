/*CMD
  command: /viewgrouplink
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

var link = Bot.getProperty("premium_group_link");

if (!link) {
  Bot.sendMessage("⚠️ Abhi group link set nahi hai.");
  return;
}

Bot.sendMessage("🔗 Current Premium Group Link:\n" + link);
