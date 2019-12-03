//Application routes
console.log("olá");
//app require
const app = require('../server');
//Evoke all needed controllers
const controllerManager = 
    require('../controllers/manager.controller.js');
const controllerActivity = 
    require('../controllers/activity.controller.js');
const controllerManagerPayment = 
    require('../controllers/manager_payment.controller.js');
const controllerMatchEvent = 
    require('../controllers/match_event.controller.js');
const controllerSpaceActivity = 
    require('../controllers/space_activity.controller.js');
const controllerSpaceManager = 
    require('../controllers/space_manager.controller.js');
const controllerSpaceSponsor = 
    require('../controllers/space_sponsor.controller.js');
const controllerSpace = 
    require('../controllers/space.controller.js');
const controllerSponsor = 
    require('../controllers/sponsor.controller.js');

//Default route
app.get('/', function(req, res) {
    res.send("Paint4All");
    res.end();
});

//Manager routes
 //Manager
app.get('/managers/', controllerManager.read);
app.get('/managers/:id', controllerManager.readByID);
app.post('/managers/', isLoggedIn, controllerManager.save);
app.put('/managers/:id', isLoggedIn, isLoggedIn, controllerManager.update);
app.put('/managers/del/:id', isLoggedIn, controllerManager.deleteL);
app.delete('/managers/:id', isLoggedIn, controllerManager.deleteP);
 //Activity
app.get('/activities/', controllerActivity.read);
app.get('/activities/:id', controllerActivity.readByID);
app.post('/activities/', controllerActivity.save);
app.put('/activities/:id', controllerActivity.update);
app.delete('/activities/:id', controllerActivity.deleteP);
 //Manager Payment
app.get('/managerPayments/', controllerManagerPayment.read);
app.get('/managerPayments/:id', controllerManagerPayment.readByID);
app.post('/managerPayments/', controllerManagerPayment.save);
 //Match Event
app.get('/matchEvents/', controllerMatchEvent.read);
app.get('/matchEvents/:id', controllerMatchEvent.readByID);
app.post('/matchEvents/', controllerMatchEvent.save);
app.put('/matchEvents/:id', controllerMatchEvent.update);
app.delete('/matchEvents/:id', controllerMatchEvent.deleteP);
 //Space Activity
app.get('/spaceActivities/', controllerSpaceActivity.read);
app.get('/spaceActivities/:id', controllerSpaceActivity.readByID);
app.post('/spaceActivities/', controllerSpaceActivity.save);
app.put('/spaceActivities/:id', controllerSpaceActivity.update);
app.put('/spaceActivities/del/:id', controllerSpaceActivity.deleteL);
app.delete('/spaceActivities/:id', controllerSpaceActivity.deleteP);
 //Space Manager
app.get('/spaceManagers/', controllerSpaceManager.read);
app.get('/spaceManagers/:id', controllerSpaceManager.readByID);
app.put('/spaceManagers/del/:id', controllerSpaceManager.deleteP);
 //Space Sponsor
app.get('/spaceSponsors/', controllerSpaceSponsor.read);
app.post('/spaceSponsors/', controllerSpaceSponsor.save);
app.put('/spaceSponsors/:id', controllerSpaceSponsor.update);
app.delete('/spaceSponsors/:id', controllerSpaceSponsor.deleteP);
 //Space 
app.get('/spaces/', controllerSpace.read);
app.get('/spaces/:id', controllerSpace.readByID);
app.post('/spaces/', controllerSpace.save);
app.put('/spaces/:id', controllerSpace.update);
app.put('/spaces/del/:id', controllerSpace.deleteL);
app.delete('/spaces/:id', controllerSpace.deleteP);
 //Sponsor
app.get('/sponsors/', controllerSponsor.read);
app.get('/sponsors/:id', controllerSponsor.readByID);
app.post('/sponsors/', controllerSponsor.save);
app.put('/sponsors/:id', controllerSponsor.update);
app.put('/sponsors/del/:id', controllerSponsor.deleteL);
app.delete('/sponsors/:id', controllerSponsor.deleteP);

module.exports = app;

//Verify if a user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    else {
        res.status(jsonMessages.login.unauthorized.status).send(jsonMessages.login.unauthorized);
        return next();
    }
}
