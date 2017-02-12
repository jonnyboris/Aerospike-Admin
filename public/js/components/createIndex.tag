<createIndex>
    <form onsubmit="{createIndex}">
        <h2>Create Index</h2>
        <div class="form-group">
            <label>Namespace</label>
            <input type="text" class="form-control" placeholder="Namespace" ref="namespace" required/>
        </div>

        <div class="form-group">
            <label>Set</label>
            <input type="text" class="form-control" placeholder="Set" ref="set" required/>
        </div>

        <div class="form-group">
            <label>Bin</label>
            <input type="text" class="form-control" placeholder="Bin" ref="bin" required/>
        </div>

        <div class="form-group">
            <label>Type</label>
            <select ref="type" class="form-control">
                <option value="NUMERIC">Numeric</option>
                <option value="STRING">String</option>
            </select>
        </div>

        <div class="text-right">
            <button class="btn btn-success btn-lg">Create</button>
        </div>


    </form>

    <script>
        this.createIndex = function(e) {
            e.preventDefault();
            console.log(this.refs);

            aero.createIndex(
                    this.refs.namespace.value,
                    this.refs.set.value,
                    this.refs.bin.value,
                    this.refs.type.value,
                    function(res) {
                        if(res == "") {
                            alertify.success("Index created");
                        } else {
                            alertify.error("Could not create index " + res);
                        }
                    }.bind(this)

            );
        };


    </script>


</createIndex>