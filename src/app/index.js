const Koa = require("koa");
const body = require("koa-better-body");
//引入错误处理
const errorHandler = require("./error-handle");
//路由引入
const useRoutes = require("../router");

const app = new Koa();

app.useRoutes = useRoutes;

app.use(body());
app.useRoutes();
app.on("error", errorHandler);

module.exports = app;
