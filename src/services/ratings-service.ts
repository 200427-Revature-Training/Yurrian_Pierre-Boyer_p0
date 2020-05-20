import { Rating } from '../models/Rating';
import * as ratingsDao from '../daos/ratings-daos'; 

/* Returns an array of ratings */
export function getAllRatings(): Promise <Rating[]> {
    
    return ratingsDao.getAllRatings();
}

/* Returns a rating by its rating_id  */
export function getRatingById(rating_id: number): Promise<Rating> {
    
    return ratingsDao.getRatingById(rating_id);
}

/* Returns an array of ratings by its user_id  */
export function getRatingsByUserId(user_id: number): Promise <Rating[]> {

    return ratingsDao.getRatingsByUserId(user_id);
}

/* Returns an array of ratings by its food_id */
export function getRatingsByFoodId (food_id: number): Promise <Rating[]> {

    return ratingsDao.getRatingsByFoodId(food_id);
}

/* Saves a rating */
export function saveRating(rating: any): Promise<Rating> {

    const newRating = new Rating(
        undefined, rating.userId, rating.foodId, 
        rating.userRating
    );

    if(rating.userId && rating.foodId && rating.userRating) {
        
        return ratingsDao.saveRating(newRating);
    } else {
        
        return new Promise((resolve, reject) => reject(422));
    }
}

/* Updates a rating */
export function updateRating(input: any): Promise<Rating> {

    const rating = new Rating(
        input.ratingId, input.userId,
        input.foodId, input.userRating
    );

    if (!rating.ratingId) { 
        throw new Error('400');
    }
    
    return ratingsDao.updateRating(rating);
}
