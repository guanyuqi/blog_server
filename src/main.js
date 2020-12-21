const https = require("https");
const fs = require("fs");
const path = require("path");
const connection = require("./app/database");
const config = require("./app/config");

var keyPath = path.join(__dirname, "app/ssl/ssl.key");
var pemPath = path.join(__dirname, "app/ssl/ssl.key");

const options = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(pemPath),
};

/* app.listen(config.APP_PORT, () => {
  console.log(`帝王${config.APP_PORT}号引擎!!发动~~~`);
}); */

https.createServer(options).listen(config.APP_PORT, (err) => {
  if (err) {
    console.log("服务启动出错", err);
  } else {
    console.log("guessWord-server运行在" + config.APP_PORT + "端口");
  }
});
