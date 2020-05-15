import express from 'express';
import * as foodService from '../services/food-service';

export const foodRouter = express.Router();

/* 
    GET http://localhost:3000/food
    Retrieves an array of food from database
*/
foodRouter.get('', (request, response, next) => {
    foodService.getAllFood().then(users => {
        response.json(users);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

/* 
    GET http://localhost:3000/food/1
    Retrieves a single food from the database by id 
    If the person does not exist, sends 404 
*/
foodRouter.get('/:foodId', (request, response, next) => {
    
})

/* 
    GET http://localhost:3000/food/
    Retrieves an array food from the database by name 
    If the person does not exist, sends 404 
*/
foodRouter.get('/:foodName', (request, response, next) => {
    
})

/* 
    GET http://localhost:3000/food/1/2
    Retrieves food from the database by id and its type id
    If the person does not exist, sends 404 
    (May be unecessary)
*/
foodRouter.get('/:foodId/:typeId', (request, response, next) => {
    
})

/* 
    POST http://localhost:3000/food/1/2
    Creates a new food and saves them to the database.
    Returns the inserted data as JSON with status 201.
*/
foodRouter.post('', (request, response, next) => {

})

/*  PATCH http://localhost:3000/food/ 
    Updates a current food
*/
foodRouter.patch('', (request, response, next) => {

})

/* 
    DELETE http://localhost:3000/food/1
    Deletes a food
*/
foodRouter.delete('/:id', (request, response, next) => {

})