//导入数据库链接
const connection = require("../app/database");

class UserService {
  /* 
  创建用户
   */
  async create(user) {
    const { name, password } = user;
    const statement = `INSERT INTO byusers (name,password) VALUES (?,?);`;
    const result = await connection.execute(statement, [name, password]);
    //将user插入数据库
    return result[0];
  }
  /* 
  查询用户
   */
  async getUserByName(name) {
    const statement = `SELECT * FROM byusers WHERE name =?`;
    const result = await connection.execute(statement, [name]);
    //将user插入数据库
    return result[0];
  }

  /* 
  设置头像
   */
  async addAvatar(url, id) {
    url = "https://" + url;
    const statement = `UPDATE byusers  SET avatar = ? WHERE id=?;`;
    const result = await connection.execute(statement, [url, id]);
    //将user插入数据库
    return result[0];
  }
}

module.exports = new UserService();
