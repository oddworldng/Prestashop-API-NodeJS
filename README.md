# Prestashop API NodeJS

API REST for [Prestashop](https://www.prestashop.com/) with NodeJS.

## Description

This **API REST** is developed using **NodeJS** to access **Prestashop** basic information (customers, products and orders).

## Install and run

Follow this steps to install and run this project:

1. Install [NodeJS](http://nodejs.org/) in your server.
2. Download this project.
3. Execute ``npm start`` command into project folder.
4. Now a webservice is running on port 3000 (by default).

## Configure

To configure this API edit ``./models/connection.js`` file and type your database configuration data.

## Usage

You can access to all fields using next syntax:

* Customers: ``http://localhost:3000/customers``
* Products: ``http://localhost:3000/products``
* Orders: ``http://localhost:3000/orders``

You can access to an specific field using syntax ``http://localhost:3000/<something>/:id``:

* Customer with id 1: ``http://localhost:3000/customers/1``
* Products with id 3: ``http://localhost:3000/products/3``
* Orders with id 7: ``http://localhost:3000/orders/7``


## Author
* **Andrés Nacimiento**. Computer Engineer at [University of La Laguna](https://www.ull.es/).