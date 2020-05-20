import { db } from '../daos/db';
import { Food, FoodRow } from '../models/Food';

export function getAllFood(): Promise<Food[]> {
    const sql = 'SELECT * FROM food';

    return db.query<FoodRow>(sql, []).then(result => {
        const rows: FoodRow[] = result.rows;
        //console.log(rows);

        const food: Food[] = rows.map(row => Food.from(row));
        return food;
    });    
}

export function getFoodById(food_id: number): Promise<Food> {
    const sql = `SELECT * FROM food WHERE food_id = $1`;

    return db.query<FoodRow>(sql, [food_id])
        .then(result => result.rows.map(row => Food.from(row))[0]    
    
    );    
}

export function getFoodByTypeId(type_id: number): Promise<Food[]> {
    const sql = `SELECT * FROM food WHERE type_id = $1`;

    return db.query<FoodRow>(sql, [type_id]).then(result => {
        const rows: FoodRow[] = result.rows;
        //console.log(rows);

        const food: Food[] = rows.map(row => Food.from(row));
        return food;
    });    
}

export function getFoodByName(food_name: string): Promise<Food> {
    const sql = `SELECT * FROM food WHERE food_name = $1`;

    return db.query<FoodRow>(sql, [food_name])
        .then(result => result.rows.map(row => Food.from(row))[0]    
    
    );    
}

export function saveFood(food: Food): Promise<Food> {
    const sql = `INSERT INTO food (type_id, food_name, food_description) \
      VALUES ($1, $2, $3) RETURNING *`; 
    
      return db.query<FoodRow>(sql, [
        food.typeId, 
        food.foodName,
        food.description
    ]).then(result => result.rows.map(row => Food.from(row))[0]);
}

export function updateFood(food: Food): Promise<Food> {
    const sql = `UPDATE food SET type_id = COALESCE($1, type_id), \
         food_name = COALESCE($2, food_name), food_description = COALESCE($3, food_description) \ 
         WHERE food_id = $4 RETURNING *`;
    
    const params = [food.typeId, food.foodName,
            food.description, food.foodId
        ];

    return db.query<FoodRow>(sql, params)
        .then(result => result.rows.map(row => Food.from(row))[0]
    );    
}
