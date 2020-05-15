export class User {
    userId: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;



    constructor(userId: number, firstName: string, lastName: string, userName: string, email: string) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.email = email;
    }

/* 
    Static function for creating a User instance
    from the structure the database gives us 
*/
    static from (obj: UserRow): User {
        const user = new User(
            obj.user_id, obj.first_name, obj.last_name, obj.user_name, obj.email
        );
        return user;
    }

}

export interface UserRow {
    user_id: number;
    first_name: string;
    last_name: string;
    user_name: string;
    email: string;
}