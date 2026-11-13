/*CMD
  command: /planprice
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: 💰 Enter plan price in INR (Example: 199)

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

var region = Bot.getProperty(
  "draft_plan_region_" + user.telegramid
);

if (region !== "india" && region !== "international") {
  Bot.sendMessage("❌ Region not found. Please start again.");
  return;
}

var price = Number(message.trim());

if (!isFinite(price) || price <= 0) {
  Bot.sendMessage("❌ Invalid price. Please enter a valid amount.");
  return;
}

var currency = region === "india" ? "₹" : "$";

Bot.setProperty(
  "draft_plan_price_" + user.telegramid,
  price,
  "integer"
);

Bot.sendMessage(
  "✅ Price saved!\n\n" +
  "💰 Plan Price: " + currency + price
);

Bot.runCommand("/planduration");

