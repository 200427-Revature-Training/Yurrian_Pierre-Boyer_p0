import { Comment } from '../models/Comment';
import * as commentsDao from '../daos/comments-daos'; 

/* Returns an array of comments  */
export function getAllComments(): Promise <Comment[]> {
    
}

/* Returns a comment by its id  */
export function getCommentById(id: number): Comment {

}

/* Returns all comments by a user id  */
export function getCommentsByUserId(id: number): Promise<Comment[]> {

}

/* Returns all comments by a type id  */
export function getCommentsByTypeId(id: number): Promise<Comment[]> {

}

/* Saves the comment */
export function saveComment(comment: any): Comment {

}

/* Updates the comment */
export function updateComment(comment: any): Comment {
    
}

/*  Deletes a comment */
export function deleteComment(comment: any): Comment {

}

/*  Deletes all user's comment */
export function deleteUserComment(comment: any): Promise<Comment[]> {

}

