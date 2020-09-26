// Root of the server
const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');
const ash = require('express-async-handler');
const bodyParser = require('body-parser');
const path = require('path');

const logic = require('./logic');

console.log(require('./bcrypt-hash').hash("userpassword"));

app.set('trust proxy', 1); // trust first proxy
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(session({
    secret: 'super duper secret',
    resave: true,
    saveUninitialized: false
}));

app.use(express.static(__dirname + '/../web'));

app.get("/dashboard", (req, res) => {
    if (logic.isEmpty(req.session.uid)) {
        res.send({error: true, msg: 'No Auth'}).end(403);
    }
    if (req.session.is_admin) {
        res.sendFile(path.resolve(__dirname+'/../web/admin.html'));
    } else {
        res.sendFile(path.resolve(__dirname+'/../web/dashboard.html'));
    }
})

app.post('/action/login', ash(async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (logic.isEmpty(username) || logic.isEmpty(password)) {
        res.send({'error': true, 'msg': 'Username/Password invalid.'}).end(403);
    }
    let result = await logic.verifyUser(username, password);
    if (result) {
        let result = await logic.getUserByUsername(username);
        req.session.is_admin = result.is_admin;
        req.session.uid = result.uid;
        res.cookie('username', username);
        res.send({error: false, msg: 'OK'}).end(200);
    } else {
        req.session.destroy();
        res.send({error: true, msg: 'Username/Password invalid.'}).end(403);
    }
}));

app.post('/action/logout', (req, res) => {
    req.session.destroy();
    res.send({error: false, msg: 'OK'}).end(200);
});

app.post('/action/getPackages', ash(async (req, res) => {
    if (logic.isEmpty(req.session.uid)) {
        res.send({error: true, msg: 'No Auth'}).end(403);
    }
    let result = await logic.getPackagesByUid(req.session.uid);
    res.send({error: false, data: result}).end(200);
}));

app.post('/action/createPackage', ash(async (req, res) => {
    if (logic.isEmpty(req.session.uid)) {
        res.send({error: true, msg: 'No Auth'}).end(403);
    }
    if (res.session.is_admin) {
        let tid = req.body.tid;
        let to = req.body.to;
        let address = req.body.address;
        if (logic.isEmpty(tid) || logic.isEmpty(to) || logic.isEmpty(address)) {
            res.send({error: true, msg: 'Missing parameters'}).end(400);
        }
        await logic.createPackage(tid, to, address, req.session.uid);
    } else {
        res.send({error: true, msg: 'No Auth'}).end(403);
    }
}));

app.post('/action/storePackage', (req, res) => {
    if (logic.isEmpty(req.session.uid)) {
        res.send({error: true, msg: 'No Auth'}).end(403);
    }
    if (res.session.is_admin) {

    } else {
        res.send({error: true, msg: 'No Auth'}).end(403);
    }
});

app.post('/action/checkoutPackage', (req, res) => {
    if (logic.isEmpty(req.session.uid)) {
        res.send({error: true, msg: 'No Auth'}).end(403);
    }
    if (res.session.is_admin) {

    } else {
        res.send({error: true, msg: 'No Auth'}).end(403);
    }
});

/*
Disabled due to time constrains
app.post('/action/getLocations', (req, res) => {

});

app.post('/action/createLocation', (req, res) => {

});

app.post('/action/updateLocation', (req, res) => {

});

app.post('/action/deleteLocation', (req, res) => {

});
*/

//TODO: Change back to no '0.0.0.0'
app.listen(port, "0.0.0.0", () => {
    console.log(`TigerPost listening locally on http://localhost:${port}`);
    console.log(`One must start up the proxy webserver using the config in /webserver`);
})