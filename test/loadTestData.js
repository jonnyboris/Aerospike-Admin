var fs = require("fs");
var aerospike = require("../data/aerospikeAPI");
var mockData = [];
var len = 0;

aerospike.connect();

fs.readFile("./MOCK_DATA.json", 'utf8', function(err, data) {
    if(err) throw err;
    mockData = JSON.parse(data);
    len = mockData.length;
    addUser(0);
});

//need to add sequentially or we open too many connections
function addUser(i) {
    if(i < len) {
        aerospike.writeRecord("test", "users", mockData[i].email, mockData[i], function () {
            i += 1;
            addUser(i);
        });

    } else {
        console.log("Done")
    }

}