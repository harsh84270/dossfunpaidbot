/*CMD
  command: /buyinternational
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


var uid = String(user.telegramid);

Bot.setProperty("selected_region_" + uid, "international", "string");

Bot.runCommand("/usercategories");

