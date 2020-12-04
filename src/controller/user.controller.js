const service = require("../service/user.service");

class UserController {
  async create(ctx, next) {
    //获取请求传递的参数
    const user = ctx.request.body;
    //插入数据库
    const result = await service.create(user);
    //返回数据
    ctx.body = {
      status: 200,
      msg: "success",
      data: {
        code: 1,
        data: result,
        message: "注册成功",
      },
    };
  }
}

module.exports = new UserController();
