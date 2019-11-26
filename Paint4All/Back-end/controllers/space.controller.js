const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");
const connect = require('../config/connectMySQL');

//Create & execute a read query from database (GET)
function read(req, res) {
    const query = connect.con.query('SELECT id_space, space_name, space_description, entry_date, final_date, address, price, max_capacity, picture, balneary FROM manager order by id_space desc', function(err, rows, fields) {
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
    const id_sponsor = req.sanitize('id').escape();
    const post = { 
        id_sponsor: id_sponsor 
    };
    const query = connect.con.query('SELECT id_space, space_name, space_description, entry_date, final_date, address, price, max_capacity, picture, balneary FROM sponsor WHERE id_sponsor = ' + id_sponsor + ' order by sponsor desc ', post, function(err, rows, fields) { 
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

//Register of a new space (POST)
function save(req, res) {
    const space_name = req.sanitize('space_name').escape();
    const space_description = req.sanitize('space_description').escape();
    const maxCapacity = req.sanitize('maxCapacity').escape();
    const address = req.sanitize('address').escape();
    const balneary = req.sanitize('balneary').escape();
    const pictures = req.sanitize('pictures').escape();
    req.checkBody("space_name", "Please insert text.").matches(/^[a-z]+$/i);
    req.checkBody("description", "Please insert text.").isAlphaNumeric();
    req.checkBody("maxCapacity", "Enter numbers only.").matches(/^[0-9]+$/i);
    req.checkBody("address", "Please insert text.").isAlphaNumeric();
    req.checkBody("balneary", "Please select one option.").matches(/^[0-1]+$/i);
    req.checkBody("pictures", "Please insert a valid url.").optional({ checkFalsy: true }).isURL();
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (space_name != "NULL" && space_description != "NULL" && maxCapacity != "NULL" && address != "NULL" && balneary != "NULL" 
        && pictures != "NULL") {
            const post = { 
                space_name: space_name, space_description: space_description, maxCapacity: maxCapacity, address: address, balneary: balneary, pictures: pictures 
            };
            //Create & Execute a query on database to insert present data from post
            const query = connect.con.query('INSERT INTO space SET ?', post, function(err, rows, fields) {
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

//Create & execute an update query on database (PUT)
function update(req, res) {
    const space_name = req.sanitize('space_name').escape();
    const space_description = req.sanitize('space_description').escape();
    const maxCapacity = req.sanitize('maxCapacity').escape();
    const address = req.sanitize('address').escape();
    const balneary = req.sanitize('balneary').escape();
    const pictures = req.sanitize('pictures').escape();
    const id_space = req.sanitize('id').escape();
    //Validations
    req.checkBody("space_name", "Insira texto.").matches(/^[a-z]+$/i);
    req.checkBody("space_description", "Insira texto.").isAlphaNumeric();
    req.checkBody("maxCapacity", "Insira apenas números.").matches(/^[0-9]+$/i);
    req.checkBody("address", "Insira texto.").isAlphaNumeric();
    req.checkBody("balneary", "Escolha apenas uma opção.").matches(/^[0-1]+$/i);
    req.checkBody("pictures", "Insira um url válido.").optional({ checkFalsy: true }).isURL();
    req.checkParams("id_space", "Insira um ID de espaço válido.").isNumeric();
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (space_name != "NULL" && space_description != "NULL" && maxCapacity != "NULL" && address != "NULL" && typeof(balneary) != 'undefined' && pictures != 'NULL' && id_space != 'NULL') {
            const update = [space_name, space_description, maxCapacity, address, balneary, pictures, id_space];
            const query = connect.con.query('UPDATE space SET space_name = ?, space_description = ?, maxCapacity = ?, address = ?, balneary = ?, pictures = ?, id_space = ? WHERE id_space = ?', update, function(err, rows, fields) {
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
    const query = connect.con.query('UPDATE space SET is_active = ? WHERE id_space = ?', update, function(err, rows, fields) { //TODO: Add "is_active" attribute to space!
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
    const query = connect.con.query('DELETE FROM space WHERE id_space = ?', update, function(err, rows, fields) {
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