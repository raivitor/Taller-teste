var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function () {
	var app = express();

	app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Access-Control-Allow-Headers, Content-Type, Accept, Authorization, x-access-token");
		next();
	});

	app.set('secret', 'Do. Or do not. There is no try.'); // frase para o jwt
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(expressValidator());

	consign()
		.include('controllers/Auth.js')
		.then('controllers')
		.then('persistencia')
		.into(app);

	return app;
}
