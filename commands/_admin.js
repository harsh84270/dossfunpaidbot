/*CMD
  command: /admin
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

var adminButtons = [
  [{ title: "📩 Contact Admin", url: "tg://user?id=8587100887" }]
];

Bot.sendInlineKeyboard(
  adminButtons,
  "📩 Need help?\n\nTap below to contact the bot admin."
);
