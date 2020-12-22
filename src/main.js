const https = require("https");

const connection = require("./app/database");
const config = require("./app/config");
const app = require("./app");

const fs = require("fs");
const path = require("path");

const keyPath = path.join(__dirname, "app/ssl/ssl.key");
const pemPath = path.join(__dirname, "app/ssl/ssl.pem");
const options = {
  key: fs.readFileSync(keyPath, "utf-8"),
  cert: fs.readFileSync(pemPath, "utf-8"),
};

/* app.listen(config.APP_PORT, () => {
  console.log(`帝王${config.APP_PORT}号引擎!!发动~~~`);
}); */

https.createServer(options, app.callback()).listen(config.APP_PORT, (err) => {
  if (err) {
    console.log("服务启动出错", err);
  } else {
    console.log(`https帝王${config.APP_PORT}号引擎!!发动~~~`);
  }
});
