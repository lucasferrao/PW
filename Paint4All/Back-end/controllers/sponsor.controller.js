const jsonMessagesPath = "../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");
const connect = require('../config/connectMySQL');

//Create & execute a read query from a database (GET)
function read(req, res) {    
    const query = connect.con.query('SELECT id_sponsor, address, mobile_number, nif, is_active FROM sponsor order by id_sponsor desc', function(err, rows, fields) {
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
    const id_sponsor = req.sanitize('id').escape();
    const post = { id_sponsor: id_sponsor };
    const query = connect.con.query('SELECT id_sponsor, address, mobile_number, nif, is_active FROM sponsor where id_sponsor = ? order by id_sponsor desc', post, function(err, rows, fields) {
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

//Register of a new sponsor (POST)
function save(req, res) {
    const address = req.sanitize('address').escape();
    const mobile_number = req.sanitize('mobile_number').escape();
    const nif = req.sanitize('nif').escape();
    const is_active = req.sanitize('is_active').escape();
    //Validations
    req.checkBody("address", "Insira texto.").isAlphanumeric();
    req.checkBody("mobile_number", "Insira apenas números.").matches(/^[0-9]+$/i);
    req.checkBody("nif", "Insira apenas números.").matches(/^[0-9]+$/i);
    req.checkBody("is_active", "Insira apenas números.").matches(/^[0-1]+$/i);
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (address != "NULL" && mobile_number != "NULL" && nif != "NULL" && is_active != "NULL") {
            const post = { address: address, mobile_number: mobile_number, nif: nif, is_active: is_active };
            //Create & execute a query on database to insert present data from post
            const query = connect.con.query('INSERT INTO sponsor SET ?', post, function(err, rows, fields) {
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
    const address = req.sanitize('address').escape();
    const mobile_number = req.sanitize('mobile_number').escape();
    const nif = req.sanitize('nif').escape();
    const is_active = req.sanitize('is_active').escape();
    const id_sponsor = req.sanitize('id').escape();
    //Validations
    req.checkBody("address", "Insira texto.").isAlphanumeric();
    req.checkBody("mobile_number", "Insira apenas números.").matches(/^[0-9]+$/i);
    req.checkBody("nif", "Insira apenas números.").matches(/^[0-9]+$/i);
    req.checkBody("is_active", "Insira apenas números.").matches(/^[0-1]+$/i);
    req.checkParams("id", "Insira o id de Sponsor válido.").isNumeric();
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (id_sponsor != "NULL" && address != "NULL" && mobile_number != "NULL" && nif != "NULL" && is_active != "NULL") {
            const update = [address, mobile_number, nif, is_active, id_sponsor];
            const query = connect.con.query('UPDATE sponsor SET address =?,  mobile_number =?, nif =?, is_active =? WHERE id_sponsor=?', update, function(err, rows, fields) {
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

//Create & execute a logical delete query on database (PUT)
function deleteL(req, res) {
    const update = [0, req.sanitize('id').escape()];
    const query = connect.con.query('UPDATE sponsor SET is_active = ? WHERE id_sponsor=?', update, function(err, rows, fields) {
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
//Create & execute a physical delete query on database (DELETE)
function deleteP(req, res) {
    const update = req.sanitize('id').escape();
    const query = connect.con.query('DELETE FROM sponsor WHERE id_sponsor=?', update, function(err, rows, fields) {
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
}

