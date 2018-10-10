var socket = io();   

// client connection
socket.on('connection', function () {
    console.log('connected to user client');
});  

// disconnect client
socket.on('disconnect', function () {
    console.log('disconnected from user client');
});



// listen to newMessage event on sever side
socket.on('newMessage', function(message) {
    console.log('new message from client', message);
    const li = document.createElement('li');
    const ol = document.getElementById('messages');
    li.innerHTML = message.text;
    ol.appendChild(li);
});

const button = document.querySelector('button');

button.addEventListener('click', function(e) {
    var textStr  = document.querySelector('input').value;
    socket.emit('createMessage', {
        from: 'User11',
        //text: textStr,
        text: document.getElementsByName('message')[0].value,
    }, function() {});
});