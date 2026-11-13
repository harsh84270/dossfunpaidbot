/*CMD
  command: /morechannelsadmin
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

var buttons = [
  [{ title: "➕ Add Channel", command: "/addchannelname" }],
  [{ title: "📋 View / Edit Channels", command: "/viewmychannels" }],
  [{ title: "🗑️ Delete Channel", command: "/deletechannel" }],
  [{ title: "⬅️ Back to Dashboard", command: "/mainmenu" }]
];

Bot.sendInlineKeyboard(
  buttons,
  "📢 MORE CHANNELS SETTINGS\n\nManage your channel links:"
);

