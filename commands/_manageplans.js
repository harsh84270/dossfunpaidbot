/*CMD
  command: /manageplans
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

var planList = Bot.getProperty("premium_plan_list", []);

if (!Array.isArray(planList) || planList.length === 0) {
  Bot.sendMessage("📭 No plans saved yet.");
  return;
}

var buttons = [];

for (var i = 0; i < planList.length; i++) {
  var plan = Bot.getProperty("premium_plan_" + planList[i]);

  if (!plan) continue;

  var region = plan.region === "india" ? "🇮🇳" : "🌍";

  buttons.push([{
    title: region + " " + plan.name + " - " + plan.currency + plan.price,
    command: "/planview " + plan.id
  }]);
}

Bot.sendInlineKeyboard(
  buttons,
  "📋 YOUR SAVED PLANS\n\nSelect a plan to view details:"
);

