export class Rating {
    ratingId: number;
    userId: number;
    foodId: number;
    userRating: number;


    constructor(ratingId: number, userId: number, foodId: number, userRating: number) {
        this,ratingId = ratingId;
        this.userId = userId;
        this.foodId = foodId;
        this.userRating = userRating;
        
    }

/* 
    Static function for creating a Rating instance
    from the structure the database gives us 
*/
    static from (obj: RatingRow): Rating {
        const rate = new Rating(
            obj.rating_id, obj.user_id, obj.food_id, obj.user_rating
        );
        return rate;
    }

}

export interface RatingRow {
    rating_id: number;
    user_id: number;
    food_id: number;
    user_rating: number;

}