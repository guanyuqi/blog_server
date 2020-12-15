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
    case errorTypes.USER_NOT_EXISTS:
      status = 400;
      message = "没有的账号你登个锤子";
      break;
    case errorTypes.PASSWORD_EEROR:
      status = 400;
      message = "密码错了!爬~";
      break;
    case errorTypes.TOKEN_INVALID:
      status = 401;
      message = "token失效,请重新登录";
      break;
    case errorTypes.UNAUTHORIZATION:
      status = 401;
      message = "验证失败,你没有这个权限";
      break;
    default:
      status = 404;
      message = "未知错误";
  }
  ctx.status = 200;
  ctx.body = {
    code: status,
    message: message,
  };
};

module.exports = errorHandle;
