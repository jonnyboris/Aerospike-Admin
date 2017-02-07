const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const api = require('./data/aerospikeAPI');
const app = express();

// Establish connection to the cluster
api.connect(function (error) {
    if (error) {
        console.error('Connection to Aerospike cluster failed!');
        process.exit(1);
    } else {
        // handle success
        console.log('Connection to Aerospike cluster succeeded!');
    }
});
// Setup default/home route
app.use('/', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));



app.post('/:namespace/:set/:key', function (req, res) {
    var namespace = req.params.namespace,
        set = req.params.set,
        key = req.params.key,
        value = "";

    if(typeof req.body.value === "string") {
        value = JSON.parse(req.body.value);
    } else {
        value = req.body.value;
    }


    if(namespace && set && key && value) {
        api.writeRecord(namespace, set, key, value, function (error, result) {
            if (error) {
                res.status(500);
                res.send(namespace);
            } else {
                res.status(201);
                res.send();
            }
        });
    } else {
        var errorMsg = "";

        errorMsg += "namespace: " + namespace;
        errorMsg += "<br>set: " + set;
        errorMsg += "<br>key: " + namespace;
        errorMsg += "<br>value: " + value;

        res.status(400);
        res.send(errorMsg);
    }
});


app.get('/:namespace/:set/:key', function (req, res) {
    var namespace = req.params.namespace,
        set = req.params.set,
        key = req.params.key;

    if(namespace && set && key) {
        api.readRecord(namespace, set, key, function (err, record) {
            if(err) {
                throw err;
            } else {
                var response = {};
                response[key] = record;
                res.send(response);
            }
        })
    } else {
        var errorMsg = "";

        errorMsg += "namespace: " + namespace;
        errorMsg += "<br>set: " + set;
        errorMsg += "<br>key: " + namespace;

        res.status(400);
        res.send(errorMsg);
    }
});


// Start server
var server = http.Server(app);
var host = '80.85.87.166';

server.listen('9000', host, function () {
    console.log('App is running on http://'+host+':9000. Press Ctrl-C to exit...')
});