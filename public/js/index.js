var socket = io();   

let newMessageHeight = 0; 
function scrollToBottom() {
    // selectors
    const messages   = document.querySelector('#messages'),
          //newMessage = messages.lastElementChild;

    // heights
    const { clientHeight } = messages,
          { scrollTop }    = messages,
          { scrollHeight } = messages;

    const prevMessageHeigth = newMessageHeight;
    console.log(`prevMessageHeight : ${prevMessageHeigth}`)
    newMessageHeight = parseInt(window.getComputedStyle(messages.lastElementChild).getPropertyValue('height'));
    
    if(clientHeight + scrollTop + newMessageHeight + prevMessageHeigth >=  scrollHeight) {
        messages.scrollTo(0, scrollHeight);
    }
}

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
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = document.querySelector('#msessage-template').innerHTML;
    const html     = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    const ol = document.getElementById('messages');
    ol.innerHTML += html ;
    scrollToBottom();
});

socket.on('createLocationMsg', function(message) {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template      = document.querySelector('#location-template').innerHTML;
    const html          = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    });
    const ol = document.getElementById('messages');
    ol.innerHTML += html ;
    scrollToBottom();
});

const button = document.querySelector('button');
const textBx = document.getElementsByName('message')[0];
button.addEventListener('click', function(e) {
    socket.emit('createMessage', {
        from: 'User11',
        text: textBx.value
    }, function() {
        textBx.value = '';
    });
});


const shareLocation = document.querySelector('#share-location');
shareLocation.addEventListener('click', function(e) {
    if(!navigator.geolocation) {
        return alert('Your browser does not support geolocation API');
    }

    shareLocation.setAttribute('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition(function(position) {
        shareLocation.removeAttribute('disabled');
        socket.emit('createLocationMsg', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        alert('Unable to fetch location');
        shareLocation.removeAttribute('disabled');
    });
});