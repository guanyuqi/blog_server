//导入数据库链接
const connection = require("../app/database");

class AuthService {
  /* 
  检查权限
   */
  async checkResource(tableName, id, userId) {
    try {
      const statement = `SELECT * FROM ${tableName} WHERE id =? AND user_id = ?`;
      const result = await connection.execute(statement, [id, userId]);
      //将user插入数据库
      console.log(result);
      return result[0].length === 0 ? false : true;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new AuthService();
