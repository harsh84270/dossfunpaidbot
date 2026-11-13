/*CMD
  command: /buyindia
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

Bot.setProperty("selected_region_" + uid, "india", "string");

Bot.runCommand("/usercategories");

