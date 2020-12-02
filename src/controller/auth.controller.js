class AuthController {
  async login(ctx, next) {
    console.log("嗡嗡嗡嗡嗡嗡");
    const { name } = ctx.request.body;
    ctx.body = `欢迎回来,${name} 铁子~~~~`;
  }
}

module.exports = new AuthController();
