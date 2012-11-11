
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');
var ArticleProvider = require('./articleprovider-memory').ArticleProvider;


var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes for basic test pages

//app.get('/', routes.index);     // with this route disabled static page index.html in /public will be served
app.get('/test', routes.test);

// Trying out a more interesting example from http://howtonode.org/express-mongodb
// just implemented in-memory data at the moment
var articleProvider= new ArticleProvider();

app.get('/blog', function(req, res){
    articleProvider.findAll( function(error,docs){
        res.render('blog.jade', { locals: {
            title: 'Blog',
            articles:docs
            }
        });
    });
});

// Route which is similar to above but simply returns data as JSON, to be used in Ajax call

app.get('/blogdata', function(req, res){
    articleProvider.findAll( function(error,docs){
        res.json(docs);
    });
});


// Serve a specific static file, as an alternative to using express.static middleware

app.get('/static', function(req,res){
    res.sendfile(__dirname + '/public/static.html');
});


app.listen(8080, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
