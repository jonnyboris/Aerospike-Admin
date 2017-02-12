<query>
    <div class="row">
        <div class="col-4">
            <div class="component query scrollAuto">
                <form onsubmit="{query}">
                    <h2>Query</h2>
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
                        <select ref="type" class="form-control" onchange="{changed}">
                            <option selected disabled>Choose</option>
                            <option value="range">Range</option>
                            <option value="equals">Equals</option>
                        </select>
                    </div>

                    <div show="{range}" class="row">
                        <div class="form-group col-6">
                            <label>Min</label>
                            <input type="text" class="form-control" placeholder="Min" ref="min" />
                        </div>

                        <div class="form-group col-6">
                            <label>Max</label>
                            <input type="text" class="form-control" placeholder="Max" ref="max" />
                        </div>
                    </div>

                    <div show="{equals}" class="form-group">
                        <div>
                            <label>Equals</label>
                            <input type="text" class="form-control" placeholder="Equals" ref="valueEquals" />
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Select bin</label>
                        <input type="text" class="form-control" placeholder="Select bin" ref="select"/>
                    </div>

                    <div class="text-right">
                        <button class="btn btn-success btn-lg">Search</button>
                    </div>


                </form>
            </div>
        </div>

        <div class="col-8">
            <div class="component query">
                <h4>Results</h4>

                <pre id="queryResult">nothing</pre>
            </div>
        </div>
    </div>


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
                function(status, res) {

                    if(status == 200) {
                        $("#queryResult").html(syntaxHighlight(res)); //its getting on, need to be fast
                    } else {

                    }

                }.bind(this)
            );
        };


        function syntaxHighlight(json) {

            if(typeof json !== "string") {
                json = JSON.stringify(json, undefined, 4);
            }

            json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                var cls = 'number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key';
                    } else {
                        cls = 'string';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'boolean';
                } else if (/null/.test(match)) {
                    cls = 'null';
                }
                return '<span class="' + cls + '">' + match + '</span>';
            });
        }

    </script>


</query>