/*CMD
  command: /saveplangrouplink
  help: 
  need_reply: true
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

var waiting = User.getProperty("waiting_for_plan_group_link");

if (!waiting) {
  Bot.sendMessage("⚠️ Pehle Group Settings se plan select karo.");
  return;
}

var planId = String(
  User.getProperty("editing_group_link_plan_id") || ""
).trim();

if (!planId) {
  Bot.sendMessage("❌ Plan ID nahi mila. Group Settings se dobara plan select karo.");
  return;
}

var planKey = "premium_plan_" + planId;
var plan = Bot.getProperty(planKey);

if (!plan) {
  Bot.sendMessage("❌ Saved plan nahi mila: " + planId);
  return;
}

var newLink = String(message || "").trim();

if (
  newLink.indexOf("https://t.me/") !== 0 &&
  newLink.indexOf("http://t.me/") !== 0
) {
  Bot.sendMessage(
    "❌ Valid Telegram invite link bhejo.\nExample: https://t.me/+InviteLink"
  );
  return;
}

// Update the selected plan's group link
plan.group_link = newLink;

// Save using the same plan property key
Bot.setProperty(planKey, plan);

// Read back to verify the saved value
var savedPlan = Bot.getProperty(planKey);

if (!savedPlan || String(savedPlan.group_link) !== newLink) {
  Bot.sendMessage(
    "❌ Link save verify nahi hua.\nPlan ID: " + planId +
    "\nPlease dobara try karo."
  );
  return;
}

User.setProperty("waiting_for_plan_group_link", false, "boolean");
User.setProperty("editing_group_link_plan_id", "", "string");

Bot.sendMessage(
  "✅ Plan group link successfully update aur verify ho gaya!\n\n" +
  "📦 Plan: " + (savedPlan.name || "Plan") + "\n" +
  "🌍 Region: " + (savedPlan.region || "") + "\n" +
  "🔗 Saved link:\n" + savedPlan.group_link
);
