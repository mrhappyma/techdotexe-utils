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

  if (message.content.startsWith("set channel name to")) {
    if (message.channel.isDMBased()) return;
    message.channel.setName(
      message.content.replace("set channel name to ", "")
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
  if (message.content.match(/\b(?:[01]\d|2[0-3]):[0-5]\d\b/g)) {
    const time = message.content.match(/\b(?:[01]\d|2[0-3]):[0-5]\d\b/g);
    for (const t of time!) {
      const [hour, minute] = t.split(":");
      const hourInt = parseInt(hour);
      const minuteInt = parseInt(minute);
      let minuteString: string;
      if (minuteInt < 10) {
        minuteString = `0${minuteInt}`;
      } else {
        minuteString = `${minuteInt}`;
      }
      const newHour = hourInt - 12;
      message.reply({
        content: `Didn't you mean ${newHour}:${minuteString} PM?`,
        allowedMentions: { repliedUser: false },
      });
    }
  }
});

bot.login(process.env.DSC_TOKEN);
