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

app.use(express.static('../web'));

app.post('/action/login', ash(async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (logic.isEmpty(username) || logic.isEmpty(password)) {
        res.send("Username/Password invalid.").end(403);
    }
    let result = await logic.verifyUser(username, password);
    if (result) {
        req.session.uid = await logic.getUserByUsername(username)["uid"];
        res.send("OK").end(200);
    } else {
        req.session.destroy();
        res.send("Username/Password invalid.").end(403);
    }
}));

app.post('/action/logout', (req, res) => {
    req.session.destroy();
    res.send("OK").end(200);
});

app.post('/action/getPackages', (req, res) => {

});

app.post('/action/createPackage', (req, res) => {

});

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

app.listen(port, () => {
    console.log(`TigerPost listening locally on http://localhost:${port}`);
    console.log(`One must start up the proxy webserver using the config in /webserver`);
})