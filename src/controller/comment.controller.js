const service = require("../service/comment.service");

class CommentController {
  /* 
    创建评论
  */
  async create(ctx, next) {
    //1.获取数据
    const userID = ctx.user.id;
    const { content, momentId } = ctx.request.fields;

    //2.插入数据库
    const result = await service.create(userID, momentId, content);
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
    回复评论
  */
  async reply(ctx, next) {
    //1.获取数据
    const userID = ctx.user.id;
    const { content, momentId } = ctx.request.fields;
    const { commentId } = ctx.params;
    //2.插入数据库
    const result = await service.reply(userID, momentId, commentId, content);
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
    修改评论
  */
  async update(ctx, next) {
    //1.获取数据
    const { content } = ctx.request.fields;
    const { commentId } = ctx.params;
    //2.插入数据库
    const result = await service.update(content, commentId);
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
    删除评论
  */
  async remove(ctx, next) {
    //1.获取数据
    const { commentId } = ctx.params;
    //2.插入数据库
    const result = await service.remove(commentId);
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
    获取评论
  */
  async list(ctx, next) {
    console.log("获取评论");
    const { momentId } = ctx.query;
    //2.查询数据库
    const result = await service.getComments(momentId);
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

module.exports = new CommentController();
