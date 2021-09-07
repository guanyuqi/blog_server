const Router = require("koa-router");
//执行逻辑模块
const { create } = require("../controller/user.controller");
//中间件
const { verifyUser, handlePassword } = require("../middleware/user.middleware");

const userRouter = new Router({ prefix: "/users" });

userRouter.post("/", verifyUser, handlePassword, create);

module.exports = userRouter;
