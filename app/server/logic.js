const query = require('./database');

function verifyUser(username, password) {
    return new Promise(async (resolve) => {
        result = await query(`SELECT * FROM users WHERE username == '${username}' AND `)
    });
}