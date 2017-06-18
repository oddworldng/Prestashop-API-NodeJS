var Order = require('../models/orders');

/* App routes */
module.exports = function(app) {

    /* Get all customers */
    app.get('/orders/', function (req, res) {
        Order.getOrders(function (error, data) {
            res.json(200, data);
        });
    });

    /* Get an especific customer */
    app.get('/orders/:id', function (req, res) {
        var id = req.params.id;
        Order.getOrder(id, function (error, data) {
            res.json(200, data);
        });
    });
}