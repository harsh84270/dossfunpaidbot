/*CMD
  command: /categoryregion
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

var region = String(params || "").trim();
var uid = String(user.telegramid);

if (region !== "india" && region !== "international") {
  Bot.sendMessage("❌ Invalid region.");
  return;
}

Bot.setProperty("category_region_" + uid, region, "string");

var buttons = [
  [{ title: "➕ Add New Category", command: "/addcategory" }],
  [{ title: "📋 View Categories", command: "/viewcategories" }],
  [{ title: "⬅️ Back", command: "/categorymanager" }]
];

Bot.sendInlineKeyboard(
  buttons,
  "📂 CATEGORY MANAGER\n\n" +
  "Selected Region: " + region + "\n\n" +
  "Choose an action:"
);

