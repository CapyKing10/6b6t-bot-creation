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

  bot.on("message", (message) => {
    // run code here when a message is sent. access message using message.toString()
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
