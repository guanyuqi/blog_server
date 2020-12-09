const Router = require("koa-router");

const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");
const { create, getLabels } = require("../controller/label.controller");

const labelRouter = new Router({ prefix: "/label" });

/* 添加标签 */
labelRouter.post("/", verifyAuth, create);
/* 展示标签 */
labelRouter.get("/", getLabels);
module.exports = labelRouter;
