const Koa = require("koa");
const body = require("koa-better-body");
const cors = require("koa2-cors");
//引入错误处理
const errorHandler = require("./error-handle");
//路由引入
const useRoutes = require("../router");

const app = new Koa();
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "PATCH"],
  })
);

app.use(body());
app.useRoutes = useRoutes;
app.useRoutes();
app.on("error", errorHandler);

module.exports = app;
