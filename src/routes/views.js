const fs = require('fs')
const { Router } = require('express')

const router = Router()

const ProductManager = require('../ProductManager')

const filenameProd = `${__dirname}/../../productos.json`
const productsManager = new ProductManager(filenameProd)

router.get('/home', async (_, res) => {
    try {
        const products = await productsManager.getProducts()

        res.render('home', {
            title: 'Home',
            styles: ['home.css'],
            products
        });
    } catch (error) {
        console.error('Error al al cargar los productos:', error);
    }
})

router.get('/realtimeproducts', async (_, res) => {
    try {
        const products = await productsManager.getProducts()

        res.render('realTimeProducts', {
            title: 'Productos en tiempo real',
            styles: ['home.css'],
            products,
            useWS: true,
            scripts: [
                'realTimeProducts.js'
            ]
        });
    } catch (error) {
        console.error('Error al al cargar los productos en tiempo real:', error);
    }
});

router.post('/realtimeproducts', async (req, res) => {
    try {              
        // Agregar el producto en el ProductManager
        const productAdded = await productsManager.addProduct(
            req.body.title, 
            req.body.description, 
            +req.body.price, 
            req.body.thumbnails, 
            req.body.code, 
            +req.body.stock, 
            req.body.status, 
            req.body.category);
        if (productAdded) {
            // Notificar a los clientes mediante WS que se agrego un producto nuevo             
            req.app.get('ws').emit('newProduct', productAdded)            
            res.status(201).json({ message: "Producto agregado correctamente" })
        }
        else {
            return res.status(500).json({ error: 'Error al agregar el producto' });
        }
    } catch (error) {
        console.error('Error al agregar el producto:', error);
    }
});

module.exports = router