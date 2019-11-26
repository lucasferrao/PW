const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");
const connect = require('../config/connectMySQL');

//Create & execute a read query from a database (GET)
function read(req, res) {
    const query = connect.con.query('SELECT id_activity, activity_description FROM activity order by id_activity desc', function(err, rows, fields) {
        console.log(query.sql);
        if (err) {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
        else {
            if (rows.length == 0) {
                res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
            }
            else {
                res.send(rows);
            }
        }
    });
}

//Create & execute a read query by ID from a database (GET)
function readByID(req, res) {
    const id_activity = req.sanitize('id').escape();
    const post = { id_activity: id_activity };
    const query = connect.con.query('SELECT id_activity, activity_description FROM activity where id_activity = ? order by id_activity desc', post, function(err, rows, fields) {
        console.log(query.sql);
        if (err) {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
        else {
            if (rows.length == 0) {
                res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
            }
            else {
                res.send(rows);
            }
        }
    });
}

//Register of a new activity (POST)
function save(req, res) {
    const activity_description = req.sanitize('activity_description').escape();
    //Validations
    req.checkBody("activity_description", "Insira texto.").isAlphanumeric();
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (activity_description != "NULL") {
            const post = { activity_description: activity_description};
            //Create & execute a query on database to insert present data from post
            const query = connect.con.query('INSERT INTO activity SET ?', post, function(err, rows, fields) {
                console.log(query.sql);
                if (!err) {
                    res.status(jsonMessages.db.successInsert.status).location(rows.insertId).send(jsonMessages.db.successInsert);
                }
                else {
                    console.log(err);
                    res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                }
            });
        }
        else
            res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);
    }
}

//Create & execute an update query on a database (PUT)
function update(req, res) {
    const id_activity = req.sanitize('id').escape();
    const activity_description = req.sanitize('ativity_description').escape();
    //Validations
    req.checkParams("id", "Insira o id de Sponsor válido.").isNumeric();
    req.checkBody("activity_description", "Insira texto.").isAlphanumeric();
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (id_activity != "NULL" && activity_description != "NULL") {
            const update = [id_activity, activity_description];
            //Create & execute a query on database to insert present data from post
            const query = connect.con.query('UPDATE activity SET activity_description =?,  WHERE id_activity=?', update, function(err, rows, fields) {
                console.log(query.sql);
                if (!err) {
                    res.status(jsonMessages.db.successUpdate.status).send(jsonMessages.db.successUpdate);
                }
                else {
                    console.log(err);
                    res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                }
            });
        }
        else
            res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);
    }
}


//Create & execute a physical delete query on database (DELETE)
function deleteP(req, res) {
    const update = req.sanitize('id').escape();
    const query = connect.con.query('DELETE FROM activity WHERE id_activity=?', update, function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            res.status(jsonMessages.db.successDeleteU.status).send(jsonMessages.db.successDeleteU);
        }
        else {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
    });
}

module.exports = {
    read: read,
    readByID: readByID,
    save: save,
    update: update,
    deleteP: deleteP,
}
