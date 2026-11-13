/*CMD
  command: /usercategories
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

if (region !== "india" && region !== "international") {
  Bot.sendMessage("❌ Please select your region first.");
  return;
}

// Default categories
var categories = [
  { id: "paid_channel", name: "📺 Paid Channel" },
  { id: "premium_services", name: "💎 Premium Services" },
  { id: "premium_group", name: "👥 Premium Group" }
];

// Add admin-created categories
var customCategories = Bot.getProperty(
  "custom_categories_" + region,
  []
);

if (Array.isArray(customCategories)) {
  for (var i = 0; i < customCategories.length; i++) {
    categories.push(customCategories[i]);
  }
}

var buttons = [];

for (var j = 0; j < categories.length; j++) {
  buttons.push([
    {
      title: categories[j].name,
      command: "/selectcategory " + categories[j].id
    }
  ]);
}

buttons.push([
  { title: "⬅️ Back", command: "/buyplanmenu" }
]);

Bot.sendInlineKeyboard(
  buttons,
  "📂 SELECT CATEGORY\n\nChoose the category for " +
  (region === "india" ? "🇮🇳 India" : "🌍 International") +
  " plans:"
);

