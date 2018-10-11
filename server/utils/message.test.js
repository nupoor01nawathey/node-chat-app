const expect = require('expect');
const {generateMessage, generateLocationMsg} = require('./message');

describe('generatemessage', () => {
    it('it should generate correct message', () => {
        const from = 'Jen' ,
              text = 'Some sample message';
        message = generateMessage(from, text);
   
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});

    });
});


