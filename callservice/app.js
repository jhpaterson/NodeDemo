/**
 * Created with JetBrains WebStorm.
 * User: jim
 * Date: 09/11/12
 * Time: 22:17
 * To change this template use File | Settings | File Templates.
 */

var http = require("http");

// define the GET request
// requires ASP.NET Web API service in AsyncDemoMVC4 project to be running
var options = {
    host: 'localhost',
    port: 3768,
    path: '/api/users',
    method: 'GET'
};

http.createServer(function(request, response) {
    console.info('Options prepared:');
    console.info(options);
    console.info('Do the GET call');
    response.writeHead(200, {"Content-Type": "text/html"});

// do the GET request
    var reqGet = http.request(options, function(res) {

        // log status and headers to console
        console.log("statusCode: ", res.statusCode);
        console.log("headers: ", res.headers);

        res.on('data', function(d) {
            // log GET result to console
            console.info('GET result:\n');
            process.stdout.write(d);

            // write response
            var result = JSON.parse(d);
            response.write('<h2>Users</h2>');
            response.write('<ul>');
            for (i=0; i<result.length; i++) {
                response.write('<li>' + result[i].Firstname + ' ' + result[i].Lastname + '</li>');
            }
            response.end();

            // log progress to console
            console.info('\n\nCall completed');
        });
    });
    reqGet.end();
    reqGet.on('error', function(e) {
        console.error(e);
    });
}).listen(3002);
console.log('server listening on port 3002')