/*
const app = require('./server');
const router = require('./routes/main.route');
const cookieParser = require('cookie-parser'); 
const passport = require('passport');
const session = require('express-session');
const expressSanitizer = require('express-sanitizer');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const models = require('./models/');

//Create a session
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(session({
    secret: 'Paint4All',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        maxAge: 6000,
        httpOnly: true,
    }
}))
app.use(expressValidator());

//Verify if a session exists and define if not
app.use(function(req, res, next) {
    if (global.sessData === undefined) {
        global.sessData = req.session;
        global.sessData.ID = req.sessionID;
    }
    else {
        console.log('session exists', global.sessData.ID);
    }
    next();
});

//Login permissions
app.use(passport.initialize());
app.use(passport.session()); //persisten login sessions
require('./routes/auth.route.js') (app, passport);
require('./config/passport/passport.js') (passport, models.user);


//Synchronize server modules
models.sequelize.sync().then(function() {
    console.log('A base de dados está funcional!')
}) .catch(function(err){
    console.log(err, "Ocorreu um erro ao atualizar a base de dados!")
});


//Force router utilization & export application
app.use('/', router);
module.exports = app;
*/