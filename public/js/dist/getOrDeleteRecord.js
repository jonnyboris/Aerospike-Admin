riot.tag2('getrecord', '<form onsubmit="{getRecord}"> <h2>Get Record</h2> <div> <label>Namespace</label> <input type="text" placeholder="Namespace" ref="namespace" required> </div> <div> <label>Set</label> <input type="text" placeholder="Set" ref="set" required> </div> <div> <label>Key</label> <input type="text" placeholder="Key" ref="key" required> </div> <button>Get</button> <button type="button" onclick="{deleteRecord}">Delete</button> </form> <p>Result:</p> <textarea>{result}</textarea>', '', '', function(opts) {
        this.result = " ";

        this.getRecord = function(e) {
            e.preventDefault();
            console.log(this.refs);

            aero.getRecord(
                    this.refs.namespace.value,
                    this.refs.set.value,
                    this.refs.key.value,
                    function(res) {
                        this.result = JSON.stringify(res);
                        this.update();
                        console.log(this);
                    }.bind(this)

            );
        };

        this.deleteRecord = function () {

            if(window.confirm("Delete record")) {
                aero.deleteRecord(
                    this.refs.namespace.value,
                    this.refs.set.value,
                    this.refs.key.value,
                    function(res) {
                        alert("deleted");
                    }.bind(this)
                );
            }
        }

});