/*CMD
  command: /duration7
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
  "draft_plan_duration_" + user.telegramid,
  "7 Days",
  "string"
);

Bot.sendMessage("✅ Duration selected: 7 Days");

Bot.runCommand("/groupaccesschoice");

