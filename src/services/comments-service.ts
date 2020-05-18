import { Comment } from '../models/Comment';
import * as commentsDao from '../daos/comments-daos'; 

/* Returns an array of comments  */
export function getAllComments(): Promise <Comment[]> {
    
    return commentsDao.getAllComments();
}

/* Returns a comment by its id  */
export function getCommentById(id: number): Promise<Comment> {

    return commentsDao.getCommentById(id);
}

/* Returns all comments by a user id  */
export function getCommentsByUserId(user_id: number): Promise<Comment[]> {

    return commentsDao.getCommentsByUserId(user_id);
}

/* Returns all comments by a type id  */
export function getCommentsByFoodId(food_id: number): Promise<Comment[]> {

    return commentsDao.getCommentsByFoodId(food_id);
}

/* Saves the comment */
export function saveComment(comment: any): Promise<Comment> {

    const newComment = new Comment(
        undefined, comment.userId, comment.foodId,
        comment.commentContent, undefined 
    );


    if(comment.userId && comment.foodId && comment.commentContent) {
        
        return commentsDao.saveComment(newComment);
    } else {
        
        return new Promise((resolve, reject) => reject(422));
    }
}

/* Updates the comment */
export function updateComment(input: any): Promise<Comment> {

    const comment = new Comment(
        input.commentId, input.userId, input.foodId,
        input.commentContent, input.createdAt
    );

    if (!comment.commentId) {
        throw new Error('400');
    }
    
    return commentsDao.updateComment(comment);
}

/*  Deletes a comment */
export function deleteComment(comment: any): Promise<Comment> {

    return commentsDao.deleteComment(comment);
}

/*  Deletes all user's comment */
export function deleteUserComments(comment: any): Promise<Comment[]> {

    return commentsDao.deleteUserComments(comment);
}

