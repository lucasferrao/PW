const jsonMessagesPath = __dirname + "../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");
const connect = require('../config/connectMySQL');

//Create & execute a read query from database (GET)
function read(req, res) {
    console.log("olá");
    const query = connect.con.query('SELECT id_manager, mobile_number, nif, nib, is_active FROM manager ORDER BY id_manager desc', function(err, rows, fields) {
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
    const id_manager = req.sanitize('id').escape();
    const post = { id_manager: id_manager };
    const query = connect.con.query('SELECT id_manager, mobile_number, nif, nib, is_active FROM manager WHERE id_manager = ?', post, function(err, rows, fields) { 
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

//Register of a new manager (POST)
function save(req, res) {
    const mobile_number = req.sanitize('mobile_number').escape();
    const nif = req.sanitize('nif').escape();
    const nib = req.sanitize('nib').escape();
    var query = "";
    console.log("Estou aqui!");
    //Validations
    req.checkBody("mobile_number", "Insira apenas números.").matches(/^[0-9]+$/i);
    req.checkBody("nif", "Insira apenas números.").matches(/^[0-9]+$/i);
    req.checkBody("nib", "Insira apenas números.").matches(/^[0-9]+$/i);
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (mobile_number != "NULL" && nif != "NULL" && nib != "NULL") {
            var post = { 
                mobile_number: mobile_number, 
                nif: nif, 
                nib: nib
            };
            //Create & Execute a query on database to insert present data from post
            query = connect.con.query('INSERT INTO manager SET ?', post, function(err, rows, fields) {
                console.log(query.sql);
                if (!err) {
                    res.status(jsonMessages.db.successInsert.status).location(rows.insertId).send(jsonMessages.db.successInsert);
                    console.log("Message: 1 record inserted!");
                }
                else {
                    console.log(err);
                    res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                }
            });
        }
        else 
            res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);
    };
}


//Create & execute an update query on database (PUT)
function update(req, res) {
    const mobile_number = req.sanitize('mobile_number').escape();
    const nif = req.sanitize('nif').escape();
    const nib = req.sanitize('nib').escape();
    const is_active = req.sanitize('is_active').escape();
    const id_manager = req.sanitize('id').escape();
    //Validations
    req.checkBody("mobile_number", "Insira apenas números.").matches(/^[0-9]+$/i);
    req.checkBody("nif", "Insira apenas números.").matches(/^[0-9]+$/i);
    req.checkBody("nib", "Insira apenas números.").matches(/^[0-9]+$/i);
    req.checkBody("is_active", "Escolha apenas uma opção.").matches(/^[0-1]+$/i);
    req.checkParams("id_manager", "Insira um ID de manager válido").isNumeric();
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (id_manager != "NULL" && nif != "NULL" && nib != "NULL" && typeof(mobile_number) != 'undefined' && typeof(nif) != 'undefined' && typeof(id_manager) != 'undefined') {
            const update = [mobile_number, nif, nib, is_active, id_manager];
            const query = connect.con.query('UPDATE manager SET mobile_number = ?, nif = ?, nib = ?, is_active = ?, id_manager = ? WHERE id_manager = ?', update, function(err, rows, fields) {
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

//Create & Execute an logical delete query on database (PUT)
function deleteL(req, res) {
    const update = [0, req.sanitize('id').escape()];
    const query = connect.con.query('UPDATE manager SET active = ? WHERE id_manager = ?', update, function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            res.status(jsonMessages.db.successDelete.status).send(jsonMessages.db.successDelete);
        }
        else {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
    });
}

//Create & Execute an physical delete query on database (DELETE)
function deleteP(req, res) {
    const update = req.sanitize('id').escape();
    const query = connect.con.query('DELETE FROM manager WHERE id_manager = ?', update, function(err, rows, fields) {
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
    deleteL: deleteL,
    deleteP: deleteP,
};