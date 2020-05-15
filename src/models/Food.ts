export class Food {
    foodId: number;
    typeId: number;
    foodName: string;
    description: string;


    constructor(foodId: number, typeId: number, foodName: string, description: string) {
        this.foodId = foodId;
        this.typeId = typeId;
        this.foodName = foodName;
        this.description = description;
        
    }

/* 
    Static function for creating a Food instance
    from the structure the database gives us 
*/
    static from (obj: FoodRow): Food {
        const food = new Food(
             obj.food_id,obj.type_id, obj.food_name, obj.food_description
        );
        return food;
    }

}

export interface FoodRow {
    food_id: number;
    type_id: number;
    food_name: string;
    food_description: string;
}