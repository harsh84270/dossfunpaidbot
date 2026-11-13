/*CMD
  command: /morechannels
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


var channels = Bot.getProperty("my_channel_links", []);

if (!Array.isArray(channels)) {
  channels = [];
}

if (channels.length === 0) {
  Bot.sendMessage(
    "📢 Our Channels\n\n" +
    "Abhi koi channel add nahi kiya gaya hai."
  );
  return;
}

var buttons = [];

for (var i = 0; i < channels.length; i++) {
  buttons.push([{
    title: channels[i].name,
    url: channels[i].url
  }]);
}

buttons.push([
  { title: "⬅️ Back to Menu", command: "/mainmenu" }
]);

Bot.sendInlineKeyboard(
  buttons,
  "📢 MORE CHANNELS\n\n" +
  "Hamare channels join karne ke liye neeche channel name par click karein:"
);

