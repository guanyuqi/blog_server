const Router = require("koa-router");
const multer = require("koa-multer");

const upload = multer({
  dest: "./uploads/",
});
/* upload.single("avatar") */
const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");

const { avatar } = require("../controller/upload.controller");

const uploadRouter = new Router({ prefix: "/upload" });

uploadRouter.post("/avatar", verifyAuth, avatar);
uploadRouter.post("/img", verifyAuth, avatar);

module.exports = uploadRouter;
