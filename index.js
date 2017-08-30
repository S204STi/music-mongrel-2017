'use strict';

var express  = require( 'express' ),
    logger   = require( 'morgan' ),
    app      = express(),
    template = require( 'pug' );

app.use( logger( 'dev' ) );
app.use( express.static( __dirname + '/static') );

app.get('/', function (req, res) {
    var fn = template.compileFile( __dirname + '/src/views/home.pug' );
    var html = fn({title: 'Home'});
    res.send(html);
});

app.get('/shows', function (req, res) {
    var fn = template.compileFile( __dirname + '/src/views/shows.pug' );
    var html = fn({title: 'Shows'});
    res.send(html);
});

app.get('/about', function (req, res) {
    var fn = template.compileFile( __dirname + '/src/views/about.pug' );
    var html = fn({title: 'About'});
    res.send(html);
});

app.get('/contact', function (req, res) {
    var fn = template.compileFile( __dirname + '/src/views/contact.pug' );
    var html = fn({title: 'Contact'});
    res.send(html);
});

app.listen( process.env.PORT || 3000, function () {
    console.log('Listening on http://localhost' + ( process.env.PORT || 3000 ));
});
