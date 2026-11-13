/*CMD
  command: /addcategory
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

  <<ANSWER
Nayi category ka naam bhejo.
Example: VIP Channel, VIP Group, Special Services
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
var region = Bot.getProperty("category_region_" + uid);

if (region !== "india" && region !== "international") {
  Bot.sendMessage("❌ Region not found.");
  return;
}

var categoryName = String(message || "").trim();

if (categoryName.length < 2 || categoryName.length > 40) {
  Bot.sendMessage("❌ Category name 2 se 40 characters ka hona chahiye.");
  return;
}

var categories = Bot.getProperty("custom_categories_" + region, []);

if (!Array.isArray(categories)) {
  categories = [];
}

for (var i = 0; i < categories.length; i++) {
  if (String(categories[i].name).toLowerCase() === categoryName.toLowerCase()) {
    Bot.sendMessage("⚠️ Ye category pehle se available hai.");
    Bot.runCommand("/plancategory");
    return;
  }
}

var categoryId = "custom_" + Date.now();

categories.push({
  id: categoryId,
  name: categoryName
});

Bot.setProperty("custom_categories_" + region, categories, "json");

Bot.sendMessage(
  "✅ NEW CATEGORY ADDED!\n\n" +
  "📂 " + categoryName + "\n" +
  "🌍 Region: " + region + "\n\n" +
  "Ab apni category select karo."
);

Bot.runCommand("/plancategory");

