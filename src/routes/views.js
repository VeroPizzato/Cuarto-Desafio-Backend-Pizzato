const fs = require('fs')
const { Router } = require('express')

const router = Router()

const ProductManager = require('../ProductManager')

const filenameProd = `${__dirname}/../../productos.json`
const productsManager = new ProductManager(filenameProd)

router.get('/home', async (_, res) => {
    try {
        // leer el archivo products.json
        const listadoProductos = await productsManager.getProducts()

        // renderizar home.handlebars y pasar los datos de los productos
        res.render('home', {
            title: 'Home',
            listadoProductos
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al cargar los productos' });
    }
})

router.get('/realtimeproducts', async (_, res) => {
    try {
        const listadoProductos = await productsManager.getProducts()

        res.render('realTimeProducts', {
            title: 'Productos en tiempo real',
            listadoProductos,
            useWS: true, // Establecemos useWS en verdadero
            scripts: [
                'realTimeProducts.js'
            ]
        });

    } catch (error) {
        res.status(500).json({ error: 'Error al cargar los productos' });
    }
});

module.exports = router