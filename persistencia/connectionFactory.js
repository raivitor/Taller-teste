var mysql = require('mysql');

function createDBConnection() {
	return mysql.createConnection({
		host: 'cig4l2op6r0fxymw.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
		user: 'obccopz4junqpa99',
		password: 'vnc1gam38a5wds57',
		database: 'hja585fulwc6p5zx',
		multipleStatements: true
	});
}

module.exports = function () {
	return createDBConnection;
}