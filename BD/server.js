const port = 3000;
const express = require('express');

const app = express();
const connectL = require('./connect');
app.listen(port, function (err) {
    console.log("ok");
});
app.get('/ola', function (err) {
    connectL.con.query('SELECT * from Ta1iRWkzWF.teste', function (err, rows, fields) {
        if(!err){
            console.log("nome:"+rows[0].nome);
            console.log("idade:"+rows[2].idade);
            console.log("nome:" +rows[1].nome);
        }
        else{console.log(err)}
    
    })
});