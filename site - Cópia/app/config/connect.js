const mysql = require('mysql');
module.exports = {
    con:mysql.createConnection({
        host:'webitcloud.net',
        user:'webitclo_node',
        password:'tSV#Am0%R7LD',
        database:'webitclo_node'
    })
};