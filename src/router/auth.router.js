const Router = require("koa-router");

const authRouter = new Router();

const { login, success } = require("../controller/auth.controller");
const { verifyLogin, verifyAuth } = require("../middleware/auth.middleware");
authRouter.post("/login", verifyLogin, login);

authRouter.post("/testlogin", (ctx, next) => {
  ctx.body = "yes";
});

module.exports = authRouter;
