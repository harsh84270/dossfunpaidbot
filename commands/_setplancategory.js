/*CMD
  command: /setplancategory
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
var categoryId = String(params || "").trim();

if (!region || !categoryId) {
  Bot.sendMessage("❌ Region or category missing.");
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
  "draft_plan_category_id_" + uid,
  selected.id,
  "string"
);

Bot.setProperty(
  "draft_plan_category_name_" + uid,
  selected.name,
  "string"
);

Bot.sendMessage(
  "✅ Category selected!\n\n" +
  selected.name + "\n\n" +
  "Now enter your plan name."
);

Bot.runCommand("/planname");

