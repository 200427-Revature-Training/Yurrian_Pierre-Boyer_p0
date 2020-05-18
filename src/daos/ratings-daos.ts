import { db } from '../daos/db';
import { Rating, RatingRow } from '../models/Rating';

export function getAllRatings(): Promise<Rating[]> {
    const sql = 'SELECT * FROM ratings';

    return db.query<RatingRow>(sql, []).then(result => {
        const rows: RatingRow[] = result.rows;
        //console.log(rows);

        const ratings: Rating[] = rows.map(row => Rating.from(row));
        return ratings;
    });    
}

export function getRatingId(rating_id: number): Promise<Rating> {
    const sql = `SELECT * FROM ratings WHERE rating_id = $1`;

    return db.query<RatingRow>(sql, rating_id)
        .then(result => result.rows.map(row => Rating.from(row))[0]
    );
}

export function getRatingsByUserId(user_id: number): Promise<Rating[]> {
    const sql = `SELECT * FROM ratings WHERE user_id = $1`;

    return db.query<RatingRow>(sql, [user_id]).then(result => {
        const rows: RatingRow[] = result.rows;
        //console.log(rows);

        const ratings: Rating[] = rows.map(row => Rating.from(row));
        return ratings;
    });    
}

export function getRatingsByFoodId(food_id: number): Promise<Rating[]> {
    const sql = `SELECT * FROM ratings WHERE food_id = $1`;

    return db.query<RatingRow>(sql, [food_id]).then(result => {
        const rows: RatingRow[] = result.rows;
        //console.log(rows);

        const ratings: Rating[] = rows.map(row => Rating.from(row));
        return ratings;
    });    

}

export function saveRating(rating: Rating): Promise<Rating> {
    const sql = `INSERT INTO ratings (user_id, food_id, user_rating) \
      VALUES ($1, $2, $3) RETURNING *`; 
    
      return db.query<RatingRow>(sql, [
        rating.userId,
        rating.foodId,
        rating.userRating
    ]).then(result => result.rows.map(row => Rating.from(row))[0]);

}

export function updateRating(rating: Rating): Promise <Rating> {
    const sql = `UPDATE ratings SET user_rating = COALESCE($1, user_rating) \
         WHERE user_id = $2 RETURNING *`;

    return db.query<RatingRow>(sql, rating)
        .then(result => result.rows.map(row => Rating.from(row))[0]
    );
}

export function deleteRating(rating: Rating): Promise<Rating> {
    const sql = `DELETE FROM ratings WHERE user_id = $1 AND food_id = $2`;

    return db.query<RatingRow>(sql, rating)
        .then(result => result.rows.map(row => Rating.from(row))[0]
    );
}

export function deleteUserRatings(rating: Rating): Promise<Rating[]> {
    const sql = `DELETE FROM ratings WHERE user_id = $1`;

    return db.query<RatingRow>(sql, [rating]).then(result => {
        const rows: RatingRow[] = result.rows;
        //console.log(rows);

        const ratings: Rating[] = rows.map(row => Rating.from(row));
        return ratings;
    });    
}

