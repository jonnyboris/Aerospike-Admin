<addRecord>
    <form onsubmit="{postRecord}">
        <h2>Add Record</h2>
        <div>
            <label>Namespace</label>
            <input type="text" placeholder="Namespace" ref="namespace" required/>
        </div>

        <div>
            <label>Set</label>
            <input type="text" placeholder="Set" ref="set" required/>
        </div>

        <div>
            <label>Key</label>
            <input type="text" placeholder="Key" ref="key" required/>
        </div>

        <div>
            <label>Value</label>
            <input type="text" placeholder="Value" ref="value" required/>
        </div>

        <button>Save</button>
    </form>

    <script>
        this.postRecord = function(e) {
            e.preventDefault();
            console.log(this.refs);

            aero.saveRecord(
                this.refs.namespace.value,
                this.refs.set.value,
                this.refs.key.value,
                this.refs.value.value
            );
        };
    </script>


</addRecord>