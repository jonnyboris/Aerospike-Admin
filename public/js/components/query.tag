<query>
    <form onsubmit="{query}">
        <h2>Query</h2>
        <div>
            <label>Namespace</label>
            <input type="text" placeholder="Namespace" ref="namespace" required/>
        </div>

        <div>
            <label>Set</label>
            <input type="text" placeholder="Set" ref="set" required/>
        </div>

        <div>
            <label>Bin</label>
            <input type="text" placeholder="Bin" ref="bin" required/>
        </div>

        <div>
            <label>Type</label>
            <select ref="type" onchange="{changed}">
                <option selected disabled>Choose</option>
                <option value="range">Range</option>
                <option value="equals">Equals</option>
            </select>
        </div>

        <div show="{range}">
            <div>
                <label>Min</label>
                <input type="text" placeholder="Min" ref="min" />
            </div>

            <div>
                <label>Max</label>
                <input type="text" placeholder="Max" ref="max" />
            </div>
        </div>

        <div show="{equals}">
            <div>
                <label>Equals</label>
                <input type="text" placeholder="Equals" ref="valueEquals" />
            </div>
        </div>

        <div>
            <label>Select</label>
            <input type="text" placeholder="Select" ref="select"/>
        </div>

        <button>Create</button>

    </form>

    <script>
        this.range = false;
        this.equals = false;

        this.changed = function () {

            this.range = false;
            this.equals = false;

            if(this.refs.type.value == "range") {
                this.range = true;
            } else {
                this.equals = true;
            }

        };

        this.query = function(e) {
            e.preventDefault();
            var opts = {};
            console.log(this.refs);


            opts.filter = this.refs.type.value;
            opts.filterBy = this.refs.bin.value;

            opts.min = this.refs.min.value;
            opts.max = this.refs.max.value;

            opts.equals = this.refs.valueEquals.value;

            if(this.refs.select.value) {
                opts.select = this.refs.select.value;
            }

            aero.query(
                this.refs.namespace.value,
                this.refs.set.value,
                opts,
                function(res) {

                }.bind(this)
            );
        };


    </script>


</query>