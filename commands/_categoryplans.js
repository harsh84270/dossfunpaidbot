/*CMD
  command: /categoryplans
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


var uid = String(user.telegramid);

var region = Bot.getProperty("selected_region_" + uid);
var categoryId = Bot.getProperty("selected_category_" + uid);

if (!region || !categoryId) {
  Bot.sendMessage("❌ Region ya category select nahi hui.");
  return;
}

var planIds = Bot.getProperty("premium_plan_list", []);

if (!Array.isArray(planIds)) {
  planIds = [];
}

var buttons = [];
var found = 0;

for (var i = 0; i < planIds.length; i++) {
  var plan = Bot.getProperty("premium_plan_" + planIds[i]);

  if (!plan) {
    continue;
  }

  var planRegion = String(plan.region || "").toLowerCase();
  var planCategory = String(plan.category_id || "");

  if (
    planRegion === region &&
    planCategory === categoryId
  ) {
    buttons.push([
      {
        title: "📦 " + plan.name + " — " +
          (plan.currency || "") + plan.price,
        command: "/buyplan " + plan.id
      }
    ]);

    found++;
  }
}

if (found === 0) {
  Bot.sendMessage(
    "😕 Is category mein abhi koi plan available nahi hai.\n\n" +
    "Please another category select karo."
  );

  Bot.runCommand("/usercategories");
  return;
}

buttons.push([
  { title: "⬅️ Back to Categories", command: "/usercategories" }
]);

Bot.sendInlineKeyboard(
  buttons,
  "📋 AVAILABLE PLANS\n\n" +
  "🌍 Region: " + region + "\n" +
  "📂 Category: " + categoryId + "\n\n" +
  "Apna plan select karo:"
);

