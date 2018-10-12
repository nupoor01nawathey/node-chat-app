const expect = require('expect'),
      {Users} = require('./users');


describe('Users', () => {
    it('should add new user', () => {
        var user = {
            id: '123',
            name: 'Max',
            room: 'Vuejs'
        };
        var userC = new Users();       
        var resUser = userC.addUser(user.id, user.name, user.room);
        expect([resUser]).toMatchObject([user]);
    });
});