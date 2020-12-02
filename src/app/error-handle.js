//错误常量
const errorTypes = require("../constants/error-types");

const errorHandle = (error, ctx) => {
  let status, message;
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;
      message = "用户名或者密码不能为空";
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409;
      message = "已经有人捷足先登";
      break;
    default:
      status = 404;
      message = "我也不知道发生了啥错误";
  }
  ctx.status = status;
  ctx.body = message;
};

module.exports = errorHandle;
