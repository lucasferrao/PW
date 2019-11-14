const app = require('../server');
const controllerUser = require('./user.controller');
app.get('/users/', controllerUser.read);
app.get('/users/:id', controllerUser.readID);
app.post('/users/', controllerUser.save);
app.put('/users/:id', controllerUser.update);
app.delete('/users/:id', controllerUser.deleteID);