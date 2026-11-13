/*CMD
  command: /mainmenu
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
var telegramId = String(user.telegramid);

var users = Bot.getProperty("broadcast_users", []);

if (!Array.isArray(users)) {
  users = [];
}

if (users.indexOf(telegramId) === -1) {
  users.push(telegramId);
  Bot.setProperty("broadcast_users", users, "json");
}

if (telegramId === ADMIN_ID) {

  var adminButtons = [
    [{ title: "➕ Create Plan", command: "/createplan" }],
    [{ title: "📋 Manage Plans", command: "/manageplans" }],
    [{ title: "🔗 All Plan Links", command: "/planlinks" }],
    [{ title: "📢 More Channels Settings", command: "/morechannelsadmin" }],
    [{ title: "😊 About Me Settings", command: "/aboutmeadmin" }],
    [{ title: "💳 Payment Settings", command: "/paymentsettings" }],
    [{ title: "⚙️ Group Settings", command: "/groupsettings" }],
    [{ title: "⏳ Pending Payments", command: "/pendingpayments" }],
    [{ title: "📢 Broadcast", command: "/broadcast" }]
  ];

  Bot.sendInlineKeyboard(
    adminButtons,
    "👑 ADMIN DASHBOARD\n\nChoose an option:"
  );

} else {

  var userButtons = [
    [{ title: "⭐ Buy Premium", command: "/buyplanmenu" }],
    [
      { title: "📢 More Channels", command: "/morechannels" },
      { title: "😊 About Me", command: "/aboutme" }
    ]
  ];

  Bot.sendInlineKeyboard(
    userButtons,
    "👋 Welcome to Dossfun Premium Bot!\n\nChoose an option below:"
  );
}

