//导入数据库链接
const connection = require("../app/database");

class CommentService {
  /* 
    创建评论
  */
  async create(userId, momentId, content) {
    const statement = `INSERT INTO comments (user_id, moment_id,content) VALUES (?,?,?)`;
    const result = await connection.execute(statement, [
      userId,
      momentId,
      content,
    ]);
    //将user插入数据库
    return result[0];
  }

  /* 
    查看评论
  */
  async getComments(momentId) {
    const statement = `
    SELECT
    c.id comentId,c.content content,c.createAt creatTime,
    JSON_OBJECT('id',u.id,'name',u.name) user
    FROM comments  c
    LEFT JOIN byusers u
    ON c.user_id = u.id
    WHERE c.moment_id = ?
    ORDER BY c.createAt DESC
    `;
    const result = await connection.execute(statement, [momentId]);
    //将user插入数据库
    return result[0];
  }
}

module.exports = new CommentService();
