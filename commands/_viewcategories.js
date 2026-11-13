/*CMD
  command: /viewcategories
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
var region = Bot.getProperty("category_region_" + uid);

if (!region) {
  Bot.sendMessage("❌ Select region first.");
  return;
}

var categories = [
  { id: "paid_channel", name: "📺 Paid Channel" },
  { id: "premium_services", name: "💎 Premium Services" },
  { id: "premium_group", name: "👥 Premium Group" }
];

var custom = Bot.getProperty("custom_categories_" + region, []);

if (Array.isArray(custom)) {
  categories = categories.concat(custom);
}

var output = "📋 " + region.toUpperCase() + " CATEGORIES\n\n";

for (var i = 0; i < categories.length; i++) {
  output += (i + 1) + ". " + categories[i].name + "\n";
}

Bot.sendMessage(output);

