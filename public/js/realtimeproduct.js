const socket = io();

socket.on('newProduct', (product) => {
    // Agregar el nuevo producto al HTML
    const container = document.getElementById('productsFeed');
    container.innerHTML += `
    <div class="card alturaCaja img-product">
        <img src=${product.thumbnail} class="card-img-top" alt=${product.title} />
        <div class="card-body">
          <h6 class="card-text text-center">${product.title}</h6>
          <h3 class="text-center">$ ${product.price}</h3>
        </div>
      </div>`
});

