var socket = io();   

// client connection
socket.on('connect', function () {
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
    li.innerHTML = message.text
    ol.appendChild(li);
});

socket.on('createLocationMsg', function(message) {
    console.log('new message from client', message);
    const ol = document.getElementById('messages');
    const li = document.createElement('li');
    const a  = document.createElement('a');
    a.setAttribute('target', '_blank');
    a.setAttribute('href', message.url);
    a.innerHTML = 'My current location'; 
    li.appendChild(a);
    ol.appendChild(li);
});

const button = document.querySelector('button');
const textBx = document.getElementsByName('message')[0];
button.addEventListener('click', function(e) {
    socket.emit('createMessage', {
        from: 'User11',
        text: textBx.value,
    }, function() {
        textBx.value = '';
    });
});


const shareLocation = document.querySelector('#share-location');
shareLocation.addEventListener('click', function(e) {
    if(!navigator.geolocation) {
        return alert('Your browser does not support geolocation API');
    }
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position);
        socket.emit('createLocationMsg', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        alert('Unable to fetch location');
    });
});