const Router = require("koa-router");

const { verifyAuth } = require("../middleware/auth.middleware");
const { create, detail, list } = require("../controller/moment.controller");
const momentRouter = new Router({ prefix: "/moment" });

momentRouter.post("/", verifyAuth, create);
momentRouter.get("/:momentId", detail);
momentRouter.get("/", list);
module.exports = momentRouter;
