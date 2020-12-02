const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
//路由引入
const userRouter = require("../router/user.router");
const authRouter = require("../router/auth.router");

//引入错误处理
const errorHandle = require("./error-handle");

const app = new Koa();

app.use(bodyParser());
app.use(userRouter.routes());
app.use(userRouter.allowedMethods);
app.use(authRouter.routes());
app.use(authRouter.allowedMethods);

//错误处理
app.on("error", errorHandle);

module.exports = app;
