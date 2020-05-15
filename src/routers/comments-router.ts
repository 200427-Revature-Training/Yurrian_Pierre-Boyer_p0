import express from 'express';
import * as commentsService from '../services/comments-service';

export const commentsRouter = express.Router();

/* 
    GET http://localhost:3000/comments
    Retrieves an array of comments from database
*/
commentsRouter.get('', (request, response, next) => {
    commentsService.getAllComments().then(users => {
        response.json(users);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

/* 
    GET http://localhost:3000/comments/1
    Retrieves an array of a single user's comments from the database by user id
    If the person does not exist, sends 404 
*/
commentsRouter.get('/:userId', (request, response, next) => {
    
})

/* 
    GET http://localhost:3000/comments/1/2
    Retrieves an array of a single user's comments from the database by food id
    (May be unnecessary)
*/
commentsRouter.put('/:userId/:foodId', (request, response, next) => {

})

/* 
    PUT http://localhost:3000/comments/1/2
    Creates a new comment from a user and saves them to the database.
    Returns the inserted data as JSON with status 201.
*/
commentsRouter.put('/:userId/:foodId', (request, response, next) => {

})

/* 
    PATCH http://localhost:3000/comments/1/2
    Updates a user's rating and saves it into the database
*/
commentsRouter.patch('/:userId/:foodId', (request, response, next) => {

}) 

/* 
    DELETE http://localhost:3000/comments/1/2
    Deletes a certain user's rating from a database
*/
commentsRouter.delete('/:userId/:foodId', (request, response, next) => {

})

/* 
    DELETE http://localhost:3000/comments/1/2
    Deletes all of user's ratings from a database
*/
commentsRouter.delete('/:userId', (request, response, next) => {

})