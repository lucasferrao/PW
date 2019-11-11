//Connect database
const connect = require('../config/connectMySQL');
//Include JSON folder
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");