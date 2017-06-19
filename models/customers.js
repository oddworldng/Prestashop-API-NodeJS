var connection = require('./connection');

/* Customers object */
var Customer = {};

/* Get all customers */
Customer.getCustomers = function(callback) {
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
Customer.getCustomer = function(id, callback) {
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

/* Insert a new customer */
Customer.insertCustomer = function(userData, callback) {
    if (connection) {
        connection.query('INSERT INTO ps_customer SET ?', userData, function(error, result) {
            if(error) {
                throw error;
            }
            else {
                /* Return last insert ID */
                callback(null,{"insertId" : result.insertId});
            }
        });
    }
}

module.exports = Customer;