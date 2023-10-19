const idProductoSeleccionado = localStorage.getItem('producto');
console.log(idProductoSeleccionado);


const cargarProductoIndividual = () => {
  const productoACargar = prodArray.find((prod) => prod.codigo_producto === idElementoSeleccionado);



  `
      <h1 class="productoI__titulo">${productoACargar.titulo}</h1>
      <div class="productoI__container">
        <div class="productoI__miniaturas">
          <img src="../recursos/productos/bz-1.png" alt="taza-cafe1" class="productoI__miniaturas--img">
          <img src="../recursos/productos/bz-2.png" alt="taza-cafe1" class="productoI__miniaturas--img">
          <img src="../recursos/productos/bz-3.png" alt="taza-cafe1" class="productoI__miniaturas--img">
          <img src="../recursos/productos/bz-4.png" alt="taza-cafe1" class="productoI__miniaturas--img">
        </div>
        <div class="productoI__ampliado">
          <img class="productoI__ampliado--img" src="../recursos/productos/bz-1.png" alt="taza-cafe1">
          <p class="productoI__descripcion">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur sequi
            provident adipisci! Sit, nisi excepturi minus, error expedita ad illo nemo nobis sequi perferendis dolor
            repellendus? Voluptate qui iste earum.
            Pariatur eaque amet qui, architecto soluta numquam consectetur voluptates perferendis necessitatibus
            corporis quos quaerat eligendi, debitis velit ratione quas. Error temporibus deleniti quisquam ducimus
            sequi, nostrum laboriosam impedit modi. Possimus?
            Ipsam, nesciunt? Nulla fugiat officia nostrum. Laboriosam consectetur similique quasi sapiente consequatur
            voluptatum deleniti debitis impedit, ea perspiciatis, tempore nobis hic excepturi odio aperiam mollitia
            delectus aspernatur modi natus quidem.</p>
        </div>
      </div>
      <div class="productoI__botones">
        <div class="productoI__precio">
          $ <span id="prodI_precio">1000</span>
        </div>
        <div class="productoI__whatsapp">
          <p>CONSULTA WHATSAPP</p>
          <img class="productoI__whatsapp--img" src="../recursos/nav_menu/whatsapp-logo.png" alt="">
        </div>
      </div>
    `
};