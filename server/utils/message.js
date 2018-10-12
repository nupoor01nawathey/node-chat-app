const moment = require('moment');

let generateMessage  = (from, text) => {
    return {
        from: from,
        text: text,
        createdAt: moment().valueOf()
    }
}

let generateLocationMsg = (from, latitude, longitude) => {
    return {
        from, 
        url: `https://google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment().valueOf()

    }
}

module.exports = {generateMessage, generateLocationMsg};