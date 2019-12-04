const saltRounds = 10;
const connect = require('../config/connect');
var bcrypt = require('bcrypt');

//função de leitura que retorna o resultado no callback
function read(req, res) {
    //criar e executar a query de leitura na BD
    connect.con.query('SELECT name, email, dateReg from users order by dateReg desc', function (err,
        rows, fields) {
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, casocontrário envia os resultados (rows).
            if (rows.length == 0) {
                res.status(404).send("Data not found");
            } else {
                res.status(200).send(rows);
            }
        } else
            console.log('Error while performing Query.', err);
    });
}
//função de leitura que retorna o resultado de um iduser
function readID(req, res) {
    //criar e executar a query de leitura na BD
    const iduser = req.sanitize('id').escape();
    const post = {
        idUser: iduser
    };
    connect.con.query('SELECT name, email, dateReg from users where iduser = ? order by dateReg desc', post,
        function (err, rows, fields) {
            if (!err) {
                //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrárioenvia os resultados (rows).
                if (rows.length == 0) {
                    res.status(404).send({
                        "msg": "data not found"
                    });
                } else {
                    res.status(200).send(rows);
                }
            } else
                res.status(400).send({
                    "msg": err.code
                });
            console.log('Error while performing Query.', err);
        });
}
function save(req, res) {
    //receber os dados do formuário que são enviados por post
    const name = req.sanitize('name').escape();
    const email = req.sanitize('email').escape();
    const password = req.sanitize('pass').escape();
    const district = req.sanitize('district').escape();
    const birth = req.sanitize('birth').escape();
    const gender = req.sanitize('gender').escape();
    
    console.log("without hahsh:" + password);
    var query = "";
    bcrypt.hash(password, saltRounds).then(function (hash) {
        var post = {
            email: email,
            user_profile_name: name,
            district: district,
            birthdate:birth,
            genre:gender
        };
        var login ={
            email:email,
            keyword: hash
        }
        console.log("with hash:" + hash);
        query = connect.con.query('INSERT INTO user_profile SET ?',post, function(err, rows, fields){
            console.log(query.sql);
            if(!err){
                query = connect.con.query('INSERT INTO login SET ?', login, function(err, rows,fields){
                    console.log(query.sql);
                    if(!err){
                        res.status(200).location(rows.insertID).send({
                            "msg":"inserted with success"
                        });
                        console.log("Number of records inserted" + rows.affectedRows);
                     
                    }
                    else{
                        if (err.code == "ER_DUP_ENTRY"){
                            res.status(409).send({"msg": err.code});
                            console.log('Error while performing Query.', err);
 
                        }else res.status(400).send({"msg":err.code});
                    }
                })
            }
        })
     });
 }
//efetuar updade de todos os dados para um determinado iduser
function update(req, res) {
    //receber os dados do formuário que são enviados por post
    const name = req.sanitize('name').escape();
    const email = req.sanitize('email').escape();
    const password = req.sanitize('pass').escape();
    const iduser = req.sanitize('id').escape();
    console.log("without hahsh:" + req.body.pass);
    var query = "";
    bcrypt.hash(password, saltRounds).then(function (hash) {
        console.log("with hash:" + hash);
        var update = {
            name,
            email,
            hash,
            iduser
        };
        query = connect.con.query('INSERT INTO users SET name = ?, email =?, password=? where iduser=?', update, function (err, rows,
            fields) {
            console.log(query.sql);
            if (!err) {
                console.log("Number of records updated: " + rows.affectedRows);
                res.status(200).send({ "msg": "update with success" });
            } else {
                res.status(400).send({ "msg": err.code });
                console.log('Error while performing Query.', err);
            }
        });
    });
}
//função que apaga todos os dados de um iduser
function deleteID(req, res) {
    //criar e executar a query de leitura na BD
    const iduser = req.sanitize('id').escape();
    const post = {
        idUser: iduser
    };
    connect.con.query('DELETE from users where iduser = ?', post, function (err, rows, fields) {
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados (rows).
            if (rows.length == 0) {
                res.status(404).send({
                    "msg": "data not found"
                });
            } else {
                res.status(200).send({
                    "msg": "success"
                });
            }
        } else
            console.log('Error while performing Query.', err);
    });
}

module.exports = {
    read: read,
    readID: readID,
    save: save,
    update: update,
    deleteID: deleteID
};