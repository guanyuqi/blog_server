//导入数据库链接
const connection = require("../app/database");

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
    const statement = `
    SELECT 
      m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
      JSON_OBJECT('id', u.id, 'name', u.name) user
    FROM moment m
    LEFT JOIN byusers u ON m.user_id = u.id 
    WHERE m.id = 1`;
    const result = await connection.execute(statement, [momentId]);
    return result[0];
  }
  /* 
    查看多条动态
  */
  async getMomentList(offset, size) {
    const statement = `
    SELECT 
      m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
      JSON_OBJECT('id', u.id, 'name', u.name) auchor,
      (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount
    FROM moment m 
    LEFT JOIN byusers u 
    ON m.user_id = u.id
    GROUP BY m.id 
    ORDER BY m.id DESC
    LIMIT ?,?;`;
    const result = await connection.execute(statement, [offset, size]);
    return result[0];
  }

  /* 
    更新动态
  */
  async updateMoment(content, momentId) {
    const statement = `UPDATE moment SET content=? WHERE id=?`;
    const result = await connection.execute(statement, [content, momentId]);
    return result[0];
  }

  /* 
    删除动态
  */
  async removeMoment(momentId) {
    const statement = `DELETE FROM moment WHERE id=?`;
    const result = await connection.execute(statement, [momentId]);
    return result[0];
  }
}

module.exports = new MomentService();
