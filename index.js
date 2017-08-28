'use strict';

var express  = require( 'express' ),
    logger   = require( 'morgan' ),
    app      = express(),
    template = require('jade').compileFile(__dirname + '/src/views/home.jade');

app.use( logger( 'dev' ) );
app.use( express.static( __dirname + '/static') );

app.get('/', function (req, res) {
    var html = template({ title: 'Home' });
    res.send(html);
});

app.listen( process.env.PORT || 3000, function () {
    console.log('Listening on http://localhost' + ( process.env.PORT || 3000 ));
});
