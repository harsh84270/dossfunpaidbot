/*CMD
  command: /deleteplan
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

var planId = params;

if (Array.isArray(planId)) {
  planId = planId[0];
}

if (!planId) {
  Bot.sendMessage("❌ Plan ID missing.");
  return;
}

var plan = Bot.getProperty("premium_plan_" + planId);

if (!plan) {
  Bot.sendMessage("❌ Plan not found. It may already be deleted.");
  return;
}

var planList = Bot.getProperty("premium_plan_list", []);

if (!Array.isArray(planList)) {
  planList = [];
}

var updatedList = [];

for (var i = 0; i < planList.length; i++) {
  if (String(planList[i]) !== String(planId)) {
    updatedList.push(planList[i]);
  }
}

Bot.setProperty("premium_plan_list", updatedList, "json");
Bot.setProperty("premium_plan_" + planId, null, "json");

Bot.sendMessage(
  "🗑️ PLAN DELETED SUCCESSFULLY\n\n" +
  "💎 Plan: " + plan.name + "\n" +
  "🌍 Region: " + (plan.region === "india" ? "India" : "International") + "\n" +
  "💰 Price: " + plan.currency + plan.price
);

Bot.runCommand("/manageplans");

