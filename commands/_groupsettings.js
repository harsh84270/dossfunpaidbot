/*CMD
  command: /groupsettings
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

var planIds = Bot.getProperty("premium_plan_list", []);

if (!Array.isArray(planIds) || planIds.length === 0) {
  Bot.sendMessage("⚠️ Abhi koi plan create nahi hua.");
  return;
}

var buttons = [];

for (var i = 0; i < planIds.length; i++) {
  var planId = planIds[i];
  var plan = Bot.getProperty("premium_plan_" + planId);

  if (!plan || String(plan.group_access).toLowerCase() !== "yes") {
    continue;
  }

  buttons.push([
    {
      title: "📦 " + plan.name + " — " + plan.region,
      command: "/editplangroup " + planId
    }
  ]);
}

buttons.push([
  { title: "⬅️ Back to Admin Dashboard", command: "/start" }
]);

if (buttons.length === 1) {
  Bot.sendMessage("⚠️ Kisi bhi plan mein group access enabled nahi hai.");
  return;
}

Bot.sendInlineKeyboard(
  buttons,
  "⚙️ Plan Group Link Settings\n\nJis plan ka group link change karna hai, usko select karo:"
);
