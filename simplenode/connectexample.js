// minimal node server using Connect middleware to serve static files from 'public' directory (serves the css file in this example)

var connect = require("connect");

var app = connect()
    .use(connect.logger('dev'))
    .use(connect.static('public'))
    .use(function(request, response){
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("<link rel='stylesheet' type='text/css' href='styles.css'>");
        response.write("<h1>Hello World</h1>");
        response.end();
    })
    .listen(8888);