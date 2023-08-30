import { Client } from "discord.js";
import * as dotenv from "dotenv";

dotenv.config();

const bot = new Client({
  intents: ["Guilds", "GuildMessages", "MessageContent"],
});

bot.on("ready", () => {
  console.log("Client is ready!");
});

bot.on("messageCreate", async (message) => {
  if (message.author.id == bot.user!.id) return;

  if (
    message.content.toLowerCase().startsWith("jarvis set the channel name to")
  ) {
    if (message.channel.isDMBased()) return;
    message.channel.setName(
      message.content.replace("jarvis set the channel name to ", "")
    );
  }

  if (message.content.toLowerCase().includes("indeed")) {
    const options = [
      "did you mean <https://indeed.com> ?",
      "are you trying to find a job on <https://indeed.com> ?",
    ];
    message.reply({
      content: options[Math.floor(Math.random() * options.length)],
      allowedMentions: { repliedUser: false },
    });
  }

  //theres a better way of doing this but im not doing it
  //correct 24hr time (hours above 12) to 12hr time
  // if (message.content.match(/\b(?:[01]\d|2[0-3]):[0-5]\d\b/g)) {
  //   const time = message.content.match(/\b(?:[01]\d|2[0-3]):[0-5]\d\b/g);
  //   for (const t of time!) {
  //     const [hour, minute] = t.split(":");
  //     const hourInt = parseInt(hour);
  //     const minuteInt = parseInt(minute);
  //     let minuteString: string;
  //     if (minuteInt < 10) {
  //       minuteString = `0${minuteInt}`;
  //     } else {
  //       minuteString = `${minuteInt}`;
  //     }
  //     const newHour = hourInt - 12;
  //     message.reply({
  //       content: `Didn't you mean ${newHour}:${minuteString} PM?`,
  //       allowedMentions: { repliedUser: false },
  //     });
  //   }
  // }

  if (
    message.content.toLowerCase().startsWith("jarvis pin this") &&
    message.reference
  ) {
    const ref = message.channel.messages.cache.get(
      message.reference.messageId!
    );
    ref && ref.pin();
    ref && message.react("📌");
  }

  if (
    message.content
      .toLowerCase()
      .startsWith("jarvis americanize the temperature")
  ) {
    const temp = message.content.replace(
      "jarvis americanize the temperature ",
      ""
    );
    const fahrenheit = (parseInt(temp) * 9) / 5 + 32;
    message.reply({
      content: `${temp}°C is ${fahrenheit}°F`,
      allowedMentions: { repliedUser: false },
    });
  }

  interface ham {
    [key: number]: string | undefined;
  }
  const ham: ham = {
    1: "Wait a minute.",
    2: "Very important.",
    3: "What time is it?",
    4: "Where shall I go ahead?",
    5: "Have you business for me?",
    6: "I am ready.",
    7: "Are you ready?",
    8: "Close your key, stop breaking.",
    9: "Priority business. Wire Chief's call.",
    10: "Keep this circuit closed.",
    12: "Do you understand?",
    13: "I understand.",
    14: "What is the weather?",
    15: "For you and others to copy.",
    17: "Lightning here.",
    18: "What's the trouble?",
    19: "Form 19 train order.",
    21: "Stop for meal.",
    22: "Wire test.",
    23: "All stations copy.",
    24: "Repeat this back.",
    25: "Busy on another wire.",
    26: "Put on ground wire.",
    27: "Priority, very important.",
    28: "Do you get my writing?",
    29: "Private, deliver in sealed envelope.",
    30: "No more - the end",
    31: "Form 31 train order.",
    32: "I understand that I am to ...",
    33: "Answer is paid.",
    34: "Message for all officers.",
    35: "You may use my signal to answer this.",
    37: "Inform all interested.",
    39: "Important, with priority on thru wire.",
    44: "Answer promptly by wire.",
    55: "Important",
    73: "Best regards.",
    77: "I have a message for you.",
    88: "Love and kisses.",
    91: "Superintendent's signal.",
    92: "Deliver promptly.",
    134: "Who is at the key?",
  };
  if (
    message.content
      .toLowerCase()
      .startsWith("jarvis caleb is being annoying what is ham code")
  ) {
    const hamCode = message.content.replace(
      "jarvis caleb is being annoying what is ham code ",
      ""
    );
    message.reply({
      content: ham[parseInt(hamCode)] ?? "I don't know that one",
      allowedMentions: { repliedUser: false },
    });
  }
});

bot.login(process.env.DSC_TOKEN);
