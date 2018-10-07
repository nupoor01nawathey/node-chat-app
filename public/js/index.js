var socket = io();   

// client connection

socket.on('connection', function () {
    console.log('connected to user client');
});  

// emit client email data
socket.emit('createEmail', {
    to: 'abc@gmail.com',
    text: 'To mail send'
});

// disconnect client
socket.on('disconnect', function () {
    console.log('disconnected from user client');
});

// listen to newEmail event setup in SERVER
socket.on('newEmail', function(email) {
    console.log('New email from client', email);
});
