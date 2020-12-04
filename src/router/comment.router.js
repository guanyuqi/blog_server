const Router = require("koa-router");

const { verifyAuth } = require("../middleware/auth.middleware");
const { create, list } = require("../controller/comment.controller");
const commentRouter = new Router({ prefix: "/comment" });

commentRouter.post("/:momentId", verifyAuth, create);
commentRouter.get("/:momentId", list);

module.exports = commentRouter;
