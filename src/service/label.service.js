//导入数据库链接
const connection = require("../app/database");

class LabelService {
  /* 
    创建动态
  */
  async create(name) {
    console.log("创建标签", name);
    const statement = `INSERT INTO label (name) VALUES (?)`;
    const result = await connection.execute(statement, [name]);
    //将user插入数据库

    return result[0];
  }

  async isExistLabel(name) {
    try {
      const statement = `SELECT * FROM label WHERE name = ?`;
      const result = await connection.execute(statement, [name]);
      console.log("查询存在得length", result[0].length);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new LabelService();
