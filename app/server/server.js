// Root of the server
const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')

app.use(express.static('../web'));

app.post('/action/login', (req, res) => {

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