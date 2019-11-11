//Application routes
//Router require
const router = require('express').Router();
//Evoke all needed controllers
const controllerManager = 
    require('../controllers/manager.controller.js');

//Default route
router.get('/', function(req, res) {
    res.send("New Paint4All");
    res.end();
});