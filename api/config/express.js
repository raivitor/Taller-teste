var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function () {
    var app = express();

	app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});

    app.use(bodyParser.urlencoded({extended: true}));
  	app.use(bodyParser.json());
  	app.use(expressValidator());
  	
    consign()
   		.include('controllers')
   		.then('persistencia')
   		.into(app);

    return app;
}
