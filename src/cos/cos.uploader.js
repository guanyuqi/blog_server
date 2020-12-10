const COS = require("cos-nodejs-sdk-v5");
const cos = new COS({
  SecretId: "AKIDg9OktsbFcqsgH9v8F9FC1cHhtog3xF72",
  SecretKey: "zpJWWI4ZHBqKbjdXFpGiw4BJCl6Dwqa3",
});

class CosHandler {
  getBuck() {
    return new Promise((resolve, reject) => {
      cos.getBucket(
        {
          Bucket: "byhub-1259170065" /* 必须 */,
          Region: "ap-chengdu" /* 必须 */,
        },
        function (err, data) {
          if (!err) {
            resolve(data);
          } else {
            reject(err);
          }
        }
      );
    });
  }

  uploadAvatar(file, name, contentType) {
    return new Promise((resolve, reject) => {
      cos.putObject(
        {
          Bucket: "byhub-1259170065" /* 必须 */,
          Region: "ap-chengdu" /* 必须 */,
          Key: `avatar/${name}` /* 必须 */,
          StorageClass: "STANDARD",
          Body: file, // 上传文件对象,
          Headers: { "Content-Type": contentType },
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData));
          },
        },
        function (err, data) {
          if (!err) {
            resolve(data);
          } else {
            reject(err);
          }
        }
      );
    });
  }
}

module.exports = new CosHandler();
