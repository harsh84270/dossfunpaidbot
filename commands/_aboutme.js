/*CMD
  command: /aboutme
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


var details = Bot.getProperty("public_about_me");

if (!details) {
  Bot.sendMessage(
    "😊 ABOUT ME\n\n" +
    "Admin ne abhi apni information add nahi ki hai."
  );
  return;
}

var buttons = [
  [{ title: "⬅️ Back to Menu", command: "/mainmenu" }]
];

Bot.sendInlineKeyboard(
  buttons,
  "😊 ABOUT ME\n\n" + details
);

