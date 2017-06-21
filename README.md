# Prestashop API NodeJS

API REST for [Prestashop](https://www.prestashop.com/) with NodeJS.

## Description

This **API REST** is developed using **NodeJS** to access **Prestashop** basic information (customers, products and orders).

## Architecture

This **API REST** uses this technology:

* NodeJS: to create API REST infrastructure with Express.
* Jade: to create API REST templates.
* MariaDB: database accessed.
* Prestashop 1.7: client e-Commerce.

## Install and run

Follow this steps to install and run this project:

1. Install [NodeJS](http://nodejs.org/) in your server.
2. Download this project.
3. Execute ``npm start`` command into project folder.
4. Now a webservice is running on port 3000 (by default).

## Configure

To configure this API edit ``./models/connection.js`` file and type your database configuration data.

## Usage: GET

You can access to all fields using next syntax:

* Customers: ``http://localhost:3000/customers``
* Products: ``http://localhost:3000/products``
* Orders: ``http://localhost:3000/orders``

You can access to an specific field using syntax ``http://localhost:3000/<something>/:id``:

* Customer with id 1: ``http://localhost:3000/customers/1``
* Products with id 3: ``http://localhost:3000/products/3``
* Orders with id 7: ``http://localhost:3000/orders/7``

## Usage: POST (INSERT)

You can insert a new field using next forms:

* New customer: ``http://localhost:3000/customers/post``
* New product: ``http://localhost:3000/products/post``
* New order: ``http://localhost:3000/orders/post``

After insert a new field, you will be redirected to view all information about this customer, order or product. 

## Usage: PUT (UPDATE)

You can update a new field using next forms typing an id:

* Update customer: ``http://localhost:3000/customers/put``
* Update product: ``http://localhost:3000/products/put``
* Update order: ``http://localhost:3000/orders/put``

After update a new field, you will be redirected to view all information about this customer, order or product. 

## Usage: DELETE

You can delete a new field using next forms typing an id:

* Delete customer: ``http://localhost:3000/customers/delete``
* Delete product: ``http://localhost:3000/products/delete``
* Delete order: ``http://localhost:3000/orders/delete``

## Author
* **Andrés Nacimiento**. Computer Engineer at [University of La Laguna](https://www.ull.es/).