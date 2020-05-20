import Telegraf from "telegraf";
import { TELEGRAM_TOKEN as TOKEN } from "./config.js";
import { getUserData, helpCommand } from "./commands/index.js";

const bot = new Telegraf(TOKEN);

bot.help(helpCommand);
bot.command("get", getUserData);

bot.startPolling();
