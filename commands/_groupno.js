/*CMD
  command: /groupno
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

var uid = user.telegramid;

Bot.setProperty("draft_plan_group_access_" + uid, "no", "string");
Bot.setProperty("draft_plan_group_link_" + uid, "not_required", "string");

Bot.runCommand("/saveplan");
