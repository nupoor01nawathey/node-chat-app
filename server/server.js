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
    socket.on('disconnect', (socket) => {
        console.log('disconnected from user');
    });    
});

const PORT = process.env.PORT || 3000 ;
server.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});