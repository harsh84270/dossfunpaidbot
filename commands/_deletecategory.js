/*CMD
  command: /deletecategory
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

var uid = String(user.telegramid);
var region = Bot.getProperty("draft_plan_region_" + uid);

if (region !== "india" && region !== "international") {
  Bot.sendMessage("❌ Pehle Create Plan mein region select karo.");
  return;
}

var categories = Bot.getProperty("custom_categories_" + region, []);

if (!Array.isArray(categories) || categories.length === 0) {
  Bot.sendMessage("❌ Is region mein koi custom category nahi hai.");
  return;
}

var buttons = [];

for (var i = 0; i < categories.length; i++) {
  buttons.push([{
    title: "🗑️ " + categories[i].name,
    command: "/confirmdeletecategory " + categories[i].id
  }]);
}

buttons.push([{
  title: "⬅️ Back",
  command: "/plancategory"
}]);

Bot.sendInlineKeyboard(
  buttons,
  "🗑️ DELETE CATEGORY\n\n" +
  "Region: " + region + "\n\n" +
  "Select the category you want to delete:"
);

