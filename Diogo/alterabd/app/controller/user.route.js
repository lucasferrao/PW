const app = require('../server');
const controllerUser = require('./user.controller');
app.get('/login_type/', controllerUser.read);
app.get('/login_type/:id_login_type', controllerUser.readID);
app.post('/login_type/', controllerUser.save);
app.put('/login_type/:id_login_type', controllerUser.update);
app.delete('/users/:id', controllerUser.deleteID);