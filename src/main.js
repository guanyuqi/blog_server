const app = require("./app");
const connection = require("./app/database");

const config = require("./app/config");

app.listen(config.APP_PORT, () => {
  console.log(`帝王${config.APP_PORT}号引擎!!发动~~~`);
});
