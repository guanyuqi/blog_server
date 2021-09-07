const path = require("path");
const fs = require("fs");

const handleContentType = require("../utils/handle-contentType");

const handler = require("../cos/cos.uploader");
const service = require("../service/user.service");
class UploadController {
  /* 上传头像 */
  async avatar(ctx, next) {
    try {
      //  1.上传图片到COS
      console.log("这是头像");
      let file = ctx.request.files[0];
      let contentType = handleContentType(file.name.split(".")[1]);
      let newFilename = ctx.user.name + "." + file.name.split(".")[1];
      let upStream = fs.createReadStream(file.path);
      const avatarResult = await handler.uploadAvatar(
        upStream,
        newFilename,
        contentType
      );
      console.log(avatarResult.Location);
      const result = await service.addAvatar(
        avatarResult.Location,
        ctx.user.id
      );
      ctx.body = {
        code: 0,
        data: { result },
        message: "操作成功",
      };
    } catch (error) {
      console.log(error);
    }
  }

  /* 上传图片 */
  async uploadImage(ctx, next) {
    console.log("进入上传头像");
    console.log(ctx.request.files);
    let file = ctx.request.files[0];
    let contentType = handleContentType(file.name.split(".")[1]);
    let newFilename =
      ctx.user.name + new Date().getTime() + "." + file.name.split(".")[1];
    let upStream = fs.createReadStream(file.path);
    const uploadResult = await handler.uploadImage(
      upStream,
      newFilename,
      contentType
    );

    ctx.body = {
      code: 0,
      data: { uploadResult },
      message: "操作成功",
    };
  }
}

module.exports = new UploadController();
