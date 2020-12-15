//导入数据库链接
const connection = require("../app/database");

class MomentService {
  /* 
    创建动态
  */
  async create(userID, title, content) {
    const statement = `INSERT INTO moment (user_id,title,content) VALUES (?,?,?);`;
    const result = await connection.execute(statement, [
      userID,
      title,
      content,
    ]);
    //将user插入数据库
    return result[0];
  }

  /* 
    查看单条动态
  */
  async getMomentById(momentId) {
    const statement = `
    SELECT 
      m.id id,m.title title, m.content content, m.createAt createTime, m.updateAt updateTime,
      JSON_OBJECT('id', u.id, 'name', u.name,'avatar',u.avatar) user,
      IF(COUNT(l.id),JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'name', l.name)), NULL) labels,
      IF(COUNT(c.id),JSON_ARRAYAGG(
        JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 
                    'user', JSON_OBJECT('id', cu.id, 'name', cu.name,'avatar',cu.avatar))), NULL) comments
    FROM moment m
    LEFT JOIN byusers u ON m.user_id = u.id
    LEFT JOIN comment c ON c.moment_id = m.id
    LEFT JOIN byusers cu ON c.user_id = cu.id
    LEFT JOIN moment_label ml ON m.id = ml.moment_id
    LEFT JOIN label l ON ml.label_id = l.id
    WHERE m.id = ?
    GROUP BY c.moment_id, m.id HAVING m.id = ?;`;
    try {
      const result = await connection.execute(statement, [momentId, momentId]);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
  /* 
    查看多条动态
  */
  async getMomentList(offset, size) {
    const statement = `
    SELECT 
      m.id id,m.title title, m.content content, m.createAt createTime, m.updateAt updateTime,
      JSON_OBJECT('id', u.id, 'name', u.name,'avatar',u.avatar) auchor,
      IF(COUNT(l.id),JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'name', l.name)),NULL) labels,
      (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount
    FROM moment m 
    LEFT JOIN byusers u 
    ON m.user_id = u.id
    LEFT JOIN moment_label ml 
    ON m.id = ml.moment_id
    LEFT JOIN label l 
    ON ml.label_id = l.id
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

  /* 
    是否已有标签
  */
  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id=? AND label_id=?`;
    const result = await connection.execute(statement, [momentId, labelId]);
    return result[0];
  }

  /* 
    是否已有标签
  */
  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?,?)`;
    const result = await connection.execute(statement, [momentId, labelId]);
    return result[0];
  }
}

module.exports = new MomentService();
