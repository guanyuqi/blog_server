//错误常量
const errorTypes = require("../constants/error-types");
//导入数据库service
const service = require("../service/user.service");
//加密
const md5password = require("../utils/password-handle");

/**
 *   用户验证
 */
const verifyUser = async (ctx, next) => {
  //1.获取用户名和密码
  const { name, password } = ctx.request.body;
  //2.判断用户名和密码是否正确
  if (!name || !password) {
    //发送错误信息
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }
  //3.判断用户名和密码是否已注册
  const result = await service.getUserByName(name);
  if (result.length) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }

  await next();
};

/**
 *   密码加密
 */
const handlePassword = async (ctx, next) => {
  console.log(ctx.request.body.password);
  let { password } = ctx.request.body;
  ctx.request.body.password = md5password(password);

  await next();
};

module.exports = { verifyUser, handlePassword };
