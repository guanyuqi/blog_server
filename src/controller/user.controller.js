const service = require("../service/user.service");

class UserController {
  async create(ctx, next) {
    //获取请求传递的参数
    const user = ctx.request.fields;
    //插入数据库
    const result = await service.create(user);
    //返回数据
    ctx.body = {
      code: 0,
      data: { result },
      message: "操作成功",
    };
  }
}

module.exports = new UserController();
