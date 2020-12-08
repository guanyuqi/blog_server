const service = require("../service/label.service");

class LabelController {
  /* 
    创建动态
  */
  async create(ctx, next) {
    console.log("创建标签");
    const { name } = ctx.request.body;
    const result = await service.create(name);
    ctx.body = {
      status: 200,
      msg: "success",
      data: {
        code: 1,
        data: result,
        message: "操作成功",
      },
    };
  }
}

module.exports = new LabelController();
