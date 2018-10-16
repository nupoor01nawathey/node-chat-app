var socket = io();   

let newMessageHeight = 0; 
function scrollToBottom() {
    // selectors
    const messages   = document.querySelector('#messages');
 
    // heights
    let { clientHeight, scrollTop, scrollHeight } = messages;
    const prevMessageHeigth = newMessageHeight;
    newMessageHeight = parseInt(window.getComputedStyle(messages.lastElementChild).getPropertyValue('height'));
    
    if(clientHeight + scrollTop + newMessageHeight + prevMessageHeigth >=  scrollHeight) {
        messages.scrollTo(0, scrollHeight);
    }
}

// client connection
socket.on('connect', function () {
    console.log('connected to user client');
    const params = deparams(window.location.search);
    socket.emit('join', params, function(err) {
        if(err) {
            alert(err);
            window.location.href = '/' ;
        } else {
            console.log('No error');
        }
    });
});  

// disconnect client
socket.on('disconnect', function () {
    console.log('disconnected from user client');
});


socket.on('updateUserList', function(users) {
    console.log('users list', users);
    let userList = document.createElement('ol');
    users.forEach(function(userName) {
        let li = document.createElement('li');
        let name = document.createTextNode(userName);
        li.appendChild(name);
        userList.appendChild(li);
    });
    document.querySelector('#users').innerHTML = '';
    document.querySelector('#users').appendChild(userList);
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
    //shareLocation.setAttribute('disabled', 'disabled');
    navigator.geolocation.getCurrentPosition(function(position) {
        shareLocation.removeAttribute('disabled');
        socket.emit('createLocationMsg', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        alert('Unable to fetch location');
        //shareLocation.removeAttribute('disabled');
    });
});


function deparams(queryString) {
    var pairs = queryString.slice(1).split('&');
    var result = {};
    pairs.forEach((pair) => {
        pair = pair.split('=')
        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });
    return result;
}