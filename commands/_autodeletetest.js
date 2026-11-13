/*CMD
  command: /autodeletetest
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

var chatId = user.telegramid;

var sent = Api.sendMessage({
  chat_id: chatId,
  text: "🧪 Auto Delete Test Message"
});

Bot.sendMessage(
  "Test message bhej diya. Ab Bots.Business ke response mein message_id check karna hai."
);
