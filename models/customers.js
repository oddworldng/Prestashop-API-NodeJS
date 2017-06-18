var connection = require('./connection');

/* Customers object */
var Customer = {};

/* Get all customers */
Customer.getUsers = function(callback) {
    if (connection) {
        connection.query('SELECT * FROM ps_customer ORDER BY id_customer', function(error, rows) {
            if(error) {
                throw error;
            }
            else {
                callback(null, rows);
            }
        });
    }
}

/* Get customer by Id */
Customer.getUser = function(id, callback) {
    if (connection) {
        var sql = 'SELECT * FROM ps_customer WHERE id_customer = ' + connection.escape(id);
        connection.query(sql, function(error, row) {
            if(error) {
                throw error;
            }
            else {
                callback(null, row);
            }
        });
    }
}

module.exports = Customer;