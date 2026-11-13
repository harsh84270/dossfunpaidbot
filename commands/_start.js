/*CMD
  command: /start
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
var BOT_USERNAME = "Dossfunrobot";
var startParam = String(params || "").trim();

// Direct plan link handling
if (startParam.indexOf("plan_") === 0) {

  var planId = startParam.substring(5);
  var plan = Bot.getProperty("premium_plan_" + planId);

  if (!plan) {
    Bot.sendMessage("❌ Ye plan available nahi hai.");
    return;
  }

  User.setProperty(
    "selected_region",
    String(plan.region).toLowerCase(),
    "string"
  );

  var text =
    "📦 PREMIUM PLAN\n\n" +
    "📌 Plan: " + plan.name + "\n" +
    "🌍 Region: " + plan.region + "\n" +
    "💰 Price: " + plan.currency + " " + plan.price + "\n" +
    "⏳ Duration: " + plan.duration + "\n";

  if (String(plan.group_access).toLowerCase() === "yes") {
    text += "👥 Group Access: Included\n";
  }

  var buttons = [
    [{
      title: "🛒 Buy This Plan",
      command: "/buyplan " + planId
    }],
    [{
      title: "⬅️ Back to Plans",
      command: plan.region.toLowerCase() === "india"
        ? "/india"
        : "/international"
    }],
    [{
      title: "🏠 Main Menu",
      command: "/mainmenu"
    }]
  ];

  Bot.sendInlineKeyboard(buttons, text);
  return;
}

// Normal admin menu
if (String(user.telegramid) === ADMIN_ID) {

  Bot.runCommand("/mainmenu");
  return;

}

// Normal user menu
Bot.runCommand("/mainmenu");
