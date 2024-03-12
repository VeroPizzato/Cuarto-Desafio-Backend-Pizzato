const express = require('express');
const handlebars = require('express-handlebars')
const viewsRouter = require('./routes/views')
const { Server } = require('socket.io')

const cartsRouter = require('./routes/carts');
const productsRouter = require('./routes/products');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/../public`))

// configuramos handlebars como nuestro template engine por defecto
app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter)

const httpServer = app.listen(8080, () => {
    console.log('Server Operativo en puerto 8080');
});

// creando un servidor para ws
const wsServer = new Server(httpServer)

wsServer.on('connection', (clientSocket) => {
    console.log(`Cliente conectado con id: ${clientSocket.id}`)

    clientSocket.on('saludo', data => {
        console.log(data)
    })
})

