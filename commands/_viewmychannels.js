/*CMD
  command: /viewmychannels
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

var channels = Bot.getProperty("my_channel_links", []);

if (!Array.isArray(channels) || channels.length === 0) {
  Bot.sendMessage("❌ Abhi koi channel add nahi hai.");
  return;
}

var buttons = [];

for (var i = 0; i < channels.length; i++) {
  buttons.push([{
    title: "✏️ " + channels[i].name,
    command: "/editchannel " + i
  }]);
}

buttons.push([
  { title: "⬅️ Back", command: "/morechannelsadmin" }
]);

Bot.sendInlineKeyboard(
  buttons,
  "📋 YOUR CHANNELS\n\nSelect a channel to edit:"
);

