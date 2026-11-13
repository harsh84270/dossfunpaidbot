/*CMD
  command: /confirmdeletecategory
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

if (region !== "india" && region !== "international") {
  Bot.sendMessage("❌ Invalid region.");
  return;
}

if (!categoryId) {
  Bot.sendMessage("❌ Category ID missing.");
  return;
}

// Get custom categories
var categories = Bot.getProperty("custom_categories_" + region, []);

if (!Array.isArray(categories)) {
  categories = [];
}

var deletedName = "";
var updatedCategories = [];

for (var i = 0; i < categories.length; i++) {
  if (String(categories[i].id) === categoryId) {
    deletedName = categories[i].name;
  } else {
    updatedCategories.push(categories[i]);
  }
}

if (!deletedName) {
  Bot.sendMessage("❌ Category not found or already deleted.");
  return;
}

// Get all plan IDs
var planIds = Bot.getProperty("premium_plan_list", []);

if (!Array.isArray(planIds)) {
  planIds = [];
}

var updatedPlanIds = [];
var deletedPlans = 0;

// Delete all plans belonging to this category and region
for (var j = 0; j < planIds.length; j++) {
  var id = String(planIds[j]);
  var plan = Bot.getProperty("premium_plan_" + id);

  if (
    plan &&
    String(plan.region).toLowerCase() === region &&
    String(plan.category_id) === categoryId
  ) {
    Bot.setProperty("premium_plan_" + id, "", "string");
    deletedPlans++;
  } else {
    updatedPlanIds.push(id);
  }
}

// Save updated category list and plan list
Bot.setProperty(
  "custom_categories_" + region,
  updatedCategories,
  "json"
);

Bot.setProperty(
  "premium_plan_list",
  updatedPlanIds,
  "json"
);

Bot.sendMessage(
  "🗑️ CATEGORY AND PLANS DELETED!\n\n" +
  "📂 Category: " + deletedName + "\n" +
  "🌍 Region: " + region + "\n" +
  "📦 Plans deleted: " + deletedPlans + "\n\n" +
  "✅ Deleted plans will no longer appear in the user plan list."
);

Bot.runCommand("/plancategory");

