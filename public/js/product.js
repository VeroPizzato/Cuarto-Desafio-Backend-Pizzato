// levantamos nuestro socket del lado del cliente
const socket = io();

socket.emit('saludo', 'msje del browser al servidor')