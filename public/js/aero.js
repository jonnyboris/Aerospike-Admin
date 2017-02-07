var aero = {
    //need to be more defensive here when made into a module
    host: document.location.origin,

    saveRecord: function (ns, set, k, v) {
        $.post(this.host + "/" + ns + "/" + set + "/" + k, {value: v}, function (res) {
            console.log(res);
        });
    },

    getRecord: function (ns, set, k, callback) {
        $.get(this.host + "/" + ns + "/" + set + "/" + k, function (res) {
            console.log(res);

            if(typeof callback === "function") {
                callback(res);
            }
        })
    }
};