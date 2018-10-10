const expect = require('expect');
const {generateMessage} = require('./message');

describe('generatemessage', () => {
    it('it should generate correct message done', () => {
        const from = 'Jen' ,
              text = 'Some sample message';
        message = generateMessage(from, text);
   
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});

    });
});