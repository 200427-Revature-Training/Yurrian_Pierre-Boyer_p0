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
    const id = parseInt(request.params.id);
    ratingsService.getRatingById(id).then(rating => {
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
});


/* 
    GET http://localhost:3000/ratings/userId/1
    Retrieves an array of a single user's ratings from the database by rating id
    If the rating does not exist, sends 404 
*/
ratingsRouter.get('/userId/:userId', (request, response, next) => {
    const id = parseInt(request.params.id);
    ratingsService.getRatingsByUserId(id).then(rating => {
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
});

/* 
    GET http://localhost:3000/ratings/foodId/1
    Retrieves an array of users ratings about a food from the database by food id
    If food dosen't exist, sends 404
*/
ratingsRouter.get('/foodId/:foodId', (request, response, next) => {
    const id = parseInt(request.params.id);
    ratingsService.getRatingsByFoodId(id).then(food => {
        if (!food) {
            response.sendStatus(404);
        } else {
            response.json(food);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
})


/* 
    PUT http://localhost:3000/ratings/
    Creates a new rating from a user and saves them to the database.
    Returns the inserted data as JSON with status 201.
*/
ratingsRouter.put('', (request, response, next) => {
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

/* 
    DELETE http://localhost:3000/ratings
    Deletes a certain user's rating from a database
    (ISSUE)
*/
// ratingsRouter.delete('', (request, response, next) => {
//     const id = parseInt(request.params.id);
//         ratingsService.deleteRating(id).then(deletedUser => {
//             if (!deletedUser) {
//                 response.sendStatus(404);
//                 console.log('There is no user by this id!');
//             } else {
//                 const id2 = parseInt(request.params.id2);
//                     ratingsService.deleteRating(id2).then(deletedRating => {
//                     if (!deletedRating) {
//                 response.sendStatus(404);
//                 console.log('There is no user by this id!');
//             } else {
//                 response.json(deletedRating);
//             }
//             }
            
//             next();
//         }).catch(err => {
//             response.sendStatus(500);
//             next();
//         })
// })

/* 
    DELETE http://localhost:3000/ratings/userId/1
    Deletes all of user's ratings from a database
*/
ratingsRouter.delete('/userId/:userId', (request, response, next) => {
        const id = parseInt(request.params.id);
        ratingsService.deleteUserRatings(id).then(deletedRatings => {
            if (!deletedRatings) {
                response.sendStatus(404);
            } else {
                response.json(deletedRatings);
            }
            next();
        }).catch(err => {
            response.sendStatus(500);
            next();
        })
})