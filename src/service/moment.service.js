//导入数据库链接
const connection = require("../app/database");

const sqlFragment = `
    SELECT 
      m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
      JSON_OBJECT('id', u.id, 'name', u.name) user
    FROM moment m
    LEFT JOIN byusers u ON m.user_id = u.id`;

class MomentService {
  /* 
    创建动态
  */
  async create(userId, content) {
    const statement = `INSERT INTO moment (content, user_id) VALUES (?,?);`;
    const result = await connection.execute(statement, [content, userId]);
    //将user插入数据库
    return result[0];
  }

  /* 
    查看单条动态
  */
  async getMomentById(momentId) {
    const statement = `${sqlFragment} WHERE m.id = 1`;
    const result = await connection.execute(statement, [momentId]);
    return result[0];
  }
  /* 
    查看多条动态
  */
  async getMomentList(offset, size) {
    const statement = `
    SELECT 
    m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,COUNT(DISTINCT c.id) commentsCount,
    JSON_OBJECT('id', u.id, 'name', u.name) user
    FROM moment m 
    LEFT JOIN byusers u 
    ON m.user_id = u.id
    LEFT JOIN comments c 
    ON m.id =c.moment_id
    GROUP BY m.id 
    ORDER BY m.id DESC
    LIMIT ?,?;
    `;
    const result = await connection.execute(statement, [offset, size]);
    return result[0];
  }
}

module.exports = new MomentService();
