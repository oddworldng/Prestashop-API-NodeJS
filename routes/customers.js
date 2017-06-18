var Customer = require('../models/customers');

/* App routes */
module.exports = function(app) {

    /* Get all customers */
    app.get('/customers/', function(req, res){
        Customer.getUsers(function(error, data) {
            res.json(200,data);
        });
    });

    /* Get an especific customer */
    app.get('/customers/:id', function(req, res){
        var id = req.params.id;
        Customer.getUser(id,function(error, data) {
            res.json(200, data);
        });
    });

}