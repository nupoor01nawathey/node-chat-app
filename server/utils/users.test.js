const expect = require('expect'),
      {Users} = require('./users');


describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: 1,
                name: 'John',
                room: 'Jazz'
            },
            {
                id: 2,
                name: 'Andrew',
                room: 'React'
            },
            {
                id: 3,
                name: 'Brad',
                room: 'React'
            },
    ]
    });

    it('should add new user', () => {
        var user = {
            id: '123',
            name: 'Max',
            room: 'Vuejs'
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect([resUser]).toMatchObject([user]);
    });

    it('should return names of React course', () => {
        var userList = users.getUserList('React');
        expect(userList).toMatchObject(['Andrew', 'Brad']);
    });

    it('should return names of Jazz course', () => {
        var userList = users.getUserList('Jazz');
        expect(userList).toMatchObject(['John']);
    });

    it('should find user', () => {
        const userId = 1;
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
        const userId = 11;
        var user = users.getUser(userId);
        expect(user).toBeFalsy(); // as toNotExist() is deprecated with latest expect
    });

    it('should remove user', () => {
        const userId = 1;
        var deletedUser = users.removeUser(userId);
        expect(deletedUser.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        const userId = 99;
        var deletedUser = users.removeUser(userId);
        expect(deletedUser).toBeFalsy();
        expect(users.users.length).toBe(3);
    });


});