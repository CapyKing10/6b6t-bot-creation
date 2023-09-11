const fs = require("fs");
const mineflayer = require("mineflayer");
let bot;

const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));

console.log(config.whitelist)
process.on('warning', e => console.warn(e.stack));

const main = () => {
  bot = mineflayer.createBot({
    host: "config.ip",
    username: config.username,
    version: "config.version",
    skipValidation: true,
  });

  bot.once("login", async () => {
    bot.chat("/login " + config.password);
  });

  bot.on("error", (err) => {
    console.log(err);
    bot.end();
  });

  bot.on("messagestr", (message) => {
    console.log(message);
    fs.appendFileSync("./chat.log", message + "\n");
  });


  bot.on("kicked", (err) => {
    console.log(err);
    bot.end();
  });

  bot.on("end", () => {
    bot.removeAllListeners();
    setTimeout(main, 5000);
  });
};

main();
