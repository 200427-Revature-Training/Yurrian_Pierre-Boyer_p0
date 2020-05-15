import { Food } from '../models/Food';
import * as foodDao from '../daos/food-daos'; 

/* Returns an array of all foods */
export function getAllFood(): Promise <Food[]> {
    
}

/* Returns a food by its id  */
export function getFoodById(id: number): Food {

}

/* Returns an array of food by its name */
export function getFoodByName(name: string): Food {

}

/* Returns a food by its type id  */
export function getFoodByTypeId(id: number): Promise<Food[]> {

}

/* Saves the food  */
export function saveFood(food: any): Food {

}

/* Updates the food */
export function updateFood(food: any): Food {
    
}

/*  Deletes a food */
export function deleteFood(food: any): Food {

}