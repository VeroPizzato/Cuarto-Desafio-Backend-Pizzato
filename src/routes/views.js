const fs = require('fs')
const { Router } = require('express')

const router = Router()

const ProductManager = require('../ProductManager')

const filenameProd = `${__dirname}/../../productos.json`
const productsManager = new ProductManager(filenameProd)

router.get('/home', async (_, res) => {
    // leer el archivo products.json
    const products = await productsManager.getProducts()

    // renderizar home.handlebars y pasar los datos de los productos
    res.render('home', {
        title: 'Home',
        styles:['home.css'],
        products
    });
})

router.get('/realtimeproducts', async (_, res) => {
    const products = await productsManager.getProducts()

    res.render('realTimeProducts', {
        title: 'Productos en tiempo real',
        styles:['home.css'],
        products,
        useWS: true, // Establecemos useWS en verdadero
        scripts: [
            'realTimeProducts.js'
        ]        
    });
});

module.exports = router