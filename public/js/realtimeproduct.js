const socket = io();


// Cancelamos el envio del formulario (no hay un post a realtimeproducts)



const product = { title, description, price, thumbnails, code, stock, category };

// enviamos datos al servidor (a traves de Socket.io)
socket.emit('newProduct', product);