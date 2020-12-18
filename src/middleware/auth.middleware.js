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
  console.log("进入用户验证");
  try {
    //1.获取用户名和密码
    const { name, password } = ctx.request.fields;

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
  } catch (error) {
    console.log(error);
  }
};

/**
 *   token验证
 */
const verifyAuth = async (ctx, next) => {
  console.log("进入token权限中间件");

  try {
    const authorization = ctx.headers.authorization;
    const token = authorization.replace("Bearer ", "");
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    console.log(result);
    ctx.user = result;
    console.log(result);
    await next();
  } catch (err) {
    console.log(err);
    console.log("token验证失败123");
    let error = new Error(errorTypes.TOKEN_INVALID);
    return ctx.app.emit("error", error, ctx);
  }
};

/**
 *   修改权限的验证
 */
const verifyPermission = async (ctx, next) => {
  console.log("进入修改权限的验证中间件", ctx.user.id);
  const [resouceKey] = Object.keys(ctx.params);
  const tabaleName = resouceKey.replace("Id", "");
  const id = ctx.params[resouceKey];
  const userId = ctx.user.id;

  try {
    const isPermission = await authService.checkResource(
      tabaleName,
      id,
      userId
    );
    if (!isPermission) throw new Error();
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
  console.log("通过了操作权限验证");
  await next();
};

module.exports = { verifyLogin, verifyAuth, verifyPermission };
