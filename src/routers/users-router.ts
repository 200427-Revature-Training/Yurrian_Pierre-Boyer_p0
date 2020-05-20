import express from 'express';
import * as usersService from '../services/users-service';

export const usersRouter = express.Router();

/* 
    GET http://localhost:3000/users
    Retrieves an array of users from database
*/
usersRouter.get('', (request, response, next) => {
    usersService.getAllUsers().then(users => {
        response.json(users);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

/* 
    GET http://localhost:3000/users/1
    Retrieves a single user from the database by id
    If the user does not exist, sends 404 
*/
usersRouter.get('/:userId', (request, response, next) => {
    const userId = parseInt(request.params.userId);
    usersService.getUserById(userId).then(userId => {
        if (!userId) {
            response.sendStatus(404);
        } else {
            response.json(userId);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});

/* 
    POST http://localhost:3000/users
    Creates a new user and saves them to the database.
    Returns the inserted data as JSON with status 201.
*/
usersRouter.post('', (request, response, next) => {
    const user = request.body;
    usersService.saveUser(user)
        .then(newUser => {
            response.status(201);
            response.json(newUser);
            next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
            next();
        });
});

/*  PATCH http://localhost:3000/users 
    Updates a current user
*/
usersRouter.patch('', (request, response, next) => {
    const user = request.body;
    usersService.updateUser(user)
        .then(updatedUser => {
            if (updatedUser) {
                response.json(updatedUser);
            } else {
                response.sendStatus(404);
            }
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
        }).finally(() => {
            next();
        })

})
