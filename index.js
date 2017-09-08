'use strict';

require('dotenv').config();

const   express     = require( 'express' ),
        app         = express(),
        logger      = require( 'morgan' ),
        template    = require( 'pug' ),
        nodemailer  = require( 'nodemailer' ),
        bodyParser  = require( 'body-parser' );

app.use( logger( 'dev' ) );
app.use( express.static( __dirname + '/static') );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({
    extended: true
}));

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

app.get('/thanks', function (req, res) {
    var fn = template.compileFile( __dirname + '/src/views/thanks.pug');
    var html = fn({title:'Thanks'});
    res.send(html);
});

app.get('/error', function (req, res) {
    var fn = template.compileFile( __dirname + '/src/views/error.pug');
    var html = fn({title:'Error'});
    res.send(html);
});

app.post('/contact', function(req, res) {
    let mailInfo = {};
        mailInfo.name     = req.body.name;
        mailInfo.bandName = req.body.bandName;
        mailInfo.email    = req.body.email;
        mailInfo.message  = req.body.message;
    console.log('mailInfo', mailInfo);

    let transporter = nodemailer.createTransport({
        host:   process.env.MAIL_HOST,
        port:   process.env.MAIL_PORT,
        secure: false,
        auth:   {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    let mailOptions = {
        from: mailInfo.name + '<' + mailInfo.email + '>',
        to:   'info@themusicmongel.com',
        text: mailInfo.message
    };

    transporter.sendMail(mailOptions, (error,info) => {
        if(error){
            console.log(error);
            res.redirect('/error');
        } else {
            console.log(info.messageId);
            res.redirect('/thanks');
        }
    });
});

app.listen( process.env.PORT || 3000, function () {
    console.log('Listening on http://localhost' + ( process.env.PORT || 3000 ));
});
