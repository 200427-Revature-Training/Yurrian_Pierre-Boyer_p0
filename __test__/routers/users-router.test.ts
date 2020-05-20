import express from 'express';
import bodyParser from 'body-parser';
import { usersRouter } from '../../src/routers/users-router';
import * as usersService from '../../src/services/users-service';
import request from 'supertest';

// Setup mock for peopleService dependency
jest.mock('../../src/services/users-service');
const mockUsersService = usersService as any;

// Setup Express server and middleware
const app = express();
app.use(bodyParser.json()) 
app.use('/users', usersRouter);

describe('GET /users', () => {
    test('Returns normally under normal circumstances', async () => {
        mockUsersService.getAllUsers.mockImplementation(async () => []);
        await request(app)
            // if we send a request to GET "/"
            .get('/users')
            // We expect a response with status of 200
            .expect(200)
            // and of content-type JSON
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test('Returns normally under normal circumstances', async () => {
        mockUsersService.getAllUsers.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/users')
            .expect(500);
    });
});

describe('POST /users', () => {
    test('Successful creation should return 201 status', async () => {
        mockUsersService.saveUser.mockImplementation(async () => ({}));
        const payload = {
            firstName: 'John',
            lastName: 'Smith',
            userName: 'Jsmith101',
            email: 'Jsmith@smitty.com'
        };

        await request(app)
            .post('/users')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockUsersService.saveUser.mockImplementation(async () => {throw new Error()});

        const payload = {
            firstName: 'John',
            lastName: 'Smith',
            userName: 'Jsmith101',
            email: 'Jsmith@smitty.com'
        };

        await request(app)
            .post('/users')
            .send(payload)
            .expect(500); 
    });
});

// test GET /users/:id
// 1. Write test that asserts that normal behavior should return a JSON payload with status 200
// 2. Write test that asserts if no object is returned (service returns falsy) status 404
// 3. Write test that asserts if service throws error, status 500

describe('GET /users/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        mockUsersService.getUserById
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/users/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockUsersService.getUserById 
            .mockImplementation(async () => (0));

        await request(app)
            .get('/users/blahblahblah')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockUsersService.getUserById
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/users/99')
            .expect(500)
    })
})