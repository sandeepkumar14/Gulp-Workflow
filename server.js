/* jshint esnext: true*/
var express = require('express');
var server = express();
var favicon= require("express-favicon");
var bodyParser= require("body-parser");
var morgan= require("morgan");
var path = require('path'); 
var moment = require("moment");
var cookieParser = require('cookie-parser');
var mongoose= require("mongoose");

var routes = require('./node-routes/routes');

// bodyParser
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
   extended: true 
}));

// Template/view engine setup
server.set('view engine', 'ejs');
server.set('views', './views');

var config= require("./config");
//Mongolab database
mongoose.connect(config.database, function(err){
   if (err) {
      console.log(err);
   }else{
      console.log("The database is connected");
   }
});

//Environment Variable
server.set('port', (process.env.PORT || 5000));

// Morgan as dev Dependency 
server.use(morgan('dev'));

// Static file (middleware)
server.use(express.static(__dirname + '/development'));

//favicon
server.use(favicon(path.join(__dirname + '/development/images/favicon.ico')));

// moment (Showing data & time)
console.log(moment().format('llll')); 

// cookie Parser
server.use(cookieParser());
server.use('/', routes);


server.listen(server.get('port'), function (err) {
   if (err) {
      console.log(err);
   }else{
      console.log("The express server listen on port: "+ server.get('port'));
   }
});















