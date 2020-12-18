const Router = require("koa-router");

const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");
const { verifyLabelExists } = require("../middleware/label.middleware");
const {
  create,
  detail,
  list,
  update,
  remove,
  addLabels,
} = require("../controller/moment.controller");
const momentRouter = new Router({ prefix: "/moment" });

momentRouter.post("/", verifyAuth, create);
momentRouter.get("/:momentId", detail);
momentRouter.get("/", list);

//验证权限二连
//修改
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, update);
//删除
momentRouter.post("/delete/:momentId", verifyAuth, verifyPermission, remove);

//添加标签
momentRouter.post(
  "/:momentId/labels",
  verifyAuth,
  verifyPermission,
  verifyLabelExists,
  addLabels
);

module.exports = momentRouter;
