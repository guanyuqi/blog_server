const Koa = require("koa");
const https = require("https");
const fs = require("fs");

const body = require("koa-better-body");
const cors = require("koa2-cors");
//引入错误处理
const errorHandler = require("./error-handle");
//路由引入
const useRoutes = require("../router");
//https
const sslify = require("koa-sslify").default;
const app = new Koa();

app.use(sslify());
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
