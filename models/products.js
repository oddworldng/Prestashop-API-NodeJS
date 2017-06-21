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

/* Insert in ps_product table */
Product.insertProduct = function(productData, callback) {
    if (connection) {
        /* ps_product */
        connection.query('INSERT INTO ps_product SET ?', productData, function(error, result) {
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

/* Insert in ps_product_lang table */
Product.insertProductLang = function(productData, callback) {
    if (connection) {
        /* ps_product_lang */
        connection.query('INSERT INTO ps_product_lang SET ?', productData, function(error, result) {
            if(error) {
                throw error;
            }
            else {
                /* Return last inserted ID */
                callback(null,{"insertId" : productData.id_product});
            }
        });
    }
}

/* Insert in ps_product_shop table */
Product.insertProductShop = function(productData, callback) {
    if (connection) {
        /* ps_product_shop */
        connection.query('INSERT INTO ps_product_shop SET ?', productData, function(error, result) {
            if(error) {
                throw error;
            }
            else {
                /* Return last inserted ID */
                callback(null,{"insertId" : productData.id_product});
            }
        });
    }
}

/* Update a product */
Product.updateProduct = function(productData, callback) {
    if(connection) {

        connection.query('SELECT id_product FROM ps_product WHERE id_product = ' + connection.escape(productData.id_product), function(error, row) {
            if (row == ''){
                callback(null,{"insertId" : 0});
            }else{
                connection.query('UPDATE ps_product SET ? WHERE id_product = ' + parseInt(productData.id_product), productData, function(error, result) {
                    if(error) {
                        throw error;
                    }
                    else {
                        callback(null,{"insertId" : productData.id_product});
                    }
                });
            }
        });

    }
}

/* Update a product */
Product.deleteProduct = function(id, callback) {
    if(connection) {
        var sqlExists = 'SELECT * FROM ps_product WHERE id_product = ' + connection.escape(id);
        connection.query(sqlExists, function(err, row) {
            /* If customer ID exists */
            if(row != '') {
                var sql = 'DELETE FROM ps_product WHERE id_product = ' + connection.escape(id);
                connection.query(sql, function(error, result) {
                    if(error) {
                        throw error;
                    }
                    else {
                        var sql = 'DELETE FROM ps_product_lang WHERE id_product = ' + connection.escape(id);
                        connection.query(sql, function(error, result) {
                            if(error) {
                                throw error;
                            }
                            else {
                                var sql = 'DELETE FROM ps_product_shop WHERE id_product = ' + connection.escape(id);
                                connection.query(sql, function(error, result) {
                                    if(error) {
                                        throw error;
                                    }
                                    else {
                                        callback(null,{"msg" : "Producto eliminado"});
                                    }
                                });
                            }
                        });
                    }
                });
            }
            else {
                callback(null,{"msg" : "ERROR: No existe un producto con id = " + id});
            }
        });
    }
}

module.exports = Product;