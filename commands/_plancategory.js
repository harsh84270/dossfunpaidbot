/*CMD
  command: /plancategory
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
  Bot.sendMessage("❌ Region not found.");
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

var buttons = [];

for (var i = 0; i < categories.length; i++) {
  buttons.push([{
    title: categories[i].name,
    command: "/setplancategory " + categories[i].id
  }]);
}

buttons.push([
  { title: "➕ Add New Category", command: "/addcategoryfromplan" }
]);

buttons.push([
  { title: "🗑️ Delete Category", command: "/deletecategory" }
]);

Bot.sendInlineKeyboard(
  buttons,
  "📂 SELECT PLAN CATEGORY\n\n" +
  "Region: " + region + "\n\n" +
  "Select, add or delete a category:"
);

