const express = require('express');
const handlebars = require('express-handlebars')
const viewsRouter = require('./routes/views')
const { Server } = require('socket.io')

const cartsRouter = require('./routes/carts');
const productsRouter = require('./routes/products');

// const ProductManager = require('../ProductManager')

// const filenameProd = `${__dirname}/../../productos.json`
// const productsManager = new ProductManager(filenameProd)

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/../public`))

// configuramos handlebars 
app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter)

const httpServer = app.listen(8080, () => {
    console.log('Servidor listo!!');
});

// creando un servidor para ws
const wsServer = new Server(httpServer)
app.set('ws', wsServer)

wsServer.on('connection', (clientSocket) => {
    console.log(`Cliente conectado con id: ${clientSocket.id}`)

    clientSocket.on('newProduct', (product) => {

        // // 1) Agregarlo a ProductManager
        // productsManager.addProduct(
        //     product.title,
        //     product.description,
        //     +product.price,
        //     product.thumbnail,
        //     product.code,
        //     +product.stock,
        //     product.status,
        //     product.category)
        // // 2) Notificar al resto de los clientes (notificar con WS que se creó un producto nuevo)
        // wsServer.emit('newProduct', product)  // msje que se envia a los clientes del front que estan escuchando este evento

    })
})

