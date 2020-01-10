const app = require('../server');
const controllerUser = require('./user.controller');
app.get('/user_profile/', controllerUser.read);
app.get('/users/:id', controllerUser.readID);
app.post('/user_profile/', controllerUser.save);
app.put('/users/:id', controllerUser.update);
app.delete('/users/:id', controllerUser.deleteID);