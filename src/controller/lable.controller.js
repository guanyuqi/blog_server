const service = require("../service/moment.service");

class LableController {
  /* 
    创建动态
  */
  async create(ctx, next) {
    console.log("啦啦啦");
    console.log(ctx.request.body);
    /* //1.获取数据
    const userID = ctx.user.id;
    const content = ctx.request.body.content;

    //2.插入数据库
    const result = await service.create(userID, content);
    ctx.body = {
      result,
    }; */
  }
}

module.exports = new LableController();
