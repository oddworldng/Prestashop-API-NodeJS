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

/* Insert a new order */
Order.insertOrder = function(orderData, callback) {
    if (connection) {
        connection.query('INSERT INTO ps_orders SET ?', orderData, function(error, result) {
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

/* Update an Order */
Order.updateOrder = function(orderData, callback) {
    if(connection) {

        connection.query('SELECT ps_orders FROM ps_orders WHERE id_order = ' + connection.escape(orderData.id_order), function(error, row) {
            if (row == ''){
                callback(null,{"insertId" : 0});
            }else{
                connection.query('UPDATE ps_orders SET ? WHERE id_order = ' + parseInt(orderData.id_order), orderData, function(error, result) {
                    if(error) {
                        throw error;
                    }
                    else {
                        callback(null,{"insertId" : orderData.id_order});
                    }
                });
            }
        });

    }
}

/* Update an Order */
Order.deleteOrder = function(id, callback) {
    if(connection) {
        var sqlExists = 'SELECT * FROM ps_orders WHERE id_order = ' + connection.escape(id);
        connection.query(sqlExists, function(err, row) {
            /* If order ID exists */
            if(row != '') {
                var sql = 'DELETE FROM ps_orders WHERE id_order = ' + connection.escape(id);
                connection.query(sql, function(error, result) {
                    if(error) {
                        throw error;
                    }
                    else {
                        callback(null,{"msg" : "Pedido eliminado"});
                    }
                });
            }
            else {
                callback(null,{"msg" : "ERROR: No existe un pedido con id = " + id});
            }
        });
    }
}

module.exports = Order;