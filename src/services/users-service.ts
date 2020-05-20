import { User } from '../models/User';
import * as usersDao from '../daos/users-daos'; 

/* Returns an array of users */
export function getAllUsers(): Promise <User[]> {
    
    return usersDao.getAllUsers();
}

/* Returns a user by its id  */
export function getUserById(userId: number): Promise<User> {

    return usersDao.getUserById(userId);
}

/* Saves the user  */
export function saveUser(user: any): Promise<User> {

    const newUser = new User(
        undefined, 
        user.firstName, 
        user.lastName,
        user.userName, 
        user.email
    );

    if(user.firstName && user.lastName && user.userName && user.email) {
        
        return usersDao.saveUser(newUser);
    } else {
        
        return new Promise((resolve, reject) => reject(422));
    }
}

/* Updates the user */
export function updateUser(input: any): Promise<User> {
    
    const user = new User(
        input.userId, input.firstName,
        input.lastName, input.userName, input.email
    );

    if (!user.userId) {
        throw new Error('400');
    }

    return usersDao.updateUser(user);
}
