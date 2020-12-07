const service = require("../service/comment.service");

class CommentController {
  /* 
    创建评论
  */
  async create(ctx, next) {
    //1.获取数据
    const userID = ctx.user.id;
    const momentId = ctx.params.momentId;
    const content = ctx.request.body.content;
    console.log(ctx.request.body);

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
    获取评论
  */
  async list(ctx, next) {
    console.log("获取评论");
    const momentId = ctx.params.momentId;

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
