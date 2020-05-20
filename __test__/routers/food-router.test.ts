import express from 'express';
import bodyParser from 'body-parser';
import { foodRouter } from '../../src/routers/food-router';
import * as foodService from '../../src/services/food-service';
import request from 'supertest';

// Setup mock for peopleService dependency
jest.mock('../../src/services/food-service');
const mockFoodService = foodService as any;

// Setup Express server and middleware
const app = express();
app.use(bodyParser.json())
app.use('/food', foodRouter);

describe('GET /food', () => {
    test('Returns normally under normal circumstances', async () => {
        mockFoodService.getAllFood.mockImplementation(async () => []);
        await request(app)
            // if we send a request to GET "/"
            .get('/food')
            // We expect a response with status of 200
            .expect(200)
            // and of content-type JSON
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test('Returns normally under normal circumstances', async () => {
        mockFoodService.getAllFood.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/food')
            .expect(500);
    });
});

describe('POST /food', () => {
    test('Successful creation should return 201 status', async () => {
        mockFoodService.saveFood.mockImplementation(async () => ({}));
        const payload = {
            typeId: 12,
            foodName: 'Spaghetti',
            description: 'Sweet-ghetti is best ghetti!'
        };

        await request(app)
            .post('/food')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockFoodService.saveFood.mockImplementation(async () => {throw new Error()});

        const payload = {
            typeId: 12,
            foodName: 'Spaghetti',
            description: 'Sweet-ghetti is best ghetti!'
        };

        await request(app)
            .post('/food')
            .send(payload)
            .expect(500);
    });
});


// test GET /food/:id
// 1. Write test that asserts that normal behavior should return a JSON payload with status 200
// 2. Write test that asserts if no object is returned (service returns falsy) status 404
// 3. Write test that asserts if service throws error, status 500

describe('GET /food/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        mockFoodService.getFoodById
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/food/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockFoodService.getFoodById
            .mockImplementation(async () => (0));

        await request(app)
            .get('/food/blahblahblah')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockFoodService.getFoodById
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/food/99')
            .expect(500)
    })
}) 

// test GET /food/typeId/:typeId
describe('GET /food/typeId/:typeId', () => {
    test('Normal behavior Json with status 200', async () => {
        mockFoodService.getFoodByTypeId
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/food/typeId/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockFoodService.getFoodByTypeId
            .mockImplementation(async () => (0));

        await request(app)
            .get('/food/typeId/blahblahblah')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockFoodService.getFoodByTypeId
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/food/typeId/99')
            .expect(500)
    })
}) 

// test GET /food/foodName/:name
describe('GET /food/foodName/:name', () => {
    test('Normal behavior Json with status 200', async () => {
        mockFoodService.getFoodByName
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/food/foodName/New York Cheesecake')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockFoodService.getFoodByName
            .mockImplementation(async () => (0));

        await request(app)
            .get('/food/foodName/blahblahblah')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockFoodService.getFoodByName
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/food/foodName/99')
            .expect(500)
    })
}) 