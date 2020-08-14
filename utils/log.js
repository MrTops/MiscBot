/*
*   has logging functions which output something to the console with a timestamp
*
*   log(message)
*       outputs the message formatted as [timestamp] message
*/

const moment = require('moment');

exports.log = (message) => {console.log(`[${moment()}] ${message}`);};