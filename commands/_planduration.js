/*CMD
  command: /planduration
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

  <<ANSWER

⏳ Enter plan duration (Example: 7 Days, 2 Months, Lifetime)
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

var duration = message.trim();

if (duration.length < 2) {
  Bot.sendMessage("❌ Duration too short. Please try again.");
  return;
}

Bot.setProperty(
  "draft_plan_duration_" + user.telegramid,
  duration,
  "string"
);

Bot.sendMessage(
  "✅ Duration saved: " + duration
);

Bot.runCommand("/groupaccesschoice");

