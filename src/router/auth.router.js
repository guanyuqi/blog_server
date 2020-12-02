const Router = require("koa-router");

const authRouter = new Router();

const { login } = require("../controller/auth.controller");
console.log("wwwww");

authRouter.get("/login", (ctx, next) => {
  ctx.response.body = "我是一个get路由";
});

module.exports = authRouter;
