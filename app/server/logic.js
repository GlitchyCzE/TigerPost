const query = require('./database');
const bcrypt = require('./bcrypt-hash');

module.exports = {
    verifyUser: function(username, password) {
        return new Promise(async (resolve) => {
            let result = await query(`SELECT * FROM users WHERE username = '${username}';`);
            if (result.length === 0) {
                resolve(false);
                return;
            }
            let row = result[0];
            resolve(bcrypt.compare(password, row["hash"]));
        });
    },
    getUserByUsername: function(username) {
        return new Promise(async (resolve) => {
            resolve(await query(`SELECT * FROM users WHERE username = '${username}';`));
        });
    },
    getUserById: function(uid) {
        return new Promise(async (resolve) => {
            resolve(await query(`SELECT * FROM users WHERE uid = '${uid}';`));
        });
    },
    getPackagesByUid: function(uid) {
        return new Promise(async (resolve) => {
            resolve(await query(`SELECT * FROM packages WHERE uid = '${uid}';`));
        });
    },
    isEmpty: function(what) {
        return what === undefined || what === "";
    }
}
