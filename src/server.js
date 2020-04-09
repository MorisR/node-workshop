
let http = require('http');
let router = require("./router");

let port = 4000;



var server = http.createServer(router);

server.listen(port, ()=>{
    console.log(`Server is listening on port ${port}.  Ready to accept requests!`);
});
