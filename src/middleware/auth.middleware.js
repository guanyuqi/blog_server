//错误常量
const errorTypes = require("../constants/error-types");
//导入数据库service
const service = require("../service/user.service");
//加密
const md5password = require("../utils/password-handle");

/**
 *   用户验证
 */
const verifyLogin = async (ctx, next) => {
  //1.获取用户名和密码
  const { name, password } = ctx.request.body;
  //2.判断用户名和密码是否正确
  if (!name || !password) {
    //发送错误信息
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }
  //3.判断用户是否存在
  const result = await service.getUserByName(name);
  const user = result[0];
  if (!user) {
    const error = new Error(errorTypes.USER_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }
  //4.判断密码是否正确
  if (md5password(password) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_EEROR);
    return ctx.app.emit("error", error, ctx);
  }
  await next();
};

module.exports = { verifyLogin };
