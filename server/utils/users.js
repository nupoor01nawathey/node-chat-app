class Users {
    constructor () {
        this.users = [];
    }

    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        var user = this.getUser(id);
        console.log(`going to get userUser : ${user}`)

        if(user) {
           this.users = this.users.filter(user => user.id !== id);
        }
        console.log(`user to be removed sending from client : ${user}`)
        return user;
    }

    getUser(id) {
        
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList(room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArr = users.map((user) => user.name );
        console.log('get all users list from client:', namesArr);
        return namesArr;
    }
}

module.exports = {Users};