const dotenv = require("dotenv");
//导出环境变量
dotenv.config();

module.exports = {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_ROOT,
  MYSQL_PASSWORD,
} = process.env;
