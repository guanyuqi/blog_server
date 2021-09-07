//导入数据库链接
const connection = require("../app/database");

class LabelService {
  /* 
    创建动态
  */
  async create(name) {
    console.log("创建标签", name);
    try {
      const statement = `INSERT INTO label (name) VALUES (?)`;
      const result = await connection.execute(statement, [name]);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  /* 
  标签是否存在
   */
  async isExistLabel(name) {
    try {
      const statement = `SELECT * FROM label WHERE name = ?`;
      const result = await connection.execute(statement, [name]);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  /* 
    获取标签列表
   */
  async list() {
    try {
      const statement = `SELECT l.id,l.name ,COUNT(l.id) count FROM label l
      LEFT JOIN moment_label ml
      ON ml.label_id = l.id 
      GROUP BY l.id `;
      const result = await connection.execute(statement);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new LabelService();
