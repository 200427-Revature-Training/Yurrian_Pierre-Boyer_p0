import { Food } from '../models/Food';
import * as foodDao from '../daos/food-daos'; 

/* Returns an array of all foods */
export function getAllFood(): Promise <Food[]> {
    
    return foodDao.getAllFood();
}

/* Returns a food by its id  */
export function getFoodById(id: number): Promise<Food> {

    return foodDao.getFoodById(id);
}

/* Returns a food by its type id  */
export function getFoodByTypeId(type_id: number): Promise<Food[]> {

    return foodDao.getFoodByTypeId(type_id);
}

/* Returns a food by its name */
export function getFoodByName(name: string): Promise<Food> {

    return foodDao.getFoodByName(name);
}

/* Saves the food  */
export function saveFood(food: any): Promise<Food> {

    const newFood = new Food(
        undefined, food.typeId, food.foodName,
        food.description
    );

    if(food.typeId && food.foodName && food.description) {
        
        return foodDao.saveFood(newFood);
    } else {
        
        return new Promise((resolve, reject) => reject(422));
    }
}

/* Updates the food */
export function updateFood(input: any): Promise<Food> {
    
    const food = new Food(
        input.foodId, input.typeId,
        input.foodName, input.description
    );

    if (!food.foodId) {
        throw new Error('400');
    }
    
    return foodDao.updateFood(food);
}

/*  Deletes a food (May not want this)*/
 export function deleteFood(food: any): Promise<Food> {

    return foodDao.deleteFood(food);
} 