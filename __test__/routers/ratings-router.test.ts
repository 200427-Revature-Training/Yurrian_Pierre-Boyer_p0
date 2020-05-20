import express from 'express';
import bodyParser from 'body-parser';
import { ratingsRouter } from '../../src/routers/ratings-router';
import * as ratingsService from '../../src/services/ratings-service';
import request from 'supertest';

// Setup mock for peopleService dependency
jest.mock('../../src/services/ratings-service');
const mockRatingsService = ratingsService as any;

// Setup Express server and middleware
const app = express();
app.use(bodyParser.json())
app.use('/ratings', ratingsRouter);
 
describe('GET /ratings/', () => {
    test('Returns normally under normal circumstances', async () => {
        mockRatingsService.getAllRatings.mockImplementation(async () => []);
        await request(app)
            // if we send a request to GET "/"
            .get('/ratings')
            // We expect a response with status of 200
            .expect(200)
            // and of content-type JSON
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test('Returns normally under normal circumstances', async () => {
        mockRatingsService.getAllRatings.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/ratings')
            .expect(500);
    });
});

describe('POST /ratings', () => {
    test('Successful creation should return 201 status', async () => {
        mockRatingsService.saveRating.mockImplementation(async () => ({}));
        const payload = {
            userId: 8,
            foodId: 12,
            userRating: 5
        };

        await request(app)
            .post('/ratings')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockRatingsService.saveRating.mockImplementation(async () => {throw new Error()});

        const payload = {
            userId: 8,
            foodId: 12,
            userRating: 5
        };

        await request(app)
            .post('/ratings')
            .send(payload)
            .expect(500);
    });
});


// test GET /ratings/:id
// 1. Write test that asserts that normal behavior should return a JSON payload with status 200
// 2. Write test that asserts if no object is returned (service returns falsy) status 404
// 3. Write test that asserts if service throws error, status 500

describe('GET /ratings/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        mockRatingsService.getRatingById
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/ratings/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockRatingsService.getRatingById
            .mockImplementation(async () => (0));

        await request(app)
            .get('/ratings/blahblahblah')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockRatingsService.getRatingById
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/ratings/99')
            .expect(500)
    })
})

// test GET /ratings/userId/:userId
describe('GET /ratings/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        mockRatingsService.getRatingsByUserId
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/ratings/userId/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockRatingsService.getRatingsByUserId
            .mockImplementation(async () => (0));

        await request(app)
            .get('/ratings/userId/blahblahblah')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockRatingsService.getRatingsByUserId
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/ratings/userId/99')
            .expect(500)
    })
})

// test GET /ratings/foodId/:foodId
describe('GET /ratings/foodId/:foodId', () => {
    test('Normal behavior Json with status 200', async () => {
        mockRatingsService.getRatingsByFoodId
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/ratings/foodId/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockRatingsService.getRatingsByFoodId
            .mockImplementation(async () => (0));

        await request(app)
            .get('/ratings/foodId/blahblahblah')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockRatingsService.getRatingsByFoodId
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/ratings/foodId/99')
            .expect(500)
    })
})