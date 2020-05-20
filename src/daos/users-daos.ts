import { db } from '../daos/db';
import { User, UserRow } from '../models/User';

export function getAllUsers(): Promise<User[]> {
    const sql = 'SELECT * FROM users';

    return db.query<UserRow>(sql, []).then(result => {
        const rows: UserRow[] = result.rows;
        //console.log(rows);

        const users: User[] = rows.map(row => User.from(row));
        return users;
    });    
}

export function getUserById(user_id: number): Promise<User> {
    const sql = `SELECT * FROM users WHERE user_id = $1`;

    return db.query<UserRow>(sql, [user_id])
        .then(result => result.rows.map(row => User.from(row))[0]
    );
    
}

export function saveUser(user: User): Promise<User> {
    const sql = `INSERT INTO users (first_name, last_name, user_name, email) \
      VALUES ($1, $2, $3, $4) RETURNING *`; 
    
      return db.query<UserRow>(sql, [
        user.firstName,
        user.lastName,
        user.userName,
        user.email
    ]).then(result => result.rows.map(row => User.from(row))[0]);
} 


export function updateUser(user: User): Promise<User> {
    const sql = `UPDATE users SET first_name = COALESCE($1, first_name), \
        last_name = COALESCE($2, last_name), user_name = COALESCE($3, user_name), \
        email = COALESCE($4, email) WHERE user_id = $5 RETURNING *`;

    const params = [user.firstName, user.lastName,
            user.userName, user.email, user.userId
        ];

    return db.query<UserRow>(sql, params)
        .then(result => result.rows.map(row => User.from(row))[0]
    );
    
}
