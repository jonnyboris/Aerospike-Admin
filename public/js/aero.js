var aero = {
    //need to be more defensive here when made into a module
    host: document.location.origin,

    saveRecord: function (ns, set, k, v, callback) {
        // v = JSON.stringify(v);
        $.post(this.host + "/" + ns + "/" + set + "/" + k, v, function (res, msg, obj) {

        });

        $.ajax({
            url: this.host + "/" + ns + "/" + set + "/" + k,
            type: 'POST',
            data: v,
            success: function(res, textStatus, xhr){
                if(typeof callback === "function") {
                    callback(xhr.status);
                }
            },
            error: function(res, textStatus, xhr) {
                if(typeof callback === "function") {
                    callback(xhr.status, res);
                }
            }
        });
    },

    getRecord: function (ns, set, k, callback) {

        $.ajax({
            url: this.host + "/" + ns + "/" + set + "/" + k,
            type: 'GET',
            success: function(res, textStatus, xhr){
                if(typeof callback === "function") {
                    callback(xhr.status, res);
                }
            },
            error: function(res, textStatus, message) {
                console.log(arguments);
                if(typeof callback === "function") {
                    callback(res.status, message);
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
            url: this.host + "/" + ns + "/" + set + "/",
            type: 'get',
            data: opts,
            success: function(res, textStatus, xhr) {
                console.log(res);
                if(typeof callback === "function") {
                    callback(xhr.status, res);
                }
            }
        });
    }
};