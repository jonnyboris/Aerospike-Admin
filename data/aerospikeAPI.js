var Aerospike = require("aerospike");
var configGenerator = require("../config/aerospike");
const client = Aerospike.client(require('../config/aerospike'));

var config = configGenerator.generate();
var api = {
    cluster: config.hosts
};
var metadata = {
    ttl: 10000,
    gen: 0
}





// Establish connection to the cluster
api.connect = function (callback) {
    client.connect(callback)
};


api.writeRecord = function (ns, set, k, v, callback) {
    var key = new Aerospike.Key(ns, set, k);
    client.put(key, v, metadata, function (error, record) {

        if (error) {
            return callback(error)
        } else {
            return callback(null, 'ok')
        }
    })
};

api.readRecord = function (ns, set, k, callback) {
    var key = new Aerospike.Key(ns, set, k);
    client.get(key, function (error, record) {
        if (error) {
            return callback(error)
        } else {
            return callback(null, record);
        }
    })
};

module.exports = api;