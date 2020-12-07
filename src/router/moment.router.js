const Router = require("koa-router");

const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");
const {
  create,
  detail,
  list,
  update,
  remove,
} = require("../controller/moment.controller");
const momentRouter = new Router({ prefix: "/moment" });

momentRouter.post("/", verifyAuth, create);
momentRouter.get("/:momentId", detail);
momentRouter.get("/", list);

//验证权限二连
//修改
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, update);
//删除
momentRouter.delete("/:momentId", verifyAuth, verifyPermission, remove);
module.exports = momentRouter;
