import * as usersService from '../../src/services/users-service';
import * as usersDao from '../../src/daos/users-daos';
import { User } from '../../src/models/User';


jest.mock('../../src/daos/users-daos');
const mockUsersDao = usersDao as any;
describe('saveUser', () => {
    test('422 returned if no firstName provided', async () => {
        // usersDao.saveUser will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockUsersDao.saveUser.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });
        const payload = {
            lastName: 'Smith',
            userName: 'Jsmith101',
            email: 'jsmith@smitty.com'
        }
        try {
            // This async function should reject due to missing firstName
            await usersService.saveUser(payload);
            fail('usersService.saveUser did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });
    test('422 returned if no email is provided', async () => {
        // peopleDao.savePerson will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockUsersDao.saveUser.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });
        const payload = {
            firstName: 'John',
            lastName: 'Smith',
            userName: 'Jsmith'  
        }
        try {
            // This async function should reject due to missing email
            await usersService.saveUser(payload);
            fail('usersService.saveUser did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });
    test('422 returned if no lastName provided', async () => {
        // peopleDao.savePerson will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockUsersDao.saveUser.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });
        const payload = {
            firstName: 'John',
            userName: 'Jsmith101',
            email: 'jsmith@smitty.com'
        }
        try {
            // This async function should reject due to missing lastName
            await usersService.saveUser(payload);
            fail('usersService.saveUser did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });
    test('422 returned if no userName provided', async () => {
        // usersDao.saveUser will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockUsersDao.saveUser.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });
        const payload = {
            firstName: 'John',
            lastName: 'Smith',
            email: 'jsmith@smitty.com'
        }
        try {
            // This async function should reject due to missing userName
            await usersService.saveUser(payload);
            fail('usersService.saveUser did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });
    test('Input object transformed to Person object', async () => {
        mockUsersDao.saveUser.mockImplementation(o => o);
        const payload = {
            firstName: 'John',
            lastName: 'Smith',
            userName: 'Jsmith101',
            email: 'jsmith@smitty.com'
        };
        const result = await usersService.saveUser(payload);
        expect(payload).not.toBeInstanceOf(User);
        expect(result).toBeInstanceOf(User);
    });
    test('ID value of input is replaced in output', async () => {
        mockUsersDao.saveUser.mockImplementation(o => o);
        const payload = {
            userId: 15,
            firstName: 'John',
            lastName: 'Smith',
            userName: 'Jsmith101',
            email: 'jsmith@smitty.com'
        };
        const result = await usersService.saveUser(payload);
        expect(result.userId).not.toBe(payload.userId);
    });
    test('Extraneous fields in input are not in output', async () => {
        mockUsersDao.saveUser.mockImplementation(o => o);
        const payload = {
            firstName: 'John',
            lastName: 'Smith',
            userName: 'Jsmith101',
            email: 'jsmith@smitty.com',
            likesSkateboards: true
        };
        const result = await usersService.saveUser(payload) as any;
        expect(result.likesSkateboards).not.toBeDefined();
    });
});

describe('updateUser', () => {

    /* Testing behavior of updateUser */
    /*
        1. When a valid patch with an id property is provied, patch succeeds
            returning a truthy object.
        2. When a patch with no id property is provided, an error should be thrown.
    */

    test('successful patch', async () => {
        expect.assertions(1);

        mockUsersDao.updateUser
            .mockImplementation(() => ({}));

        const payload = {
            userId: 1,
            firstName: 'Gumball',
            lastName: 'Watterson',
            userName: 'Gwatters365',
            email: 'YouGotAnEmailFromMe@LuckyYou.com'
        };

        const result = await usersService.updateUser(payload);
        expect(result).toBeTruthy();
    });

    test('patch fails when no valid userId is provided', async () => {
        expect.assertions(1);

        mockUsersDao.updateUser
            .mockImplementation(() => ({}));

        const payload = {
            firstName: 'Gumball',
            lastName: 'Watterson',
            userName: 'Gwatters365',
            email: 'YouGotAnEmailFromMe@LuckyYou.com' 
        };

        try {
            await usersService.updateUser(payload);
            fail();
        } catch(err) {
            expect(err).toBeTruthy();
        }
    });
});
