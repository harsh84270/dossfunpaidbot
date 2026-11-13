/*CMD
  command: /createplanindia
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

Bot.setProperty(
  "draft_plan_region_" + user.telegramid,
  "india",
  "string"
);

Bot.runCommand("/plancategory");

