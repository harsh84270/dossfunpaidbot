/*CMD
  command: /setgrouplink
  help: 
  need_reply: true
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

var waiting = User.getProperty("waiting_for_common_group_link");

if (!waiting) {
  User.setProperty("waiting_for_common_group_link", true, "boolean");
  Bot.sendMessage(
    "🔗 Naya Telegram group invite link bhejo.\n\n" +
    "Example: https://t.me/+YourInviteLink\n\n" +
    "Link bhejne ke baad save ho jayega."
  );
  return;
}

var newLink = String(message || "").trim();

if (
  newLink.indexOf("https://t.me/") !== 0 &&
  newLink.indexOf("http://t.me/") !== 0
) {
  Bot.sendMessage(
    "❌ Link valid nahi lag raha.\n\n" +
    "Telegram invite link bhejo, jaise https://t.me/+YourInviteLink"
  );
  return;
}

Bot.setProperty("premium_group_link", newLink, "string");
User.setProperty("waiting_for_common_group_link", false, "boolean");

Bot.sendMessage(
  "✅ Premium group link update ho gaya!\n\n" +
  "New link:\n" + newLink
);
