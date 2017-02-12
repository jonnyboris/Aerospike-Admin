riot.tag2('addrecord', '<form onsubmit="{postRecord}"> <h2>Add Record</h2> <div class="form-group"> <label>Namespace</label> <input type="text" class="form-control" placeholder="Namespace" ref="namespace" value="" required> </div> <div class="form-group"> <label>Set</label> <input type="text" class="form-control" placeholder="Set" ref="set" value="" required> </div> <div class="form-group"> <label>Key</label> <input type="text" class="form-control" placeholder="Key" ref="key" value="" required> </div> <fieldset> <legend>Bins</legend> <div each="{kvs}" class="row"> <div class="col-6"> <input type="text" class="form-control" ref="binKey" placeholder="Key"> </div> <div class="col-6"> <input type="text" class="form-control" ref="binValue" placeholder="Value"> </div> </div> <div class="addBin"> <button onclick="{removeBin}" type="button" class="btn btn-danger ">Remove Bin</button> <button onclick="{addBin}" type="button" class="btn btn-primary ">Add Bin</button> </div> </fieldset> <div class="commit text-right"> <button class="btn btn-success btn-lg">Save</button> </div> </form>', '', '', function(opts) {

        this.kvs = [
            {k: "", v: ""}
        ];

        this.log = function () {
            console.log(this);
        };

        this.addBin = function () {
            console.log(this);
            this.kvs.push({k: "", v: ""});
        };

        this.removeBin = function () {
            this.kvs.pop();
        };

        this.postRecord = function(e) {
            e.preventDefault();
            var bins = this.combineBins();
            console.log(bins);

            aero.saveRecord(
                this.refs.namespace.value,
                this.refs.set.value,
                this.refs.key.value,
                bins,
                function(status, res) {
                    if(status === 201) {
                        alertify.success("Record added");
                    } else {
                        alertify.error("Could not save record")
                        console.error("ERROR:", res);
                    }
                }
            );
        };

        this.combineBins = function() {
            var len = 0,
                i = 0,
                bins = {},
                k = this.refs.binKey,
                v =  this.refs.binValue;

            if(this.refs.binKey.length) {
                len = this.refs.binKey.length;
                for(i=0; i<len;i +=1) {
                    bins[k[i].value] = v[i].value;
                }
            } else {
                bins[k.value] = v.value;
            }

            return bins;
        }

});