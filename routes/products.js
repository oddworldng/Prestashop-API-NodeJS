var Product = require('../models/products');
var dateFormat = require('dateformat');
var md5 = require('md5');
var uniqid = require('uniqid');
var rand = require('rand');
var split = require('split');
var toLowerCase = require('toLowerCase');
var replace = require('replace');


/* Product routes */
module.exports = function(app) {

    var today = dateFormat("yyyy-mm-dd h:MM:ss");

    /* Insert a new product */
    app.get('/products/post', function(req, res){
        res.render('products', {
            title: 'Formulario para crear un nuevo producto.',
            subtitle : 'Dar de alta un nuevo producto en tu tienda Prestashop.',
            btnText : 'Crear producto',
            action : '/products/insert',
            type : 'insert'
        });
    });

    /* Update a product */
    app.get('/products/put', function(req, res){
        res.render('products', {
            title: 'Formulario para actualizar un producto existente.',
            subtitle : 'Actualizar producto existente en tu tienda Prestashop.',
            btnText : 'Actualizar producto',
            action : '/products/update',
            type : 'update'
        });
    });

    /* Delete a product */
    app.get('/products/delete', function(req, res){
        res.render('products', {
            title: 'Formulario para eliminar un producto existente.',
            subtitle : 'Eliminar producto existente en tu tienda Prestashop.',
            btnText : 'Eliminar producto',
            action : '/products/del',
            type : 'delete'
        });
    });

    /* Get all products */
    app.get('/products', function(req, res){
        Product.getProducts(function(error, data) {
            res.json(200,data);
        });
    });

    /* Get an especific product */
    app.get('/products/:id', function(req, res){
        var id = req.params.id;
        Product.getProduct(id,function(error, data){
            res.json(200, data);
        });
    });

    /* Insert a product from /products/post form (POST) */
    app.post('/products/insert', function(req, res){

        var insertedProductId = 0;
        /* data for ps_product table */
        var productData = {
            id_product : null,
            id_supplier : 1,
            id_manufacturer : 1,
            id_category_default : 1,
            id_shop_default : 1,
            id_tax_rules_group : 1,
            on_sale : 0,
            online_only : 0,
            ean13 : 0,
            isbn : null,
            upc : null,
            ecotax : 0.000000,
            quantity : 500,
            minimal_quantity : 1,
            price : req.body.price,
            wholesale_price : req.body.price,
            unity : null,
            unit_price_ratio : 0.000000,
            additional_shipping_cost : 0.00,
            reference : req.body.reference,
            supplier_reference : null,
            location : null,
            width : 0.000000,
            height : 0.000000,
            depth : 0.000000,
            weight : 0.000000,
            out_of_stock : 2,
            quantity_discount : 0,
            customizable : 0,
            uploadable_files : 0,
            text_fields : 0,
            active : 1,
            redirect_type : '404', // '','404','301-product','302-product','301-category','302-category'
            id_type_redirected : 0,
            available_for_order : 1,
            available_date : 0000-00-00,
            show_condition : 1,
            condition : 'new', // 'new','used','refurbished'
            show_price : 1,
            indexed : 1,
            visibility : 'both',
            cache_is_pack : 0,
            cache_has_attachments : 0,
            is_virtual : 0,
            cache_default_attribute : 1,
            date_add : today,
            date_upd : today,
            advanced_stock_management : 0,
            pack_stock_type : 3,
            state : 1
        }

        /* Insert in ps_product */
        Product.insertProduct(productData, function(error, data){
            if(data && data.insertId) {
                console.log(req.body.name);
                insertedProductId = data.insertId;
                /* data for ps_product_lang table */
                var productLangData = {
                    id_product : insertedProductId,
                    id_shop : 1,
                    id_lang : 1,
                    description : req.body.description,
                    description_short : req.body.description,
                    link_rewrite : req.body.link_rewrite,
                    meta_description : null,
                    meta_keywords : null,
                    meta_title : null,
                    name : req.body.name,
                    available_now : 'En stock',
                    available_later : null
                }

                /* Insert in ps_product_lang */
                Product.insertProductLang(productLangData, function(error, data){
                    if(data && data.insertId) {

                        /* data for ps_product_lang table */
                        var productShopData = {
                            id_product : insertedProductId,
                            id_shop : 1,
                            id_category_default : 1,
                            id_tax_rules_group : 1,
                            on_sale : 0,
                            online_only : 0,
                            ecotax : 0.000000,
                            minimal_quantity : 1,
                            price : req.body.price,
                            wholesale_price : req.body.price,
                            unity : null,
                            unit_price_ratio : 0.000000,
                            additional_shipping_cost : 0.00,
                            customizable : 0,
                            uploadable_files : 0,
                            text_fields : 0,
                            active : 1,
                            redirect_type : '404',
                            id_type_redirected : 0,
                            available_for_order : 1,
                            available_date : today,
                            show_condition : 1,
                            condition : 'new',
                            show_price : 1,
                            indexed : 1,
                            visibility : 'both',
                            cache_default_attribute : 1,
                            advanced_stock_management : 0,
                            date_add : today,
                            date_upd : today,
                            pack_stock_type : 3
                        }

                        /* Insert in ps_product_shop */
                        Product.insertProductShop(productShopData, function(error, data) {
                            if (data && data.insertId) {
                                res.redirect("/products/" + data.insertId);
                            } else {
                                res.json(500, {"msg": "Error al insertar datos en la tabla ps_product_shop"});
                            }
                        });

                    } else {
                        res.json(500,{"msg" : "Error al insertar datos en la tabla ps_product_lang"});
                    }
                });

            }
            else {
                res.json(500,{"msg" : "Error al insertar datos en la tabla ps_product"});
            }
        });
    });

    /* Update a product from /products/put form (PUT) */
    app.post("/products/update", function(req, res) {
        /* Store form data in an object */
        var productData = {
            id_product: req.param('id_product'),
            price: req.param('price'),
            reference: req.param('reference')
        }

        Product.updateProduct(productData, function(error, data) {
            /* If updated id doesnt exists */
            if (data.insertId == 0) {
                res.json(500,{"msg" : "Error: no existe el producto con ese ID."});
            }else {
                if(!error) {
                    res.redirect("/products/" + data.insertId);
                }
                else {
                    res.json(500,{"msg" : "Error"});
                }
            }
        });
    });

    /* Delete a product from /products/delete form (DELETE) */
    app.post("/products/del", function(req, res) {
        /* ID from product to delete */
        var id = req.param('id_product');
        Product.deleteProduct(id, function(error, data) {
            if(data && data.msg === "Producto eliminado") {
                res.redirect("/products/");
            }
            else {
                res.json(500,{"msg" : data.msg});
            }
        });
    });

}