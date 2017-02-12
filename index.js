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



//set
app.post('/:namespace/:set/:key', function (req, res) {
    var namespace = req.params.namespace,
        set = req.params.set,
        key = req.params.key,
        value = "";

    if(typeof req.body === "string") {
        value = JSON.parse(req.body);
    } else {
        value = req.body;
    }


    if(namespace && set && key && value) {
        api.writeRecord(namespace, set, key, value, function (error, result) {
            console.log(error);
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
        console.log("error", errorMsg);
        res.status(400);
        res.send(errorMsg);
    }
});

//get
app.get('/:namespace/:set/:key', function (req, res) {
    var namespace = req.params.namespace,
        set = req.params.set,
        key = req.params.key;

    if(namespace && set && key) {
        api.readRecord(namespace, set, key, function (err, record) {
            if(err) {
                console.log(err, err.AerospikeError);

                if(err.message === "AEROSPIKE_ERR_RECORD_NOT_FOUND") {
                    res.status(404);
                    res.send("Not found");
                } else {
                    res.status(500);
                    res.send(err);
                }

                // throw err;
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

//this is almost the same as get, could refactor down
app.delete('/:namespace/:set/:key', function (req, res) {
    var namespace = req.params.namespace,
        set = req.params.set,
        key = req.params.key;

    if(namespace && set && key) {
        api.deleteRecord(namespace, set, key, function (err, record) {
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

//create index
app.post('/index/:namespace/:set/:bin',  function (req, res) {
    var namespace = req.params.namespace,
        set = req.params.set,
        bin = req.params.bin,
        opts = null,
        type = null;

    if(typeof req.body === "string") {
        opts = JSON.parse(req.body);
    } else {
        opts = req.body;
    }

    type = opts.type;
    api.createIndex(namespace, set, bin, type, function (err) {
        console.log(arguments);

        res.send(err);
    })
});

//query
app.get("/:namespace/:set", function (req, res) {
    var namespace = req.params.namespace,
        set = req.params.set,
        opts = null;

    opts = req.query;

    api.query(namespace, set, opts, function (err, result) {
        // console.log(result);
        if(err) {
            res.send(err);
        } else {
            res.send(result);
        }

    })
});



// Start server
var server = http.Server(app);
var host = '80.85.87.166';

server.listen('9000', host, function () {
    console.log('App is running on http://'+host+':9000. Press Ctrl-C to exit...')
});