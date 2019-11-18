const app = require('../server');
const controllerUser = require('./user.controller');
app.get('/login_type/', controllerUser.read);
app.get('/login_type/:id_login_type', controllerUser.readID);
app.post('/users/', controllerUser.save);
app.put('/users/:id', controllerUser.update);
app.delete('/users/:id', controllerUser.deleteID);