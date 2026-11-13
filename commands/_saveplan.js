/*CMD
  command: /saveplan
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

// Read plan details
var region = Bot.getProperty("draft_plan_region_" + uid);
var name = Bot.getProperty("draft_plan_name_" + uid);
var price = Bot.getProperty("draft_plan_price_" + uid);
var currency = Bot.getProperty("draft_plan_currency_" + uid);
var duration = Bot.getProperty("draft_plan_duration_" + uid);
var groupAccess = Bot.getProperty("draft_plan_group_access_" + uid);
var groupLink = Bot.getProperty("draft_plan_group_link_" + uid);

// Read selected category
var categoryId = Bot.getProperty("draft_plan_category_id_" + uid);
var categoryName = Bot.getProperty("draft_plan_category_name_" + uid);

// Validate details
if (
  !region || !name || price === undefined || price === null ||
  price === "" || !duration || !groupAccess ||
  !categoryId || !categoryName
) {
  Bot.sendMessage(
    "❌ Plan details incomplete hain.\n\n" +
    "Please Create Plan se dobara start karo."
  );
  return;
}

// Currency
if (!currency) {
  currency = String(region).toLowerCase() === "india" ? "₹" : "$";
}

// Unique plan ID
var planId = String(Date.now());

// Create plan
var plan = {
  id: planId,
  name: name,
  price: price,
  currency: currency,
  region: region,
  category_id: categoryId,
  category_name: categoryName,
  duration: duration,
  group_access: groupAccess,
  group_link: groupLink || "not_required"
};

// Save plan
Bot.setProperty("premium_plan_" + planId, plan, "json");

// Update plan list
var planIds = Bot.getProperty("premium_plan_list", []);

if (!Array.isArray(planIds)) {
  planIds = [];
}

if (planIds.indexOf(planId) === -1) {
  planIds.push(planId);
}

Bot.setProperty("premium_plan_list", planIds, "json");

// Unique plan link
var planLink =
  "https://t.me/Dossfunrobot?start=plan_" + planId;

// Clear draft data
var draftKeys = [
  "draft_plan_region_",
  "draft_plan_name_",
  "draft_plan_price_",
  "draft_plan_currency_",
  "draft_plan_duration_",
  "draft_plan_group_access_",
  "draft_plan_group_link_",
  "draft_plan_category_id_",
  "draft_plan_category_name_"
];

for (var i = 0; i < draftKeys.length; i++) {
  Bot.setProperty(draftKeys[i] + uid, "", "string");
}

// Confirmation
Bot.sendMessage(
  "✅ PLAN CREATED SUCCESSFULLY!\n\n" +
  "📦 Plan: " + name + "\n" +
  "🌍 Region: " + region + "\n" +
  "📂 Category: " + categoryName + "\n" +
  "💰 Price: " + currency + " " + price + "\n" +
  "⏳ Duration: " + duration + "\n" +
  "👥 Group Access: " + groupAccess + "\n\n" +
  "🔗 UNIQUE PLAN LINK:\n" + planLink
);

