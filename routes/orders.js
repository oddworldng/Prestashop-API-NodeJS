var Order = require('../models/orders');
var dateFormat = require('dateformat');
var randomstring = require("randomstring"); /* Used for generate orders reference */
var md5 = require('md5');
var uniqid = require('uniqid');
var rand = require('rand');

/* Orders routes */
module.exports = function(app) {

    var today = dateFormat("yyyy-mm-dd h:MM:ss");

    /* Insert a new order */
    app.get('/orders/post', function(req, res){
        res.render('orders', {
            title: 'Formulario para crear un nuevo pedido.',
            subtitle : 'Dar de alta un nuevo pedido (orden) en tu tienda Prestashop.',
            btnText : 'Crear pedido',
            action : '/orders/insert',
            host : req.headers.host,
            type : 'insert'
        });
    });

    /* Update an order */
    app.get('/orders/put', function(req, res){
        res.render('orders', {
            title: 'Formulario para actualizar un pedido existente.',
            subtitle : 'Actualizar pedido (orden) existente en tu tienda Prestashop.',
            btnText : 'Actualizar pedido',
            action : '/orders/update',
            host : req.headers.host,
            type : 'update'
        });
    });

    /* Delete an order */
    app.get('/orders/delete', function(req, res){
        res.render('orders', {
            title: 'Formulario para eliminar un pedido existente.',
            subtitle : 'Eliminar pedido (orden) existente en tu tienda Prestashop.',
            btnText : 'Eliminar pedido',
            action : '/orders/del',
            host : req.headers.host,
            type : 'delete'
        });
    });

    /* Get all orders */
    app.get('/orders', function(req, res){
        Order.getOrders(function(error, data) {
            res.json(200,data);
        });
    });

    /* Get an especific order */
    app.get('/orders/:id', function(req, res){
        var id = req.params.id;
        Order.getOrder(id, function(error, data){
            res.json(200, data);
        });
    });

    /* Insert an order from /orders/post form (POST) */
    app.post('/orders/insert', function(req, res){

        var reference = randomstring.generate({length : 9, charset : 'alphabetic', capitalization : 'uppercase'});

        var orderData = {
            id_order : null,
            reference : reference,
            id_shop_group : 1,
            id_shop : 1,
            id_carrier : 2,
            id_lang : 1,
            id_customer : req.body.id_customer,
            id_cart : 1,
            id_currency : 1,
            id_address_delivery : 4,
            id_address_invoice : 4,
            current_state : 1,
            secure_key : md5(uniqid(rand(), true)),
            payment : req.body.payment,
            conversion_rate : 1.000000,
            module : 'api_rest',
            recyclable : 0,
            gift : 0,
            gift_message : null,
            mobile_theme : 0,
            shipping_number : null,
            total_discounts : 0.000000,
            total_discounts_tax_incl : 0.000000,
            total_discounts_tax_excl : 0.000000,
            total_paid : req.body.total_paid,
            total_paid_tax_incl : req.body.total_paid,
            total_paid_tax_excl : req.body.total_paid,
            total_paid_real : 0.000000,
            total_products : req.body.total_paid,
            total_products_wt : req.body.total_paid,
            total_shipping : 2.000000,
            total_shipping_tax_incl : 2.000000,
            total_shipping_tax_excl : 2.000000,
            carrier_tax_rate : 0.000,
            total_wrapping : 0.000000,
            total_wrapping_tax_incl : 0.000000,
            total_wrapping_tax_excl : 0.000000,
            round_mode : 0,
            round_type : 0,
            invoice_number : 0,
            delivery_number : 0,
            invoice_date : '0000-00-00 00:00:00',
            delivery_date : '0000-00-00 00:00:00',
            valid : 0,
            date_add : today,
            date_upd : today
        }

        Order.insertOrder(orderData, function(error, data){
            if(data && data.insertId) {
                res.redirect("/orders/" + data.insertId);
            }
            else {
                res.json(500,{"msg" : "Error"});
            }
        });
    });

    /* Update an order from /order/put form (PUT) */
    app.post("/orders/update", function(req, res) {
        /* Store form data in an object */
        var orderData = {
            id_order: req.param('id_order'),
            id_customer: req.param('id_customer'),
            payment: req.param('payment'),
            total_paid: req.param('total_paid')
        }

        Order.updateOrder(orderData, function(error, data) {
            /* If updated id doesnt exists */
            if (data.insertId == 0) {
                res.json(500,{"msg" : "Error: no existe el cliente con ese ID."});
            }else {
                if(!error) {
                    res.redirect("/orders/" + data.insertId);
                }
                else {
                    res.json(500,{"msg" : "Error"});
                }
            }
        });
    });

    /* Delete an order from /orders/delete form (DELETE) */
    app.post("/orders/del", function(req, res) {
        /* ID from orders to delete */
        var id = req.param('id_order');
        Order.deleteOrder(id, function(error, data) {
            if(data && data.msg === "Pedido eliminado") {
                res.redirect("/orders/");
            }
            else {
                res.json(500,{"msg" : data.msg});
            }
        });
    });

}