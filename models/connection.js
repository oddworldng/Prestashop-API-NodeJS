var mysql = require('mysql');

/* Database connection */
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'prestashop17'
});

/* Check database variables */
if ((typeof connection.host === 'undefined') || (typeof connection.user === 'undefined') || (typeof connection.password === 'undefined') || (typeof connection.database === 'undefined')) {
    console.log("WARNING: Some database connection variables are not defined. File: models/connection.js.");
}

module.exports = connection;