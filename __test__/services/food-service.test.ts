import * as foodService from '../../src/services/food-service';
import * as foodDao from '../../src/daos/food-daos';
import { Food } from '../../src/models/Food';


jest.mock('../../src/daos/food-daos');
const mockFoodDao = foodDao as any;
describe('saveFood', () => {
    test('422 returned if no typeId provided', async () => {
        // foodDao.saveFood will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockFoodDao.saveFood.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });
        const payload = {
            foodName: 'Strawberry Ice Cream',
            description: 'Rich strawberry cream with chunks of berry!'
        }
        try {
            // This async function should reject due to missing typeId
            await foodService.saveFood(payload);
            fail('foodService.saveUser did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });
    test('422 returned if no foodName is provided', async () => {
        // peopleDao.savePerson will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockFoodDao.saveFood.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });
        const payload = {
            typeId: 10,
            description: 'Rich strawberry cream with chunks of berry!'
        }
        try {
            // This async function should reject due to missing foodName
            await foodService.saveFood(payload);
            fail('foodService.saveFood did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });
    test('422 returned if no description provided', async () => {
        // foodDao.saveFood will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockFoodDao.saveFood.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });
        const payload = {
            typeId: 10, 
            foodName: 'Strawberry Ice Cream'
        }
        try {
            // This async function should reject due to missing description
            await foodService.saveFood(payload);
            fail('foodService.saveFood did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });

    test('Input object transformed to Food object', async () => {
        mockFoodDao.saveFood.mockImplementation(o => o);
        const payload = {
            typeId: 10,
            foodName: 'Strawberry Ice Cream',
            description: 'Rich strawberry cream with chunks of berry!'
            
        };
        const result = await foodService.saveFood(payload);
        expect(payload).not.toBeInstanceOf(Food);
        expect(result).toBeInstanceOf(Food);
    });
    test('ID value of input is replaced in output', async () => {
        mockFoodDao.saveFood.mockImplementation(o => o);
        const payload = {
            foodId:  5,
            typeId: 10,
            foodName: 'Strawberry Ice Cream',
            description: 'Rich strawberry cream with chunks of berry!'
        };
        const result = await foodService.saveFood(payload);
        expect(result.foodId).not.toBe(payload.foodId);
    });
    test('Extraneous fields in input are not in output', async () => {
        mockFoodDao.saveFood.mockImplementation(o => o);
        const payload = {
            typeId: 10,
            foodName: 'Strawberry Ice Cream',
            description: 'Rich strawberry cream with chunks of berry!',
            likesSkateboards: true
        };
        const result = await foodService.saveFood(payload) as any;
        expect(result.likesSkateboards).not.toBeDefined();
    });
}); 

describe('updateFood', () => {

    /* Testing behavior of updateFood */
    /*
        1. When a valid patch with an id property is provied, patch succeeds
            returning a truthy object.
        2. When a patch with no id property is provided, an error should be thrown.
    */

    test('successful patch', async () => {
        expect.assertions(1);

        mockFoodDao.updateFood
            .mockImplementation(() => ({}));

        const payload = {
            foodId: 3,
            typeId: 10,
            foodName: 'Rocky Road',
            description: 'No ifs or buts with chocolate and nuts'
        };

        const result = await foodService.updateFood(payload);
        expect(result).toBeTruthy();
    });

    test('patch fails when no valid foodId is provided', async () => {
        expect.assertions(1);

        mockFoodDao.updateFood
            .mockImplementation(() => ({}));

        const payload = {
            typeId: 10,
            foodName: 'Rocky Road',
            description: 'No ifs or buts with chocolate and nuts'
        };

        try {
            await foodService.updateFood(payload);
            fail();
        } catch(err) {
            expect(err).toBeTruthy();
        }
    });
});
