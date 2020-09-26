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
            let result = await query(`SELECT * FROM users WHERE username = '${username}';`);
            result = result[0]
            resolve(result);
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
    createPackage: function(tid, to, address, scanned_in_uid) {
        return new Promise( async (resolve) => {
            let result = await query(`SELECT * FROM users WHERE name LIKE %${to}%`);
            let uid = -1;
            if (!this.isEmpty(result)) {
                uid = result[0].uid;
            }
            resolve(await query(`INSERT INTO packages (tid, uid, to, address, time_scanned_in, scanned_in_by) VALUES ('${tid}', '${uid}', '${to}', '${address}', CURRENT_TIME(), '${scanned_in_uid}');`))
        });
    },

    isEmpty: function(what) {
        return what === undefined || what === "" || what === [];
    }
}
