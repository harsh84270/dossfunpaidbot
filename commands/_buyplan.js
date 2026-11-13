/*CMD
  command: /buyplan
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


var planId = params;
var plan = Bot.getProperty("premium_plan_" + planId);

if (!plan) {
  Bot.sendMessage("❌ Plan not found. Please select a plan again.");
  return;
}

var selectedRegion = User.getProperty("selected_region");

var planRegion = String(plan.region || "").trim().toLowerCase();
selectedRegion = String(selectedRegion || "").trim().toLowerCase();

if (selectedRegion && selectedRegion !== planRegion) {
  Bot.sendMessage(
    "❌ Region mismatch.\n" +
    "Selected: " + selectedRegion +
    "\nPlan region: " + planRegion +
    "\nPlease select the correct region using /start."
  );
  return;
}

User.setProperty("selected_plan_id", String(plan.id), "string");

var text =
  "📦 PLAN DETAILS\n\n" +
  "Plan: " + (plan.name || "Premium Plan") + "\n" +
  "Price: " + (plan.currency || "") + " " + (plan.price || "") + "\n" +
  "Duration: " + (plan.duration || "N/A") + "\n";

if (String(plan.group_access).toLowerCase() === "yes") {
  text += "Group Access: Included\n";
}

text +=
  "\n👇 Please follow the payment details below and submit your payment screenshot.\n\n" +
  "• 💳 Pay with UPI to get instant access.\n" +
  "• ❤️ Upgrade now to unlock all content!!";

var buttons = [
  [{
    title: "📤 Submit Payment Screenshot",
    command: "/submitpayment"
  }]
];

if (planRegion === "india") {

  var upi = Bot.getProperty("india_payment_upi");
  var qr = Bot.getProperty("india_payment_qr");

  if (upi) {
    text += "\n\n🇮🇳 UPI ID: " + upi;
  }

  if (qr) {

    Api.sendPhoto({
      photo: qr,
      caption: text
    });

    Bot.sendInlineKeyboard(
      buttons,
      "Please submit your payment screenshot after completing the payment."
    );

  } else {

    Bot.sendInlineKeyboard(
      buttons,
      text + "\n\n⚠️ India payment QR is not configured yet. Please contact the admin."
    );

  }

  return;
}

if (planRegion === "international") {

  var internationalDetails = Bot.getProperty(
    "international_payment_details"
  );

  if (internationalDetails) {
    text +=
      "\n\n🌍 INTERNATIONAL PAYMENT DETAILS:\n" +
      internationalDetails;
  } else {
    text +=
      "\n\n⚠️ International payment details are not configured yet.";
  }

  Bot.sendInlineKeyboard(buttons, text);
  return;
}

Bot.sendMessage(
  "❌ Invalid plan region.\n" +
  "Saved plan region: " + String(plan.region) +
  "\nPlan ID: " + String(plan.id)
);

