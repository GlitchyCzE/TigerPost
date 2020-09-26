const mysql = require('mysql');
const CONFIG = require('../../config');

const conn = mysql.createConnection({
    host: CONFIG.database.host,
    user: CONFIG.database.username,
    password: CONFIG.database.password
});

conn.connect((err) => {
   if (err) throw err;
   console.log("Connected!");
});

function query(statement) {
    return new Promise(resolve => {
        conn.query(statement, (err, result) => {
           if (err) throw err;
           resolve(result);
        });
    });
}


module.exports = query;