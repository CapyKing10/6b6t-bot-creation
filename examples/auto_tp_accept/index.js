const fs = require("fs");
const mineflayer = require("mineflayer");
let bot;

const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));

console.log(config.whitelist)
process.on('warning', e => console.warn(e.stack));

const color = {
  "green": "\x1b[32m",
};


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
    // debug (optional)
    console.log(message.toString())
    for (user of config.whitelist) {
      
      if (message.toString() == user + " wants to teleport to you.") {

        // log tp request
        console.log(color.green + user + " wants to teleport to you." + color.reset);

        // accept tp request
        bot.chat("/tpy " + user);
      }
    }
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
