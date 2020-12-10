const path = require("path");
const fs = require("fs");

const handleContentType = require("../utils/handle-contentType");

const handler = require("../cos/cos.uploader");

class UploadController {
  /* 上传头像 */
  async avatar(ctx, next) {
    try {
      console.log("这是头像");
      let file = ctx.request.files[0];
      let contentType = handleContentType(file.name.split(".")[1]);

      let newFilename = ctx.user.name + "." + file.name.split(".")[1];
      let upStream = fs.createReadStream(file.path);
      const result = await handler.uploadAvatar(
        upStream,
        newFilename,
        contentType
      );
      ctx.body = result;
    } catch (error) {
      console.log(error);
    }

    /* try {
      const result = await handler.uploadAvatar(ctx.request.files[0]);
      ctx.body = result;
    } catch (error) {
      console.log(error);
    } */
  }

  /* 上传图片 */
  async image(ctx, next) {
    try {
      console.log("上传图片");
      let file = ctx.request.files[0];
      let contentType = handleContentType(file.name.split(".")[1]);
      let newFilename =
        new Date().getTime() + ctx.user.name + "." + file.name.split(".")[1];
      let upStream = fs.createReadStream(file.path);
      const result = await handler.uploadAvatar(
        upStream,
        newFilename,
        contentType
      );
      ctx.body = result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UploadController();
