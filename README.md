#Aerospike Investigation

The aim of this project is to implement the Aerospike API and preform
basic interactions with it.

It will be considered complete when a user can get, set & delete records
create secondary indexes and preform basic queries.

The project consists of 2 halves a "rest" API written in Node.js and web client to
consume the API.

##API

NB. while Aerospike allows the omission of set, this API does not.

**Read Record**

```GET /:Namespace/:set/:key```

Returns
  - 200 OK - and JSON representation of the record
  - 404 Not found
  - 400 Bad request - There is probably something missing from your request
  - 500 Server error

**Write Record**

```POST /:Namespace/:set/:key```

Returns
  - 201 Created 
  - 400 Bad request - There is probably something missing from your request 
  - 500 Server error
  
**Delete Record**

```DELETE /:Namespace/:set/:key```

Returns
  - 200 OK - Deleted 
  - 400 Bad request - There is probably something missing from your request 
  - 500 Server error
  
  
**Create Secondary Index**

```POST /index/:Namespace/:set/:bin```

Returns
  - 200 OK - response body will be empty if successful (This is not ideal and will change)
  
**Query**

```POST /index/:Namespace/:set/:bin```

Returns
  - 200 OK - This always returns 200 OK, again, not ideal, errors will be displayed as the result

##Project limitations

There is obviously a very small time window to complete the project in,
so feature coverage is prioritised. As this is an investigation, I
have not written any unit tests, furthermore I shall try to refactor
the codebase as much as possible, however learning is the aim here. 


##Installation

You can run a copy of this locally, however you will need aerospike running on the default port on your machine. After you have got that running. You will need to run 
``` bash
npm i
```
In the root of the project, this will install the dependancies. You will then need to edit the host variable (No time for a config yet) in index.js to get the server to listen on your localmachine.

You can then run 
``` bash
node index.js
```
And the server should start running on host:9000


###License

MIT License

Copyright (c) 2017 Jonathan Fairfull

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
