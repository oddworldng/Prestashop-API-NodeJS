var Product = require('../models/products');

/* App routes */
module.exports = function(app) {

    /* Get all products */
    app.get('/products/', function (req, res) {
        Product.getProducts(function (error, data) {
            res.json(200, data);
        });
    });

    /* Get an especific product */
    app.get('/products/:id', function (req, res) {
        var id = req.params.id;
        Product.getProduct(id, function (error, data) {
            res.json(200, data);
        });
    });
}