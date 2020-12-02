//导入数据库链接
const connection = require("../app/database");

class UserService {
  async create(user) {
    const { name, password } = user;
    const statement = `INSERT INTO byusers (name,password) VALUES (?,?);`;
    const result = await connection.execute(statement, [name, password]);
    //将user插入数据库
    return result[0];
  }

  async getUserByName(name) {
    const statement = `SELECT * FROM byusers WHERE name =?`;
    const result = await connection.execute(statement, [name]);
    //将user插入数据库
    return result[0];
  }
}

module.exports = new UserService();
