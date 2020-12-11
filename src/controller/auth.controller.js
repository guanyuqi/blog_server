//颁发token
const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config");

class AuthController {
  /* 
    登录
  */
  async login(ctx, next) {
    const { name, id } = ctx.user;
    const token = jwt.sign({ name, id }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256",
    });

    ctx.body = {
      code: 0,
      data: { result },
      message: "操作成功",
    };
  }

  /* 
    成功
  */
  async success(ctx, next) {
    ctx.body = "成功了";
  }
}

module.exports = new AuthController();
