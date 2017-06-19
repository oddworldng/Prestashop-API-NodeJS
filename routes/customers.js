var Customer = require('../models/customers');

/* App routes */
module.exports = function(app) {

    /* Insert a new customer */
    app.get('/customers/new', function(req, res){
        res.render('newc', { title: 'Formulario para crear un nuevo recurso.' });
    });

    /* Get all customers */
    app.get('/customers/', function(req, res){
        Customer.getCustomers(function(error, data) {
            res.json(200,data);
        });
    });

    /* Get an especific customer */
    app.get('/customers/:id', function(req, res){
        var id = req.params.id;
        Customer.getCustomer(id,function(error, data) {
            res.json(200, data);
        });
    });
}