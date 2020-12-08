//错误常量
const errorTypes = require("../constants/error-types");
//导入数据库service
const labelService = require("../service/label.service");

/**
 *   验证标签
 */
const verifyLabelExists = async (ctx, next) => {
  //1.获取标签
  console.log("进入验证标签");
  const { labels } = ctx.request.body;
  for (let i of labels) {
    let label;
    const result = await labelService.isExistLabel(i);
    if (result.length === 0) {
      const createResult = await labelService.create(i);
      console.log();
      label = { id: createResult.insertId, name: i };
    } else {
      label = { id: result[0].id, name: result[0].name };
    }
    console.log(label);
  }
  console.log("over");
  /* await next(); */
};

module.exports = { verifyLabelExists };
