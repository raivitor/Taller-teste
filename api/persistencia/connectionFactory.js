var mysql  = require('mysql');

function createDBConnection(){
		return mysql.createConnection({
			host: 'sql132.main-hosting.eu',
			user: 'u588708737_rai',
			password: 'churras',
			database: 'u588708737_churr',
			multipleStatements: true
		});
}

module.exports = function() {
	return createDBConnection;
}
