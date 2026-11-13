/*CMD
  command: /india
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



var region = "india";
User.setProperty("selected_region", region, "string");

var planList = Bot.getProperty("premium_plan_list", []);
var buttons = [];

if (!Array.isArray(planList)) {
  planList = [];
}

for (var i = 0; i < planList.length; i++) {
  var plan = Bot.getProperty("premium_plan_" + planList[i]);

  if (!plan || plan.region !== region) {
    continue;
  }

  buttons.push([{
    title: plan.name + " - " + plan.currency + plan.price,
    command: "/buyplan " + plan.id
  }]);
}

if (buttons.length === 0) {
  Bot.sendMessage("🇮🇳 India plans abhi available nahi hain.");
  return;
}

Bot.sendInlineKeyboard(
  buttons,
  "🇮🇳 INDIA PLANS\n\nApna preferred subscription plan select karo:"
);
