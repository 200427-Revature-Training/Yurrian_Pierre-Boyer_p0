import { db } from '../daos/db';
import { Comment, CommentRow } from '../models/Comment';


/* Returns an array of comments  */
export function getAllComments(): Promise <Comment[]> {
    const sql = 'SELECT * FROM "comments"';

    return db.query<CommentRow>(sql, []).then(result => {
        const rows: CommentRow[] = result.rows;
        //console.log(rows);
 
        const comments: Comment[] = rows.map(row => Comment.from(row));
        return comments;
    });    
}

/* Returns a comment by its id  */
export function getCommentById(comment_id: number): Promise<Comment> {
    const sql = `SELECT * FROM "comments" WHERE comment_id = $1`;

    return db.query<CommentRow>(sql, [comment_id])
        .then(result => result.rows.map(row => Comment.from(row))[0]
    );
}

/* Returns all comments by a user id  */
export function getCommentsByUserId(user_id: number): Promise<Comment[]> {
    const sql = `SELECT * FROM "comments" WHERE user_id = $1`;

    return db.query<CommentRow>(sql, [user_id]).then(result => {
        const rows: CommentRow[] = result.rows;
        //console.log(rows);

        const comments: Comment[] = rows.map(row => Comment.from(row));
        return comments;
    });    
}

/* Returns all comments by its food id  */
export function getCommentsByFoodId(food_id: number): Promise<Comment[]> {
    const sql = `SELECT * FROM "comments" WHERE food_id = $1`;

    return db.query<CommentRow>(sql, [food_id]).then(result => {
        const rows: CommentRow[] = result.rows;
        //console.log(rows);

        const comments: Comment[] = rows.map(row => Comment.from(row));
        return comments;
    });    
}

/* Saves the comment */
export function saveComment(comment: any): Promise<Comment> {
    const sql = `INSERT INTO "comments" (user_id, food_id, comment_content) \
      VALUES ($1, $2, $3) RETURNING *`; 
    
      return db.query<CommentRow>(sql, [
        comment.userId,
        comment.foodId,
        comment.commentContent
    ]).then(result => result.rows.map(row => Comment.from(row))[0]);
}

/* Updates the comment */
export function updateComment(comment: any): Promise<Comment> {
    const sql = `UPDATE "comments" SET comment_content = COALESCE($1, comment_content) \
         WHERE comment_id = $2 RETURNING *`;

    const params = [comment.commentContent, comment.commentId];

return db.query<CommentRow>(sql, params)
    .then(result => result.rows.map(row => Comment.from(row))[0]
); 
}


