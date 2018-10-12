isRealString = (str) => {
    return typeof str === 'string' && str.trim().length > 0 ;
};
module.exports = {isRealString};
//trim removes leading and trailing spaces