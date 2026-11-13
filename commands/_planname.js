/*CMD
  command: /planname
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

  <<ANSWER

📝 Enter your new plan name (Example: Premium 7 Days)
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

var planName = message.trim();

if (planName.length < 2) {
  Bot.sendMessage("❌ Plan name too short. Please try again.");
  return;
}

Bot.setProperty(
  "draft_plan_name_" + user.telegramid,
  planName,
  "string"
);

Bot.sendMessage("✅ Plan name saved: " + planName);

Bot.runCommand("/planprice");

