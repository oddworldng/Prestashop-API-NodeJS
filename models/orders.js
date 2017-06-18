var connection = require('./connection');

/* Orders object */
var Order = {};

/* Get all orders */
Order.getOrders = function(callback) {
    if (connection) {
        connection.query('SELECT * FROM ps_orders ORDER BY id_order', function(error, rows) {
            if(error) {
                throw error;
            }
            else {
                callback(null, rows);
            }
        });
    }
}

/* Get order by Id */
Order.getOrder = function(id, callback) {
    if (connection) {
        var sql = 'SELECT * FROM ps_orders WHERE id_order = ' + connection.escape(id);
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

module.exports = Order;