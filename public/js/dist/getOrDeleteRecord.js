riot.tag2('getrecord', '<form onsubmit="{getRecord}"> <h2>Get or Delete Record</h2> <div class="form-group"> <label>Namespace</label> <input type="text" class="form-control" placeholder="Namespace" ref="namespace" required> </div > <div class="form-group"> <label>Set</label> <input type="text" class="form-control" placeholder="Set" ref="set" required> </div> <div class="form-group"> <label>Key</label> <input type="text" class="form-control" placeholder="Key" ref="key" required> </div> <div class="text-right"> <button type="button" class="btn btn-danger btn-lg" onclick="{deleteRecord}">Delete</button> <button class="btn btn-success btn-lg">Get</button> </div> </form> <h4>Result:</h4> <div> <pre id="result">nothing</pre> </div>', '', '', function(opts) {
        this.result = " ";

        this.getRecord = function(e) {
            e.preventDefault();
            console.log(this.refs);

            aero.getRecord(
                this.refs.namespace.value,
                this.refs.set.value,
                this.refs.key.value,
                function(status, res) {
                    console.log(status);
                    if(status === 200) {
                        this.result = JSON.stringify(res);
                        $("#result").html(syntaxHighlight(res));
                        this.update();
                        alertify.success("Got record");
                    } else if (status == 404) {
                        alertify.error("404 Record not found");
                    } else {
                        alertify.alert("Server error (status: " + status + ")");
                    }

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

});