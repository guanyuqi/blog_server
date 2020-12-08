const Router = require("koa-router");

const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");
const { create } = require("../controller/label.controller");

const labelRouter = new Router({ prefix: "/label" });

/* 添加标签 */
labelRouter.post("/", verifyAuth, create);

module.exports = labelRouter;
