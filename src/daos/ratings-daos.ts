import { db } from '../daos/db';
import { Rating, RatingRow } from '..models/Rating';

export function getAllRatings(): Promise<Rating[]> {

}

export function getRatingsByUserId(user_id: number) Promise<Rating[]> {

}

export function getRatingsByFoodId(food_id: number) Promise<Rating[]> {

}

export function getAverageRatingByFoodId(food_id: number): Promise<Rating> {

}


export function saveRating(rating: Rating): Promise<Rating> {

}

export function updateRating(rating: Rating): Promise <Rating> {

}

export function deleteRating(rating: Rating): Promise<Rating> {
    
}

export function deleteUserRatings(rating: Rating): Promise<Rating> {
    
}

