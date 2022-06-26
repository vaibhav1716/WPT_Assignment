let http = require('http');
let url = require('url');

console.log("nodejs is working");
http.createServer((req, resp) => {



    let x = url.parse(req.url, true).query;

    let radius = x.radius;

    resp.write("Diameter = " + 2 * radius)

    resp.end();

}).listen(800);