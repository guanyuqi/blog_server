const crypto = require("crypto");

const md5password = (psw) => {
  const md5 = crypto.createHash("md5");
  const result = md5.update(psw).digest("hex");
  return result;
};

module.exports = md5password;
