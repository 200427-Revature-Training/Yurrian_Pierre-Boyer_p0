import { Rating } from '../models/Rating';
import * as ratingsDao from '../daos/ratings-daos'; 

/* Returns an array of ratings */
export function getAllRatings(): Promise <Rating[]> {
    
}

/* Returns an array of ratings by its user_id  */
export function getRatingsByUserId(user_id: number): Promise <Rating[]> {

}

/* Returns an array of ratings by its food_id */
export function getRatingsByFoodId (food_id: number): Promise <Rating[]> {

}

/* Returns the average ratings of a food by its food_id */
export function getAverageRatingByFoodId (food_id: number): Rating {

}

/* Saves a rating */
export function saveRating(rating: any): Rating {

}

/* Updates a rating */
export function updateRating(rating: any): Rating {

}

/* Deletes a rating */
export function deleteRating(rating: any): Rating {
    
}

/* Deletes all user's rating */
export function deleteUserRatings(rating: any): Promise <Rating[]> {
    
}