/*CMD
  command: /planview
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

var planId = params;
if (!planId) {
  Bot.sendMessage("❌ Plan ID missing.");
  return;
}

var plan = Bot.getProperty("premium_plan_" + planId);

if (!plan) {
  Bot.sendMessage("❌ Plan not found.");
  return;
}

var region = plan.region === "india"
  ? "India 🇮🇳"
  : "International 🌍";

var group = plan.group_access === "yes"
  ? "Yes ✅"
  : "No ❌";

var buttons = [
  [{ title: "🗑 Delete Plan", command: "/deleteplan " + plan.id }],
  [{ title: "⬅️ Back to Plans", command: "/manageplans" }]
];

Bot.sendInlineKeyboard(
  buttons,
  "📦 PLAN DETAILS\n\n" +
  "🆔 ID: " + plan.id + "\n" +
  "📛 Name: " + plan.name + "\n" +
  "🌍 Region: " + region + "\n" +
  "💰 Price: " + plan.currency + plan.price + "\n" +
  "⏳ Duration: " + plan.duration + "\n" +
  "👥 Group Access: " + group + "\n" +
  (plan.group_link ? "🔗 Group Link: " + plan.group_link : "")
);

