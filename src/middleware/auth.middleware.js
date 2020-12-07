const jwt = require("jsonwebtoken");

//错误常量
const errorTypes = require("../constants/error-types");
//导入数据库service
const userService = require("../service/user.service");
const authService = require("../service/auth.service");
//md5加密
const md5password = require("../utils/password-handle");
//token解密
const { PUBLIC_KEY } = require("../app/config");

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
  const result = await userService.getUserByName(name);
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
  ctx.user = user;
  await next();
};

/**
 *   token验证
 */
const verifyAuth = async (ctx, next) => {
  console.log("进入权限中间件");
  try {
    const authorization = ctx.headers.authorization;

    const token = authorization.replace("Bearer ", "");
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = result;
    await next();
  } catch {
    let error = new Error(errorTypes.TOKEN_INVALID);
    return ctx.app.emit("error", error, ctx);
  }
};

/**
 *   修改权限的验证
 */
const verifyPermission = async (ctx, next) => {
  console.log("进入修改权限的验证中间件");
  const { id } = ctx.user;
  const { momentId } = ctx.params;
  try {
    const isPermission = await authService.checkMoment(momentId, id);
    if (!isPermission) throw new Error();
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
  await next();
};

module.exports = { verifyLogin, verifyAuth, verifyPermission };
