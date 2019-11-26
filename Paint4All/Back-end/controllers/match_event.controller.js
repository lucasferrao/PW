const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");
const connect = require('../config/connectMySQL');

//Create & execute a read query from a database (GET)
function read(req, res) {
    const query = connect.con.query('SELECT id_match_event, date, hour, status FROM match_event order by date desc', function(err, rows, fields) {
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
    const id_match_event = req.sanitize('id').escape();
    const post = { id_match_event: id_match_event };
    const query = connect.con.query('SELECT id_match_event, date, hour, status FROM match_event where id_match_event = ? order by date desc', post, function(err, rows, fields) {
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

//Register of a new match_event (POST)
function save(req, res) {
    const date = req.sanitize('date').escape();
    const hour = req.sanitize('hour').escape();
    const status = req.sanitize('status').escape();
    //Validations
    req.checkBody("date", "Insira uma data.").isDate();
    req.checkBody("hour", "Insira uma hora.").isTime();
    req.checkBody("status", "Indique o estado.").isAlphanumeric();
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (date != "NULL" && hour != "NULL" && status != "NULL") {
            const post = { date: date, hour: hour, status: status };
            //Create & execute a query on database to insert present data from post
            const query = connect.con.query('INSERT INTO match_event SET ?', post, function(err, rows, fields) {
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
    const id_match_event = req.sanitize('id_match_event').escape();
    const date = req.sanitize('date').escape();
    const hour = req.sanitize('hour').escape();
    const status = req.sanitize('status').escape();
    //Validations
    req.checkBody("date", "Insira uma data.").isDate();
    req.checkBody("hour", "Insira uma hora.").isTime();
    req.checkBody("status", "Indique o estado.").isAlphanumeric();
    req.checkParams("id_match_event", "Insira o id de match_event válido.").isNumeric();
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (id_match_event != "NULL" && date != "NULL" && hour != "NULL" && status != "NULL") {
            const update = [id_match_event, date, hour, status];
            //Create & execute a query on database to insert present data from post
            const query = connect.con.query('UPDATE id_match_event SET date =?, hour =?, status =? WHERE id_match_event=?', update, function(err, rows, fields) {
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
    const query = connect.con.query('DELETE FROM match_event WHERE id_match_event=?', update, function(err, rows, fields) {
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
