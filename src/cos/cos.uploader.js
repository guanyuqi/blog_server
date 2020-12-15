const COS = require("cos-nodejs-sdk-v5");

const config = require("../app/config");

const cos = new COS({
  SecretId: config.SECRET_ID,
  SecretKey: config.SECRET_KEY,
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
  /* 
  上传头像
   */
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

  /* 
  上传图片
   */
  uploadImage(file, name, contentType) {
    return new Promise((resolve, reject) => {
      cos.putObject(
        {
          Bucket: "byhub-1259170065" /* 必须 */,
          Region: "ap-chengdu" /* 必须 */,
          Key: `image/${name}` /* 必须 */,
          StorageClass: "STANDARD",
          Body: file, // 上传文件对象,
          Headers: { "Content-Type": contentType },
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
