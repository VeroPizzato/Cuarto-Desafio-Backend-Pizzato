const ProductManager = require('../../src/ProductManager')

const filenameProd = `${__dirname}/../../productos.json`
const productsManager = new ProductManager(filenameProd)

const socket = io();

socket.on('newProduct', (product) => {
  // Agregar el nuevo producto al HTML
  const container = document.getElementById('productsFeed');
  const newRow = container.querySelector('.row:last-child');

  // Verificar si existe una fila existente
  if (!newRow) {
    // Si no existe, crea una nueva fila
    newRow = document.createElement('div');
    newRow.classList.add('row');
    container.appendChild(newRow);
  }

  // Agregar el nuevo producto al final de la fila
  newRow.insertAdjacentHTML('beforeend', `   
      <div class="col-md-3 my-4">
        <div class="card alturaCaja img-product">
          <img src=${product.thumbnail} class="card-img-top" alt=${product.title} />
          <div class="card-body">
            <h6 class="card-text text-center">${product.title}</h6>
            <h3 class="text-center">$ ${product.price}</h3>
          </div>
        </div>
      </div>`
  );
});

document.addEventListener("DOMContentLoaded", function () {    
  const select = document.querySelectorAll(".btn-eliminarProd")
  select.forEach(btn => {
      btn.addEventListener("click", function () {
         console.log(btn.id)
         productsManager.deleteProduct(btn.id);    
      });
  });
})

