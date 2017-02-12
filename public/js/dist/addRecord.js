riot.tag2('addrecord', '<form onsubmit="{postRecord}"> <h2>Add Record</h2> <div> <label>Namespace</label> <input type="text" placeholder="Namespace" ref="namespace" value="test" required> </div> <div> <label>Set</label> <input type="text" placeholder="Set" ref="set" value="sat" required> </div> <div> <label>Key</label> <input type="text" placeholder="Key" ref="key" value="jonny" required> </div> <fieldset> <legend>Bins</legend> <div each="{kvs}"> <div> <input type="text" ref="binKey" placeholder="Key"> <input type="text" ref="binValue" placeholder="Value"> </div> </div> <button onclick="{addBin}" type="button">Add Bin</button> </fieldset> <button>Save</button> </form> <button onclick="{log}">log</button>', '', '', function(opts) {

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

        this.postRecord = function(e) {
            e.preventDefault();
            var bins = this.combineBins();
            console.log(bins);

            aero.saveRecord(
                this.refs.namespace.value,
                this.refs.set.value,
                this.refs.key.value,
                bins
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