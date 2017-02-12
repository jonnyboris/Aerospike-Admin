var aero = {
    //need to be more defensive here when made into a module
    host: document.location.origin,

    saveRecord: function (ns, set, k, v) {
        // v = JSON.stringify(v);
        $.post(this.host + "/" + ns + "/" + set + "/" + k, v, function (res) {
            console.log(res);
        });
    },

    getRecord: function (ns, set, k, callback) {

        $.ajax({
            url: this.host + "/" + ns + "/" + set + "/" + k,
            type: 'GET',
            success: function(res){
                if(typeof callback === "function") {
                    callback(res);
                }
            },
            error: function(res, err, msg) {
                if(res.status == 404) {
                    alert("Not found");
                }
            }
        });
    },

    deleteRecord: function (ns, set, k, callback) {

        $.ajax({
            url: this.host + "/" + ns + "/" + set + "/" + k,
            type: 'delete',
            success: function(res) {
                console.log(res);
                if(typeof callback === "function") {
                    callback(res);
                }
            }
        });

    },


    createIndex: function (ns, set, bin, type, callback) {

        $.ajax({
            url: this.host + "/index/" + ns + "/" + set + "/" + bin,
            type: 'post',
            data: {type: type},
            success: function(res) {
                console.log(res);
                if(typeof callback === "function") {
                    callback(res);
                }
            }
        });

    },
    
    query: function (ns, set, opts, callback) {
        $.ajax({
            url: this.host + "/query/" + ns + "/" + set + "/",
            type: 'get',
            data: opts,
            success: function(res) {
                console.log(res);
                if(typeof callback === "function") {
                    callback(res);
                }
            }
        });
    }
};