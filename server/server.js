const path      = require('path'),
      http      = require('http'),
      express   = require('express'),
      socketIO  = require('socket.io');

const app       = express();

const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

const server = http.createServer(app);
const io     = socketIO(server);

const {generateMessage, generateLocationMsg} = require('./utils/message');
const {isRealString} = require('./utils/validations');
const {Users} = require('./utils/users');

const users = new Users();

io.on('connection', (socket) => { // socket is a single connection
    socket.on('join', (params, cb) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return cb('name and room name are required'); // return for invalid data
        }
        socket.join(params.room);
        console.log('All users list', users);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        //socket.leave(params.room);
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    
        cb();
    });

    // listen to createMessage event setup in CLIENT
    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        // callback('This is from the server');
    });

    socket.on('createLocationMsg', (coords) => {
        io.emit('createLocationMsg', generateLocationMsg('Admin', coords.latitude, coords.longitude));
    });
    
    // disconnect server
    socket.on('disconnect', (socket) => {
        console.log('disconnected from user');
        const user = users.removeUser(socket.id);
        console.log(`going to delete user : ${user}`);
        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
    });    
});


const PORT = process.env.PORT || 3000 ;
server.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});