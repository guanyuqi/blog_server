//导入数据库链接
const connection = require("../app/database");

class AuthService {
  /* 
  检查权限
   */
  async checkMoment(momentId, id) {
    try {
      const statement = `SELECT * FROM moment WHERE id =? AND user_id = ?`;
      const result = await connection.execute(statement, [momentId, id]);
      //将user插入数据库
      return result[0].length === 0 ? false : true;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new AuthService();
