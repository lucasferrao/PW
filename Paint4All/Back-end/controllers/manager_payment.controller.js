const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");
const connect = require('../config/connectMySQL');

//Create & execute a read query from database (GET)
function read(req, res) {
    const query = connect.con.query('SELECT id_payment, ammount, payment_date FROM manager_payment order by id_payment desc', function(err, rows, fields) {
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

//Create & execute a read query by ID from database (GET)
function readByID(req, res) {
    const id_payment = req.sanitize('id').escape();
    const post = { id_payment: id_payment };
    const query = connect.con.query('SELECT id_payment, ammount, payment_date FROM manager_payment WHERE id_payment = ?', post, function(err, rows, fields) { 
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

//Register of a new manager payment (POST)
function save(req, res) {
    const ammount = req.sanitize('ammount').escape();
    //Validations
    req.checkBody("ammount", "Insira apenas números.").matches(/^[0-9]+$/i);
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (ammount != "NULL") {
            const post = { 
                ammount: ammount
            };
            //Create & Execute a query on database to insert present data from post
            const query = connect.con.query('INSERT INTO manager_payment SET ?', post, function(err, rows, fields) {
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

module.exports = {
    read: read,
    readByID: readByID,
    save: save,
};