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
};





// Establish connection to the cluster
api.connect = function (callback) {
    client.connect(callback)
};


api.writeRecord = function (ns, set, k, v, callback) {
    var key = new Aerospike.Key(ns, set, k);
    client.put(key, v, metadata, function (error, record) {

    if(error) {
        console.log(error);
    }

    if(typeof callback == "function") {
        if (error) {
            callback(error)
        } else {
            callback(null, 'ok')
        }
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

api.deleteRecord = function (ns, set,k, callback) {
    // Key of the record to be deleted
    var key = new Aerospike.Key(ns, set, k);

    client.remove(key, function (error, key) {
        callback(error, key)
    })
};

api.createIndex = function (ns, set, bin, type, callback) {
    var options = {
        ns: ns,
        set: set,
        bin: bin,
        index: 'idx_' + ns + "_" + set + "_" + bin,
        datatype: Aerospike.indexDataType[type]
    };

    client.createIndex(options, function (error, job) {
        if (error) {
            // error creating index
            if(typeof callback == "function") {
                callback(error);
            }
        }
        job.waitUntilDone(function (error) {
            if(typeof callback == "function") {
                callback(error);
            }
        })
    })
};

api.query = function (ns, set, opts, callback) {
    var query = client.query(ns, set);
    var stream = null;
    var result = [];

    if(opts.filter == "range") {

        query.where(Aerospike.filter.range(
            opts.filterBy,
            parseInt(opts.min),
            parseInt(opts.max)
        ));
     } else if(opts.filter == "equals") {
         console.log(opts);
        query.where(Aerospike.filter.equal(
            opts.filterBy,
            opts.equals
        ));
    }

    if(opts.select) {
        query.select(opts.select);
    }

    stream = query.foreach();

    stream.on('data', function (record) {
        result.push(record);
    });

    stream.on('error', function (error) {
        if(typeof callback === "function") {
            callback(error);
        }
    });

    stream.on('end', function () {
        callback(0, result);
    });

};

module.exports = api;