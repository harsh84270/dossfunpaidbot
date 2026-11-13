/*CMD
  command: /addcategoryfromplan
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
  Bot.sendMessage("❌ Plan region not found.");
  return;
}

Bot.setProperty("category_region_" + uid, region, "string");

Bot.runCommand("/addcategory");

