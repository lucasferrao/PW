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
router.get('/Managers/', controllerManager.read);
router.get('/Managers/:id', controllerManager.readByID);
router.post('/Managers/', isLoggedIn, controllerManager.save);
router.put('/Managers/:id', isLoggedIn, isLoggedIn, controllerManager.update);
router.put('/Managers/del/:id', isLoggedIn, controllerManager.deleteL);
router.delete('/Managers/:id', isLoggedIn, controllerManager.deleteP);
 //Activity
router.get('/Activities/', controllerActivity.read);
router.get('/Activities/:id', controllerActivity.readByID);
router.post('/Activities/', controllerActivity.save);
router.put('/Activities/:id', controllerActivity.update);
router.delete('/Activities/:id', controllerActivity.deleteP);
 //Manager Payment
router.get('/ManagerPayments/', controllerManagerPayment.read);
router.get('/ManagerPayments/:id', controllerManagerPayment.readByID);
router.post('/ManagerPayments/', controllerManagerPayment.save);
 //Match Event
router.get('/MatchEvents/', controllerMatchEvent.read);
router.get('/MatchEvents/:id', controllerMatchEvent.readByID);
router.post('/MatchEvents/', controllerMatchEvent.save);
router.put('/MatchEvents/:id', controllerMatchEvent.update);
router.delete('/MatchEvents/:id', controllerMatchEvent.deleteP);
 //Space Activity
router.get('/SpaceActivities/', controllerSpaceActivity.read);
router.get('/SpaceActivities/:id', controllerSpaceActivity.readByID);
router.post('/SpaceActivities/', controllerSpaceActivity.save);
router.put('/SpaceActivities/:id', controllerSpaceActivity.update);
router.put('/SpaceActivities/del/:id', controllerSpaceActivity.deleteL);
router.delete('/SpaceActivities/:id', controllerSpaceActivity.deleteP);
 //Space Manager
router.get('/SpaceManagers/', controllerSpaceManager.read);
router.get('/SpaceManagers/:id', controllerSpaceManager.readByID);
router.put('/SpaceManagers/del/:id', controllerSpaceManager.deleteP);
 //Space Sponsor
router.get('/SpaceSponsors/', controllerSpaceSponsor.read);
router.post('/SpaceSponsors/', controllerSpaceSponsor.save);
router.put('/SpaceSponsors/:id', controllerSpaceSponsor.update);
router.delete('/SpaceSponsors/:id', controllerSpaceSponsor.deleteP);
 //Space 
router.get('/Spaces/', controllerSpace.read);
router.get('/Spaces/:id', controllerSpace.readByID);
router.post('/Spaces/', controllerSpace.save);
router.put('/Spaces/:id', controllerSpace.update);
router.put('/Spaces/del/:id', controllerSpace.deleteL);
router.delete('/Spaces/:id', controllerSpace.deleteP);
 //Sponsor
router.get('/Sponsors/', controllerSponsor.read);
router.get('/Sponsors/:id', controllerSponsor.readByID);
router.post('/Sponsors/', controllerSponsor.save);
router.put('/Sponsors/:id', controllerSponsor.update);
router.put('/Sponsors/del/:id', controllerSponsor.deleteL);
router.delete('/Sponsors/:id', controllerSponsor.deleteP);

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
