import { db } from '../daos/db';
import { Comment, CommentRow } from '..models/Comment';


/* Returns an array of comments  */
export function getAllComments(): Promise <Comment[]> {
    
}

/* Returns a comment by its id  */
export function getCommentById(id: number): Promise<Comment> {

}

/* Returns all comments by a user id  */
export function getCommentsByUserId(id: number): Promise<Comment[]> {

}

/* Returns all comments by a type id  */
export function getCommentsByTypeId(id: number): Promise<Comment[]> {

}

/* Saves the comment */
export function saveComment(comment: any): Promise<Comment> {

}

/* Updates the comment */
export function updateComment(comment: any): Promise<Comment> {
    
}

/*  Deletes a comment */
export function deleteComment(comment: any): Promise<Comment> {

}

/*  Deletes all user's comment */
export function deleteUserComment(comment: any): Promise<Comment[]> {

}

