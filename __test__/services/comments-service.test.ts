import * as commentsService from '../../src/services/comments-service';
import * as commentsDao from '../../src/daos/comments-daos';
import { Comment } from '../../src/models/Comment';


jest.mock('../../src/daos/comments-daos');
const mockCommentsDao = commentsDao as any;
describe('saveComment', () => {
    test('422 returned if no userId provided', async () => {
        // commentsDao.saveComment will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockCommentsDao.saveComment.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });
        const payload = {
            foodId: 11,
            commentContent: 'Yum yum yum yum Delicioso!'
        }
        try {
            // This async function should reject due to missing userId
            await commentsService.saveComment(payload);
            fail('commentsService.saveComment did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });
    test('422 returned if no foodId is provided', async () => {
        // commentsDao.saveComment will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockCommentsDao.saveComment.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });
        const payload = {
            userId: 21,
            commentContent: ' Yum yum yum yum Delicioso!' 
        }
        try {
            // This async function should reject due to missing email
            await commentsService.saveComment(payload);
            fail('commentsService.saveUser did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });
    test('422 returned if no commentContent provided', async () => {
        // commentsDao.saveComment will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockCommentsDao.saveComment.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });
        const payload = {
            userId: 21,
            foodId: 11
        }
        try {
            // This async function should reject due to missing commentContent
            await commentsService.saveComment(payload);
            fail('commentsService.saveUser did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });
    test('Input object transformed to Comment object', async () => {
        mockCommentsDao.saveComment.mockImplementation(o => o);
        const payload = {
            userId: 21,
            foodId: 11,
            commentContent: 'Yum yum yum yum Delicioso!'   
        };
        const result = await commentsService.saveComment(payload);
        expect(payload).not.toBeInstanceOf(Comment);
        expect(result).toBeInstanceOf(Comment);
    });
    test('ID value of input is replaced in output', async () => {
        mockCommentsDao.saveComment.mockImplementation(o => o);
        const payload = {
            commentId: 10,
            userId: 21,
            foodId: 11,
            commentContent: 'Yum yum yum yum Delicioso!',
        };
        const result = await commentsService.saveComment(payload);
        expect(result.commentId).not.toBe(payload.commentId);
    });
    test('Extraneous fields in input are not in output', async () => {
        mockCommentsDao.saveComment.mockImplementation(o => o);
        const payload = {
            commentId: 10,
            userId: 21,
            foodId: 11,
            commentContent: 'Yum yum yum yum Delicioso!',
            likesSkateboards: true
        };
        const result = await commentsService.saveComment(payload) as any;
        expect(result.likesSkateboards).not.toBeDefined();
    });
});

describe('updateComment', () => {

    /* Testing behavior of updateComment */
    /*
        1. When a valid patch with an id property is provied, patch succeeds
            returning a truthy object.
        2. When a patch with no id property is provided, an error should be thrown.
    */

    test('successful patch', async () => {
        expect.assertions(1);

        mockCommentsDao.updateComment
            .mockImplementation(() => ({}));

        const payload = {
            commentId: 3,
            userId: 12,
            foodId: 19,
            commentContent: 'Yummers...'
        };

        const result = await commentsService.updateComment(payload);
        expect(result).toBeTruthy();
    });

    test('patch fails when no valid commentId is provided', async () => {
        expect.assertions(1);

        mockCommentsDao.updateComment
            .mockImplementation(() => ({}));

        const payload = {
            userId: 12,
            foodId: 19, 
            commentContent: 'Yummers...'
        };

        try {
            await commentsService.updateComment(payload);
            fail();
        } catch(err) {
            expect(err).toBeTruthy();
        }
    });
});

