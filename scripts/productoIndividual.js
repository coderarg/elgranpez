const idProductoSeleccionado = localStorage.getItem('producto');
const rootProdI = document.querySelector('#root__productoIndividual');
let prodArray;
const productos = [];


fetch("../datos/productos.json")
  .then(res => res.json())
  .then(json => {
    prodArray = [...json];
    prodArray.forEach(p => productos.push(p))
    cargarProductoIndividual();
  })


const cargarProductoIndividual = () => {
  const productoACargar = productos.find((prod) => prod.codigo_producto === idProductoSeleccionado);
  
  rootProdI.innerHTML = '';
  
  const h1Titulo = document.createElement('h1');
  h1Titulo.classList.add('productoI__titulo');
  h1Titulo.textContent = productoACargar.titulo;

  const prodIContainer = document.createElement('div');
  prodIContainer.classList.add('productoI__container');

  let img1;
  let img2;
  let img3;
  let img4;

  if(productoACargar.img1) {
    img1 = `<img src="../recursos/productos/${productoACargar.img1}" alt="${productoACargar.titulo}1" class="productoI__miniaturas--img">`
  }else{
    img1 = ``
  }
  if(productoACargar.img2) {
    img2 = `<img src="../recursos/productos/${productoACargar.img2}" alt="${productoACargar.titulo}2" class="productoI__miniaturas--img">`
  }else{
    img2 = ``
  }
  if(productoACargar.img3) {
    img3 = `<img src="../recursos/productos/${productoACargar.img3}" alt="${productoACargar.titulo}3" class="productoI__miniaturas--img">`
  }else{
    img3 = ``
  }
  if(productoACargar.img4) {
    img4 = `<img src="../recursos/productos/${productoACargar.img4}" alt="${productoACargar.titulo}4" class="productoI__miniaturas--img">`
  }else{
    img4 = ``
  }
  prodIContainer.innerHTML = `
    <div class="productoI__miniaturas">
      ${img1}
      ${img2}
      ${img3}
      ${img4}      
    </div>
    <div class="productoI__ampliado">
      <img class="productoI__ampliado--img" src="../recursos/productos/${productoACargar.img1}" alt="${productoACargar.titulo}1">
      <p class="productoI__descripcion">${productoACargar.descripcion}</p>
    </div>
  `;

  const prodBotones = document.createElement('div');
  prodBotones.classList.add('productoI__botones');

  prodBotones.innerHTML = `

    <div class="productoI__precio">
      <span id="prodI_precio">${numToPrice(productoACargar.precio)}</span>
    </div>
    <a class="productoI__whatsapp" href="https://wa.me/5491123980862?text=Consulta Web: ${productoACargar.titulo}" target="_blank">
      <p>CONSULTA WHATSAPP</p>
      <img class="productoI__whatsapp--img" src="../recursos/nav_menu/whatsapp-logo.png" alt="">
    </a>
  `;
  
  rootProdI.append(h1Titulo);
  rootProdI.append(prodIContainer);
  rootProdI.append(prodBotones);

  activarMiniaturas();

};


const numToPrice = (num) => {
  const f = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
  })
  return (f.format(num))
}

const activarMiniaturas = () => {
  const miniaturas = document.querySelectorAll('.productoI__miniaturas--img');

  miniaturas.forEach((mini) => {
    mini.addEventListener('click', ()=>{
      
    })
  })
}