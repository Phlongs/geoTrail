var express = require("express");
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var path = require('path');


// Models
var Publisher = require('./models/publisher.js');

var app = express();
var PORT = process.env.PORT || 3000;

// View Engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// Set Static Path
app.use(express.static(process.cwd() + "/public"));

// Setting up links for mongo
var mlab = '';
var local = 'mongodb://localhost:27017/geoTrail';

// Connect to localhost if not a production environment
if(process.env.NODE_ENV == 'production'){
  mongoose.connect(mlab);
} else {
  mongoose.connect(local);
}
 
var db = mongoose.connection;

// show any Mongoose errors
db.on('error', function (err) {
  console.log('Mongoose Error: ', err);
});

// Once logged in to the db through mongoose, log a success message
db.once('open', function () {
  console.log('Mongoose connection successful.');
});

// Routes
const apiRoutes = require('./routes/apiRoutes');
app.use('/', apiRoutes);

app.listen(PORT, () => {
 console.log("Server listening on port " + PORT);
});