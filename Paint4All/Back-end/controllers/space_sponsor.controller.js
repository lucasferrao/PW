const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");
const connect = require('../config/connectMySQL');

//Create & execute a read query from a database (GET)
function read(req, res) {
    const query = connect.con.query('SELECT id_space, id_sponsor, is_exclusive, space_sponsor_date, price FROM space_sponsor order by space_sponsor_date desc', function(err, rows, fields) {
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


//Register of a new space_sponsor (POST)
function save(req, res) {
    const is_exclusive = req.sanitize('is_exclusive').escape();
    const space_sponsor_date = req.sanitize('space_sponsor_date').escape();
    const price = req.sanitize('price').escape();
    //Validations
    req.checkBody("is_exclusive", "Insira texto.").matches(/^[0-1]+$/i);
    req.checkBody("space_sponsor_date", "Insira uma data.").isDate();
    req.checkBody("price", "Insira apenas números.").matches(/^[0-9]+$/i);
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (is_exclusive != "NULL" && space_sponsor_date != "NULL" && price != "NULL") {
            const post = { is_exclusive: is_exclusive, space_sponsor_date: space_sponsor_date, price: price };
            //Create & execute a query on database to insert present data from post
            const query = connect.con.query('INSERT INTO space_sponsor SET ?', post, function(err, rows, fields) {
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
    const is_exclusive = req.sanitize('is_exclusive').escape();
    const space_sponsor_date = req.sanitize('space_sponsor_date').escape();
    const price = req.sanitize('price').escape();
    //Validations
    req.checkBody("is_exclusive", "Insira texto.").matches(/^[0-1]+$/i);
    req.checkBody("space_sponsor_date", "Insira uma data.").isDate();
    req.checkBody("price", "Insira apenas números.").matches(/^[0-9]+$/i);
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (is_exclusive != "NULL" && space_sponsor_date != "NULL" && price != "NULL") {
            const update = [id_space, id_sponsor, is_exclusive, space_sponsor_date, price];
            //Create & execute a query on database to insert present data from post
            const query = connect.con.query('UPDATE space_sponsor SET is_exclusive =?, space_sponsor_date =?, price =? WHERE id_sponsor =? OR id_space =?', update, function(err, rows, fields) {
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
    const query = connect.con.query('DELETE FROM space_sponsor WHERE id_sponsor =? AND id_space =?', update, function(err, rows, fields) {
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
    save: save,
    update: update,
    deleteP: deleteP,
}

