/*CMD
  command: /buyplanmenu
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


var buttons = [
  [{ title: "🇮🇳 For Indian User", command: "/buyindia" }],
  [{ title: "🌍 International", command: "/buyinternational" }]
];

Bot.sendInlineKeyboard(
  buttons,
  "💎 BUY Premium\n\nPlease select your region:"
);

