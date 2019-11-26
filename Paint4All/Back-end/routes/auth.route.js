//Authentication routes
const authController = require('../controllers/auth.controller.js');
module.exports = function(app, passport) {
    app.get('/signup', authController.signup); //registration route
    app.get('/signin', authController.signin); //login route
    app.get('/signupSuccess', authController.signupSuccess);
    app.get('/signinSuccess', isLoggedIn, authController.signinSuccess);

    //Request form submission
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/signupSuccess',
        failureRedirect: '/signup'
    }));
    app.get('/logout', authController.logout);
    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/signinSuccess',
        failureRedirect: '/signin'
    }));

    //Verify if a user is logged in
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    }
};
