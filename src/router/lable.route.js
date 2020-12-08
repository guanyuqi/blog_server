const Router = require("koa-router");

const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");
const { create } = require("../controller/lable.controller");

const lableRouter = new Router({ prefix: "/lable" });

/* 添加标签 */
lableRouter.post("/", verifyAuth, create);

module.exports = lableRouter;
