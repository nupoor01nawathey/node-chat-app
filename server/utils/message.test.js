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


describe('generateLocationMsg', () => {
    it('it shoule generate correct location url', () => {
        const from      = 'Admin',
              latitude  = 12,
              longitude = 12,
              url       = `https://google.com/maps?q=${latitude},${longitude}` ;
        message = generateLocationMsg(from, latitude, longitude);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from: from, url: url, createdAt: new Date().getTime()});
    });
});