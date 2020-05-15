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
    If the person does not exist, sends 404 
*/
usersRouter.get('/:id', (request, response, next) => {
    
})

/* 
    POST http://localhost:3000/users
    Creates a new user and saves them to the database.
    Returns the inserted data as JSON with status 201.
*/
usersRouter.post('', (request, response, next) => {

})

/*  PATCH http://localhost:3000/users 
    Updates a current user
*/
usersRouter.patch('', (request, response, next) => {

})

/* 
    DELETE http://localhost:3000/users/1
    Deletes a user
*/
usersRouter.delete('/:id', (request, response, next) => {

})
