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
usersRouter.get('/:userId', (request, response, next) => {
    const user_id = parseInt(request.params.user_id);
    usersService.getUserById(user_id).then(user => {
        if (!user) {
            response.sendStatus(404);
        } else {
            response.json(user);
        }
        next();
    }).catch(err => {
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
            response.sendStatus(500);
        }).finally(() => {
            next();
        })

})

/* 
    DELETE http://localhost:3000/users/1
    Deletes a user
*/
usersRouter.delete('/:id', (request, response, next) => {
    const id = parseInt(request.params.id);
    usersService.deleteUser(id).then(deletedUser => {
        if (!deletedUser) {
            response.sendStatus(404);
            console.log('There is no user by this id!');
        } else {
            response.json(deletedUser);
        }
        next();
    }).catch(err => {
        response.sendStatus(500);
        next();
    })
})
