class AuthController {
  async login(ctx, next) {
    const { name } = ctx.request.body;
    ctx.body = `欢迎回来,${name} 铁子~~~~`;
  }
}

module.exports = new AuthController();
