var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();

/* All environments */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(bodyParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

/* Create server */
http.createServer(app).listen(app.get('port'), function(){
    console.log('NodeJS server running on port ' + app.get('port'));
});

/* Routes */
require('./routes/index')(app); // Index
require('./routes/customers')(app); // Customers
require('./routes/orders')(app); // Orders
require('./routes/products')(app); // Products