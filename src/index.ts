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
  if (message.content.startsWith("set channel name to")) {
    if (message.channel.isDMBased()) return;
    message.channel.setName(
      message.content.replace("set channel name to ", "")
    );
  }
});

bot.login(process.env.DSC_TOKEN);
