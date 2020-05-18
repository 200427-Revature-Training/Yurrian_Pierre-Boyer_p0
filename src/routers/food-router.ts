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
    If the food does not exist, sends 404 
*/
foodRouter.get('/:foodId', (request, response, next) => {
        const id = parseInt(request.params.id);
        foodService.getFoodById(id).then(rating => {
            if (!rating) {
                response.sendStatus(404);
            } else {
                response.json(rating);
            }
            next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
            next();
        })
})

/* 
    GET http://localhost:3000/food/typeId/1
    Retrieves array of food from the database by its type id
    If the food type does not exist, sends 404 
*/
foodRouter.get('/typeId/:typeId', (request, response, next) => {
    const id = parseInt(request.params.id);
        foodService.getFoodById(id).then(rating => {
            if (!rating) {
                response.sendStatus(404);
            } else {
                response.json(rating);
            }
            next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
            next();
        })
})

/* 
    GET http://localhost:3000/food/name
    Retrieves food from the database by id and its type id
    If the person does not exist, sends 404 
    
*/
foodRouter.get('/:foodName', (request, response, next) => {
    const name = (request.params.name);
        foodService.getFoodByName(name).then(rating => {
            if (!name) {
                response.sendStatus(404);
            } else {
                response.json(name);
            }
            next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
            next();
        })
})

/* 
    POST http://localhost:3000/food/
    Creates a new food and saves them to the database.
    Returns the inserted data as JSON with status 201.
*/
foodRouter.post('', (request, response, next) => {
    const food = request.body;
    foodService.saveFood(food)
        .then(newFood => {
            response.status(201);
            response.json(newFood);
            next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
            next();
        })    
})

/*  PATCH http://localhost:3000/food/ 
    Updates a current food
*/
foodRouter.patch('', (request, response, next) => {
    const food = request.body;
    foodService.updateFood(food)
        .then(updatedFood => {
            if (updatedFood) {
                response.json(updatedFood);
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

/* 
    DELETE http://localhost:3000/food/1
    Deletes a food
*/
foodRouter.delete('/:foodId', (request, response, next) => {
    const id = parseInt(request.params.id);
    foodService.deleteFood(id).then(deletedFood => {
        if (!deletedFood) {
            response.sendStatus(404);
        } else {
            response.json(deletedFood);
        }
        next();
    }).catch(err => {
        response.sendStatus(500);
        next();
    })
})    
