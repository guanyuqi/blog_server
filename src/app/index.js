const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
//引入错误处理
const errorHandler = require("./error-handle");
//路由引入
const useRoutes = require("../router");

const app = new Koa();

app.useRoutes = useRoutes;

app.use(bodyParser());
app.useRoutes();
app.on("error", errorHandler);

module.exports = app;
