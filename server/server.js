const path      = require('path'),
      http      = require('http'),
      express   = require('express'),
      socketIO  = require('socket.io');

const app       = express();

const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

const server = http.createServer(app);
const io     = socketIO(server);


io.on('connection', (socket) => {
    console.log('new user connected');

    // setup newEmail event on sever side
    socket.emit('newEmail', {
        'from': 'nupoor01nawathey@gmail.com',
        text: 'Hey, what\'s going on ?',
        createdAt: 123
    });

    // listen to newEmail event setup in CLIENT
    socket.on('createEmail', (newEmail) => {
        console.log('inside createEmail', newEmail);
    });

    // disconnect server
    socket.on('disconnect', (socket) => {
        console.log('disconnected from user');
    });    
});


const PORT = process.env.PORT || 3000 ;
server.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});