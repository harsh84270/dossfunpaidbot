/*CMD
  command: /editchannel
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

var index = parseInt(params, 10);
var channels = Bot.getProperty("my_channel_links", []);

if (!Array.isArray(channels) || !channels[index]) {
  Bot.sendMessage("❌ Channel not found.");
  return;
}

Bot.setProperty("editing_channel_index_" + user.telegramid, index, "integer");

var buttons = [
  [{ title: "✏️ Edit Channel Name", command: "/editchannelname" }],
  [{ title: "🔗 Edit Channel Link", command: "/editchannellink" }],
  [{ title: "🗑️ Delete This Channel", command: "/deletechannel " + index }],
  [{ title: "⬅️ Back", command: "/viewmychannels" }]
];

Bot.sendInlineKeyboard(
  buttons,
  "📢 CHANNEL DETAILS\n\n" +
  "Name: " + channels[index].name + "\n" +
  "Link: " + channels[index].url
);

