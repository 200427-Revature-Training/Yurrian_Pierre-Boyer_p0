export class Rating {
    userId: number;
    foodId: number;
    userRating: number;


    constructor(userId: number, foodId: number, userRating: number) {
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
            obj.user_id, obj.food_id, obj.user_rating
        );
        return rate;
    }

}

export interface RatingRow {
    user_id: number;
    food_id: number;
    user_rating: number;

}