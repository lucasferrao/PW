//Application routes
//Router require
const router = require('express').Router();
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
router.get('/', function(req, res) {
    res.send("New Paint4All");
    res.end();
});

//Manager routes
 //Manager
router.get('/managers/', controllerManager.read);
router.get('/managers/:id', controllerManager.readByID);
router.post('/managers/', isLoggedIn, controllerManager.save);
router.put('/managers/:id', isLoggedIn, isLoggedIn, controllerManager.update);
router.put('/managers/del/:id', isLoggedIn, controllerManager.deleteL);
router.delete('/managers/:id', isLoggedIn, controllerManager.deleteP);
 //Activity
router.get('/activities/', controllerActivity.read);
router.get('/activities/:id', controllerActivity.readByID);
router.post('/activities/', controllerActivity.save);
router.put('/activities/:id', controllerActivity.update);
router.delete('/activities/:id', controllerActivity.deleteP);
 //Manager Payment
router.get('/managerPayments/', controllerManagerPayment.read);
router.get('/managerPayments/:id', controllerManagerPayment.readByID);
router.post('/managerPayments/', controllerManagerPayment.save);
 //Match Event
router.get('/matchEvents/', controllerMatchEvent.read);
router.get('/matchEvents/:id', controllerMatchEvent.readByID);
router.post('/matchEvents/', controllerMatchEvent.save);
router.put('/matchEvents/:id', controllerMatchEvent.update);
router.delete('/matchEvents/:id', controllerMatchEvent.deleteP);
 //Space Activity
router.get('/spaceActivities/', controllerSpaceActivity.read);
router.get('/spaceActivities/:id', controllerSpaceActivity.readByID);
router.post('/spaceActivities/', controllerSpaceActivity.save);
router.put('/spaceActivities/:id', controllerSpaceActivity.update);
router.put('/spaceActivities/del/:id', controllerSpaceActivity.deleteL);
router.delete('/spaceActivities/:id', controllerSpaceActivity.deleteP);
 //Space Manager
router.get('/spaceManagers/', controllerSpaceManager.read);
router.get('/spaceManagers/:id', controllerSpaceManager.readByID);
router.put('/spaceManagers/del/:id', controllerSpaceManager.deleteP);
 //Space Sponsor
router.get('/spaceSponsors/', controllerSpaceSponsor.read);
router.post('/spaceSponsors/', controllerSpaceSponsor.save);
router.put('/spaceSponsors/:id', controllerSpaceSponsor.update);
router.delete('/spaceSponsors/:id', controllerSpaceSponsor.deleteP);
 //Space 
router.get('/spaces/', controllerSpace.read);
router.get('/spaces/:id', controllerSpace.readByID);
router.post('/spaces/', controllerSpace.save);
router.put('/spaces/:id', controllerSpace.update);
router.put('/spaces/del/:id', controllerSpace.deleteL);
router.delete('/spaces/:id', controllerSpace.deleteP);
 //Sponsor
router.get('/sponsors/', controllerSponsor.read);
router.get('/sponsors/:id', controllerSponsor.readByID);
router.post('/sponsors/', controllerSponsor.save);
router.put('/sponsors/:id', controllerSponsor.update);
router.put('/sponsors/del/:id', controllerSponsor.deleteL);
router.delete('/sponsors/:id', controllerSponsor.deleteP);

module.exports = router;

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
