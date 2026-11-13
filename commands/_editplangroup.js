/*CMD
  command: /editplangroup
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

var planId = String(params || "").trim();
var plan = Bot.getProperty("premium_plan_" + planId);

if (!plan) {
  Bot.sendMessage("❌ Plan nahi mila.");
  return;
}

if (String(plan.group_access).toLowerCase() !== "yes") {
  Bot.sendMessage("⚠️ Is plan mein group access enabled nahi hai.");
  return;
}

User.setProperty("editing_group_link_plan_id", planId, "string");
User.setProperty("waiting_for_plan_group_link", true, "boolean");

Bot.sendMessage(
  "📦 Plan: " + plan.name + "\n" +
  "🌍 Region: " + plan.region + "\n\n" +
  "Current link:\n" + (plan.group_link || "Not set") +
  "\n\nAb is plan ka naya Telegram invite link bhejo:"
);
