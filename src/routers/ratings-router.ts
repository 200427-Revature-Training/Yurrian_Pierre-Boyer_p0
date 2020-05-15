import express from 'express';
import * as ratingsService from '../services/ratings-service';

export const ratingsRouter = express.Router();

/* 
    GET http://localhost:3000/ratings
    Retrieves an array of ratings from database
*/
ratingsRouter.get('', (request, response, next) => {
    ratingsService.getAllRatings().then(users => {
        response.json(users);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

/* 
    GET http://localhost:3000/ratings/1
    Retrieves an array of a single user's ratings from the database by user id
    If the person does not exist, sends 404 
*/
ratingsRouter.get('/:userId', (request, response, next) => {
    
})

/* 
    GET http://localhost:3000/ratings/1/2
    Retrieves an array of a single user's ratings from the database by food id
    (May be unnecessary)
*/
ratingsRouter.get('/:userId/:foodId', (request, response, next) => {

})

/* 
    GET http://localhost:3000/ratings/1/2
    Retrieves average rating of a food by its food id 
    
*/
ratingsRouter.get('/:foodId', (request, response, next) => {

})

/* 
    PUT http://localhost:3000/ratings/1/2
    Creates a new rating from a user and saves them to the database.
    Returns the inserted data as JSON with status 201.
*/
ratingsRouter.put('/:userId/:foodId', (request, response, next) => {

})

/* 
    PATCH http://localhost:3000/ratings/1/2
    Updates a user's rating and saves it into the database
*/
ratingsRouter.patch('/:userId/:foodId', (request, response, next) => {

}) 



/* 
    DELETE http://localhost:3000/ratings/1/2
    Deletes a certain user's rating from a database
*/
ratingsRouter.delete('/:userId/:foodId', (request, response, next) => {

})

/* 
    DELETE http://localhost:3000/ratings/1/2
    Deletes all of user's ratings from a database
*/
ratingsRouter.delete('/:userId', (request, response, next) => {

})