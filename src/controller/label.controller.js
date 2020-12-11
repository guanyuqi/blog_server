const service = require("../service/label.service");

class LabelController {
  /* 
    创建标签
  */
  async create(ctx, next) {
    console.log("创建标签");
    const { name } = ctx.request.fields;
    const result = await service.create(name);
    ctx.body = {
      code: 0,
      data: { result },
      message: "操作成功",
    };
  }

  /* 
    获取标签
  */
  async getLabels(ctx, next) {
    const { limit, offset } = ctx.query;
    const result = await service.list(limit, offset);
    ctx.body = {
      code: 0,
      data: { result },
      message: "操作成功",
    };
  }
}

module.exports = new LabelController();
