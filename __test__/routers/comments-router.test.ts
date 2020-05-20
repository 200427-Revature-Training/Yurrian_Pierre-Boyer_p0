import express from 'express';
import bodyParser from 'body-parser';
import { commentsRouter } from '../../src/routers/comments-router';
import * as commentsService from '../../src/services/comments-service';
import request from 'supertest';

// Setup mock for commentsService dependency
jest.mock('../../src/services/comments-service');
const mockCommentsService = commentsService as any;

// Setup Express server and middleware
const app = express();
app.use(bodyParser.json())
app.use('/comments', commentsRouter);

describe('GET /comments', () => {
    test('Returns normally under normal circumstances', async () => {
        mockCommentsService.getAllComments.mockImplementation(async () => []);
        await request(app)
            // if we send a request to GET "/"
            .get('/comments')
            // We expect a response with status of 200
            .expect(200)
            // and of content-type JSON
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test('Returns normally under normal circumstances', async () => {
        mockCommentsService.getAllComments.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/comments')
            .expect(500);
    });
});

describe('POST /comments', () => {
    test('Successful creation should return 201 status', async () => {
        mockCommentsService.saveComment.mockImplementation(async () => ({}));
        const payload = {
            userId: 17,
            foodId: 3,
            commentContent: 'This is a nice basic dish :)' 
        };

        await request(app)
            .post('/comments')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockCommentsService.saveComment.mockImplementation(async () => {throw new Error()});

        const payload = {
            userId: 17,
            foodId: 3,
            commentContent: 'This is a nice basic dish :)' 
        };

        await request(app)
            .post('/comments')
            .send(payload)
            .expect(500);
    }); 
});


// test GET /comments/:id
// 1. Write test that asserts that normal behavior should return a JSON payload with status 200
// 2. Write test that asserts if no object is returned (service returns falsy) status 404
// 3. Write test that asserts if service throws error, status 500

describe('GET /comments/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        mockCommentsService.getCommentById
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/comments/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockCommentsService.getCommentById
            .mockImplementation(async () => (0));

        await request(app)
            .get('/comments/blahblahblah')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockCommentsService.getCommentById
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/comments/99')
            .expect(500)
    }) 
}) 

// test GET /comments/userId/:userId
describe('GET /comments/userId/:userId', () => {
    test('Normal behavior Json with status 200', async () => {
        mockCommentsService.getCommentsByUserId
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/comments/userId/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockCommentsService.getCommentsByUserId
            .mockImplementation(async () => (0));

        await request(app)
            .get('/comments/userId/blahblahblah')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockCommentsService.getCommentsByUserId
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/comments/userId/99')
            .expect(500)
    }) 
}) 

// test GET /comments/foodId/:foodId
describe('GET /comments/foodId/:foodId', () => {
    test('Normal behavior Json with status 200', async () => {
        mockCommentsService.getCommentsByFoodId
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/comments/foodId/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockCommentsService.getCommentsByFoodId
            .mockImplementation(async () => (0));

        await request(app)
            .get('/comments/foodId/blahblahblah')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockCommentsService.getCommentsByFoodId
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/comments/foodId/99')
            .expect(500)
    }) 
}) 