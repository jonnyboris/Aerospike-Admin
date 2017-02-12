riot.tag2('createindex', '<form onsubmit="{createIndex}"> <h2>Create Index</h2> <div> <label>Namespace</label> <input type="text" placeholder="Namespace" ref="namespace" required> </div> <div> <label>Set</label> <input type="text" placeholder="Set" ref="set" required> </div> <div> <label>Bin</label> <input type="text" placeholder="Bin" ref="bin" required> </div> <div> <label>Type</label> <select ref="type"> <option value="NUMERIC">Numeric</option> <option value="STRING">STRING</option> </select> </div> <button>Create</button> </form>', '', '', function(opts) {
        this.result = " ";

        this.createIndex = function(e) {
            e.preventDefault();
            console.log(this.refs);

            aero.createIndex(
                    this.refs.namespace.value,
                    this.refs.set.value,
                    this.refs.bin.value,
                    this.refs.type.value,
                    function(res) {
                        this.result = JSON.stringify(res);
                        this.update();
                        console.log(this);
                    }.bind(this)

            );
        };

});