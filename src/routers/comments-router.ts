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
    Retrieves a comment about from the database by id
    If the person does not exist, sends 404 
*/
commentsRouter.get('/:commentId', (request, response, next) => {
    const commentId = parseInt(request.params.commentId);
        commentsService.getCommentById(commentId).then(commentId => {
            if (!commentId) {
                response.sendStatus(404);
            } else {
                response.json(commentId);
            }
            next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
            next();
        })
})

/* 
    GET http://localhost:3000/comments/userId/1
    Retrieves an array of a single user's comments from the database by user id
*/
commentsRouter.get('/userId/:userId/', (request, response, next) => {
    const userId = parseInt(request.params.userId);
        commentsService.getCommentsByUserId(userId).then(userId => {
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
})

/* 
    GET http://localhost:3000/comments/foodId/1
    Retrieves an array of comments about a food from the database by food id
*/
commentsRouter.get('/foodId/:foodId/', (request, response, next) => {
        const foodId = parseInt(request.params.foodId);
            commentsService.getCommentsByFoodId(foodId).then(foodId => {
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
    POST http://localhost:3000/comments/
    Creates a new comment from a user and saves them to the database.
    Returns the inserted data as JSON with status 201.
*/
commentsRouter.post('', (request, response, next) => {
    const comment = request.body;
    commentsService.saveComment(comment)
        .then(newComment => {
            response.status(201);
            response.json(newComment);
            next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
            next();
        });
})

/* 
    PATCH http://localhost:3000/comments/
    Updates a user's rating and saves it into the database
*/
commentsRouter.patch('', (request, response, next) => {
    const comment = request.body;
    commentsService.updateComment(comment)
        .then(updatedComment => {
            if (updatedComment) {
                response.json(updatedComment);
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
