const service = require("../service/moment.service");

class MomentController {
  /* 
    创建动态
  */
  async create(ctx, next) {
    //1.获取数据
    console.log("创建动态");
    const userID = ctx.user.id;
    console.log(ctx.request.fields);
    const { title, content, coverImg } = ctx.request.fields;

    //2.插入数据库
    const result = await service.create(userID, title, content, coverImg);
    ctx.body = {
      code: 0,
      data: { result },
      message: "操作成功",
    };
  }

  /* 
    查看单条动态
  */
  async detail(ctx, next) {
    //1.获取momentId
    const momentId = ctx.params.momentId;
    //2.查询数据库
    const moment = await service.getMomentById(momentId);
    ctx.body = {
      code: 0,
      data: { moment: moment[0] },
      message: "操作成功",
    };
  }

  /* 
    查看动态列表
  */
  async list(ctx, next) {
    //1.获取分页
    const { offset, size } = ctx.query;
    //2.查询数据库
    const momentList = await service.getMomentList(offset, size);
    ctx.body = {
      code: 0,
      data: { momentList },
      message: "操作成功",
    };
  }

  /* 
    修改动态
  */
  async update(ctx, next) {
    console.log("我是update");
    const { momentId } = ctx.params;
    const { content } = ctx.request.fields;
    const result = await service.updateMoment(content, momentId);
    ctx.body = {
      code: 0,
      data: { result },
      message: "操作成功",
    };
  }

  /* 
    删除动态
  */
  async remove(ctx, next) {
    console.log("我是remove");
    const { momentId } = ctx.params;
    const result = await service.removeMoment(momentId);
    ctx.body = {
      code: 0,
      data: { result },
      message: "操作成功",
    };
  }

  /* 
    添加标签
  */
  async addLabels(ctx, next) {
    //1.获取标签和动态ID
    console.log("我是addLables");
    const labels = ctx.labels;
    const { momentId } = ctx.params;

    //2.遍历标签
    for (let label of labels) {
      //2.1判断标签和动态是否已有关系
      let labelId = label.id;
      const result = await service.hasLabel(momentId, labelId);
      if (result.length === 0) {
        await service.addLabel(momentId, labelId);
      }
    }

    ctx.body = {
      code: 0,
      message: "操作成功",
    };
  }
}

module.exports = new MomentController();
