/*CMD
  command: /selectcategory
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
var categoryId = String(params || "").trim();

var region = Bot.getProperty("selected_region_" + uid);

if (!region) {
  Bot.sendMessage("❌ Please select your region first.");
  return;
}

var categories = [
  { id: "paid_channel", name: "📺 Paid Channel" },
  { id: "premium_services", name: "💎 Premium Services" },
  { id: "premium_group", name: "👥 Premium Group" }
];

var customCategories = Bot.getProperty(
  "custom_categories_" + region,
  []
);

if (Array.isArray(customCategories)) {
  categories = categories.concat(customCategories);
}

var selected = null;

for (var i = 0; i < categories.length; i++) {
  if (String(categories[i].id) === categoryId) {
    selected = categories[i];
    break;
  }
}

if (!selected) {
  Bot.sendMessage("❌ Category not found.");
  return;
}

Bot.setProperty(
  "selected_category_" + uid,
  categoryId,
  "string"
);

Bot.sendMessage(
  "✅ Category selected: " + selected.name
);

Bot.runCommand("/categoryplans");

