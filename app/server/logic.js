const query = require('./database');
const bcrypt = require('./bcrypt-hash');

module.exports = {
    verifyUser: function(username, password) {
        return new Promise(async (resolve) => {
            let result = await query(`SELECT * FROM users WHERE username == '${username}';`);
            if (result.length === 0) {
                resolve(false);
            }
            let row = result[0];
            resolve(bcrypt.compare(password, row["hash"]));
        });
    }
}
