const service = require("../service/moment.service");

class MomentController {
  /* 
    创建动态
  */
  async create(ctx, next) {
    //1.获取数据
    const userID = ctx.user.id;
    const content = ctx.request.body.content;

    //2.插入数据库
    const result = await service.create(userID, content);
    ctx.body = {
      result,
    };
  }

  /* 
    查看动态
  */
  async detail(ctx, next) {
    //1.获取momentId
    const momentId = ctx.params.momentId;
    //2.查询数据库
    const result = await service.getMomentById(momentId);
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

  /* 
    查看动态列表
  */
  async list(ctx, next) {
    //1.获取分页
    const { offset, size } = ctx.query;
    //2.查询数据库
    const result = await service.getMomentList(offset, size);

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

  /* 
    修改动态
  */
  async update(ctx, next) {
    console.log("我是update");
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;
    const result = await service.updateMoment(content, momentId);
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

  /* 
    删除动态
  */
  async remove(ctx, next) {
    console.log("我是remove");
    const { momentId } = ctx.params;
    const result = await service.removeMoment(momentId);
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

module.exports = new MomentController();
