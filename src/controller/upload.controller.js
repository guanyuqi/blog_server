const path = require("path");
const OSS = require("ali-oss");

const client = new OSS({
  accessKeyId: "LTAI4GK73wiQRcotc2tRbzCb",
  accessKeySecret: "PGIn7oaSr9YvwsFoxNl71vZAL572Op",
  bucket: "byhub",
  region: "oss-cn-beijing",
});

class UploadController {
  async avatar(ctx, next) {
    console.log("这是头像");
    const url = path.resolve(__dirname, "./t.png");
    try {
      let result = await client.put(`/avatar/${ctx.user.name}/avatar.png`, url);

      ctx.body = result.res;
      console.log(
        `https://byhub.oss-accelerate.aliyuncs.com/avatar/${ctx.user.name}/avatar.png`
      );
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UploadController();
