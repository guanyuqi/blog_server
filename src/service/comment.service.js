//导入数据库链接
const connection = require("../app/database");

class CommentService {
  /* 
    创建评论
  */
  async create(userId, momentId, content) {
    const statement = `INSERT INTO comment (user_id, moment_id,content) VALUES (?,?,?)`;
    const result = await connection.execute(statement, [
      userId,
      momentId,
      content,
    ]);
    //将user插入数据库
    return result[0];
  }

  /* 
    回复评论
  */
  async reply(userId, momentId, commentId, content) {
    console.log(userId, momentId, commentId, content);

    const statement = `INSERT INTO comment (user_id, moment_id,comment_id,content) VALUES (?,?,?,?)`;

    const result = await connection.execute(statement, [
      userId,
      momentId,
      commentId,
      content,
    ]);
    //将user插入数据库
    return result[0];
  }

  /* 
    修改评论
  */
  async update(content, commentId) {
    const statement = `UPDATE comment SET content=? WHERE id=?`;
    const result = await connection.execute(statement, [content, commentId]);
    return result[0];
  }

  /* 
    删除评论
  */
  async remove(commentId) {
    const statement = `DELETE FROM comment WHERE id=?`;
    const result = await connection.execute(statement, [commentId]);
    return result[0];
  }

  /* 
    查看评论
  */
  async getComments(momentId) {
    const statement = `
    SELECT 
    c.id id,c.content,c.createAt createTime,
    IF(COUNT(u.id),JSON_OBJECT('id',u.id,'id',u.id,'name',u.name,'avatar',u.avatar),NULL) user,
    COUNT(c.id) commentCount
    FROM comment c 
    LEFT JOIN byusers u
    ON u.id = c.user_id
    WHERE c.moment_id = ?
    GROUP BY c.createAt 
    ORDER BY c.createAt DESC
    `;
    const result = await connection.execute(statement, [momentId]);
    //将user插入数据库
    return result[0];
  }
}

module.exports = new CommentService();
