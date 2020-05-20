import * as ratingsService from '../../src/services/ratings-service';
import * as ratingsDao from '../../src/daos/ratings-daos';
import { Rating } from '../../src/models/Rating';


jest.mock('../../src/daos/ratings-daos');
const mockRatingsDao = ratingsDao as any;
describe('saveRating', () => {
    test('422 returned if no userId provided', async () => {
        // ratingsDao.saveRating will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockRatingsDao.saveRating.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });
        const payload = {
            foodId: 13,
            userRating: 5
        }
        try {
            // This async function should reject due to missing userId
            await ratingsService.saveRating(payload);
            fail('ratingsService.saveRating did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });
    test('422 returned if no foodId is provided', async () => {
        // foodDao.saveRating will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockRatingsDao.saveRating.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });
        const payload = {
            userId: 1,
            userRating: 5  
        }
        try {
            // This async function should reject due to missing foodId
            await ratingsService.saveRating(payload);
            fail('ratingsService.saveRating did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });
    test('422 returned if no userRating provided', async () => {
        // peopleDao.savePerson will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockRatingsDao.saveRating.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });
        const payload = {
            userId: 1,
            foodId: 13,
        }
        try {
            // This async function should reject due to missing userRating
            await ratingsService.saveRating(payload);
            fail('ratingsService.saveRating did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });
    test('Input object transformed to Rating object', async () => {
        mockRatingsDao.saveRating.mockImplementation(o => o);
        const payload = {
            userId: 1,
            foodId: 13,
            userRating: 5   
        };
        const result = await ratingsService.saveRating(payload);
        expect(payload).not.toBeInstanceOf(Rating);
        expect(result).toBeInstanceOf(Rating);
    });
    test('ID value of input is replaced in output', async () => { 
        mockRatingsDao.saveRating.mockImplementation(o => o);
        const payload = {
            ratingId: 7,
            userId: 6,
            foodId: 13,
            userRating: 5 
        };
        const result = await ratingsService.saveRating(payload);
        expect(result.ratingId).not.toBe(payload.ratingId);
    });
    test('Extraneous fields in input are not in output', async () => {
        mockRatingsDao.saveRating.mockImplementation(o => o);
        const payload = {
            userId: 1,
            foodId: 13,
            userRating: 5,
            likesSkateboards: true
        };
        const result = await ratingsService.saveRating(payload) as any;
        expect(result.likesSkateboards).not.toBeDefined();
    });
});

describe('updateRating', () => {

    /* Testing behavior of updateRating */
    /*
        1. When a valid patch with an id property is provied, patch succeeds
            returning a truthy object.
        2. When a patch with no id property is provided, an error should be thrown.
    */

    test('successful patch', async () => {
        expect.assertions(1);

        mockRatingsDao.updateRating
            .mockImplementation(() => ({}));

        const payload = {
            ratingId: 1,
            userId: 6,
            foodId: 15,
            userRating: 4
        };

        const result = await ratingsService.updateRating(payload);
        expect(result).toBeTruthy();
    });

    test('patch fails when no valid ratingId is provided', async () => {
        expect.assertions(1);

        mockRatingsDao.updateRating
            .mockImplementation(() => ({}));

        const payload = {
            userId: 6,
            foodId: 15,
            userRating: 4
        };

        try {
            await ratingsService.updateRating(payload);
            fail();
        } catch(err) {
            expect(err).toBeTruthy();
        }
    });
});