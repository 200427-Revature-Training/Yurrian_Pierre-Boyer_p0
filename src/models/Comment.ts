export class Comment {
    commentId: number;
    userId: number;
    foodId: number;;
    commentContent: string;
    createdAt: Date;


    constructor(commentId: number, userId: number, foodId: number, commentContent: string, createdAt: Date) {
        this.commentId = commentId;
        this.userId = userId;
        this.foodId = foodId;
        this.commentContent = commentContent;
        this.createdAt = createdAt;
    }

/* 
    Static function for creating a User instance
    from the structure the database gives us 
*/
    static from (obj: CommentRow): Comment {
        const comment = new Comment(
            obj.comment_id, obj.user_id, obj.food_id, obj.comment_content, new Date (obj.created_at)
        );
        return comment;
    }

}

export interface CommentRow {
    comment_id: number;
    user_id: number;
    food_id: number;
    comment_content: string;
    created_at: Date;
}

// Note: Try to make time_stamp come as a time