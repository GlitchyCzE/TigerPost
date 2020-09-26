// Root of the server
const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');
const ash = require('express-async-handler');
const bodyParser = require('body-parser');

const logic = require('./logic');

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

app.use(express.static(__dirname+'/../web'));

app.post('/action/login', ash(async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (logic.isEmpty(username) || logic.isEmpty(password)) {
        res.send({'error': true, 'msg': 'Username/Password invalid.'}).end(403);
    }
    let result = await logic.verifyUser(username, password);
    if (result) {
        let result = await logic.getUserByUsername(username)["uid"];
        req.session.is_admin = result.is_admin;
        req.session.uid = result.uid;
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

app.post('/action/getPackages',  ash(async(req, res) => {
    if (logic.isEmpty(req.session.uid)) {
        res.send({error: false, msg: 'OK'}).end(403);
    }
    res.send({error: false, data: logic.getPackagesByUid(req.session.uid)}).end(200);
}));

app.post('/action/createPackage',  ash(async(req, res) => {

}));

app.post('/action/storePackage', (req, res) => {

});

app.post('/action/checkoutPackage', (req, res) => {

});

app.post('/action/getLocations', (req, res) => {

});

app.post('/action/createLocation', (req, res) => {

});

app.post('/action/updateLocation', (req, res) => {

});

app.post('/action/deleteLocation', (req, res) => {

});


//TODO: Change back to no '0.0.0.0'
app.listen(port, "0.0.0.0", () => {
    console.log(`TigerPost listening locally on http://localhost:${port}`);
    console.log(`One must start up the proxy webserver using the config in /webserver`);
})