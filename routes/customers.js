var Customer = require('../models/customers');
var dateFormat = require('dateformat');
var md5 = require('md5');
var uniqid = require('uniqid');
var rand = require('rand');

/* App routes */
module.exports = function(app) {

    var today = dateFormat("yyyy-mm-dd h:MM:ss");

    /* Insert a new customer */
    app.get('/customers/post', function(req, res){
        res.render('customers', {
            title: 'Formulario para crear un nuevo cliente.',
            subtitle : 'Dar de alta un nuevo cliente en tu tienda Prestashop.',
            btnText : 'Crear cliente',
            action : '/customers/insert',
            type : 'insert'
        });
    });

    /* Update a customer */
    app.get('/customers/put', function(req, res){
        res.render('customers', {
            title: 'Formulario para actualizar un cliente existente.',
            subtitle : 'Actualizar cliente existente en tu tienda Prestashop.',
            btnText : 'Actualizar cliente',
            action : '/customers/update',
            type : 'update'
        });
    });

    /* Delete a customer */
    app.get('/customers/delete', function(req, res){
        res.render('customers', {
            title: 'Formulario para eliminar un cliente existente.',
            subtitle : 'Eliminar cliente existente en tu tienda Prestashop.',
            btnText : 'Eliminar cliente',
            action : '/customers/del',
            type : 'delete'
        });
    });

    /* Get all customers */
    app.get('/customers', function(req, res){
        Customer.getCustomers(function(error, data) {
            res.json(200,data);
        });
    });

    /* Get an especific customer */
    app.get('/customers/:id', function(req, res){
        var id = req.params.id;
        Customer.getCustomer(id,function(error, data){
            res.json(200, data);
        });
    });

    /* Insert a customer from /customers/post form (POST) */
    app.post('/customers/insert', function(req, res){

        var customerData = {
            id_customer : null,
            id_shop_group : 1,
            id_shop : 1,
            id_gender : 1,
            id_default_group : 3,
            id_lang : 1,
            id_risk : 0,
            company : null,
            siret : null,
            ape : null,
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email,
            passwd : md5(req.body.passwd),
            last_passwd_gen : today,
            birthday : req.body.birthday,
            newsletter : 1,
            ip_registration_newsletter : null,
            newsletter_date_add : today,
            optin : 1,
            website : null,
            outstanding_allow_amount : 0.000000,
            show_public_prices : 0,
            max_payment_days : 0,
            secure_key : md5(uniqid(rand(), true)),
            note : null,
            active : 1,
            is_guest : 0,
            deleted : 0,
            date_add : today,
            date_upd : today,
            reset_password_token : null,
            reset_password_validity : '0000-00-00 00:00:00'
        }

        Customer.insertCustomer(customerData, function(error, data){
            if(data && data.insertId) {
                res.redirect("/customers/" + data.insertId);
            }
            else {
                res.json(500,{"msg":"Error"});
            }
        });
    });

    /* Update a customer from /customers/put form (PUT) */
    app.post("/customers/update", function(req, res) {
        /* Store form data in an object */
        var customerData = {
            id_customer: req.param('id_customer'),
            firstname: req.param('firstname'),
            lastname: req.param('lastname'),
            email: req.param('email')
        }

        Customer.updateCustomer(customerData, function(error, data) {
            /* If updated id doesnt exists */
            if (data.insertId == 0) {
                res.json(500,{"msg" : "Error: no existe el cliente con ese ID."});
            }else {
                if(!error) {
                    res.redirect("/customers/" + data.insertId);
                }
                else {
                    res.json(500,{"msg" : "Error"});
                }
            }
        });
    });

    /* Delete a customer from /customers/delete form (DELETE) */
    app.post("/customers/del", function(req, res) {
        /* ID from customer to delete */
        var id = req.param('id_customer');
        Customer.deleteCustomer(id, function(error, data) {
            if(data && data.msg === "Cliente eliminado") {
                res.redirect("/customers/");
            }
            else {
                res.json(500,{"msg" : data.msg});
            }
        });
    });

}