var connection = require('./connection');

/* Products object */
var Product = {};

/* Get all products */
Product.getProducts = function(callback) {
    if (connection) {
        connection.query('SELECT * FROM ps_product_lang ORDER BY id_product', function(error, rows) {
            if(error) {
                throw error;
            }
            else {
                callback(null, rows);
            }
        });
    }
}

/* Get product by Id */
Product.getProduct = function(id, callback) {
    if (connection) {
        var sql = 'SELECT * FROM ps_product_lang WHERE id_product = ' + connection.escape(id);
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

module.exports = Product;