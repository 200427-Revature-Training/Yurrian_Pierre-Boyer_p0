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
    Retrieves a single rating from the database by rating id
    If the rating does not exist, sends 404 
*/
ratingsRouter.get('/:ratingId', (request, response, next) => {
    const ratingId = parseInt(request.params.ratingId);
    ratingsService.getRatingById(ratingId).then(ratingId => {
        if (!ratingId) {
            response.sendStatus(404);
        } else {
            response.json(ratingId);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});


/* 
    GET http://localhost:3000/ratings/userId/1
    Retrieves an array of a single user's ratings from the database by rating id
    If the rating does not exist, sends 404 
*/
ratingsRouter.get('/userId/:userId', (request, response, next) => {
    const userId = parseInt(request.params.userId);
    ratingsService.getRatingsByUserId(userId).then(userId => {
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
    GET http://localhost:3000/ratings/foodId/1
    Retrieves an array of users ratings about a food from the database by food id
    If food dosen't exist, sends 404
*/
ratingsRouter.get('/foodId/:foodId', (request, response, next) => {
    const foodId = parseInt(request.params.foodId);
    ratingsService.getRatingsByFoodId(foodId).then(foodId => {
        if (!foodId) {
            response.sendStatus(404);
        } else {
            response.json(foodId);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
})
 

/* 
    POST http://localhost:3000/ratings/
    Creates a new rating from a user and saves them to the database.
    Returns the inserted data as JSON with status 201.
*/
ratingsRouter.post('', (request, response, next) => {
    const rating = request.body;
    ratingsService.saveRating(rating)
        .then(newRating => {
            response.status(201);
            response.json(newRating);
            next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
            next();
        });
})

/* 
    PATCH http://localhost:3000/ratings/ 
    Updates a user's rating and saves it into the database
*/
ratingsRouter.patch('', (request, response, next) => {
    const rating = request.body;
    ratingsService.updateRating(rating)
        .then(updatedRating => {
            if (updatedRating) {
                response.json(updatedRating);
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
