//VARIABLES Y DOM
const filtrosBTN = document.querySelector('#filtrosBTN')
const filtros = document.querySelector('#filtros');
const categorias = document.querySelectorAll('.selectores__cat');
const togglemenuFiltros = document.querySelector('#togglemenu--filtros');
const headerFiltros = document.querySelector('#header--botonFiltros');
let filtrosOpen = false;
const prodRoot = document.querySelector('#prod-root')
let productos;
const numeroResultados = document.querySelector('#numero-resultados');

filtrosBTN.addEventListener('click', (e) => {
  e.preventDefault();
  if (filtrosOpen) {
    filtros.style.top = '-1000px';
    filtrosOpen = false;
  } else {
    filtros.style.top = '4px';
    filtrosOpen = true;
  };
});

headerFiltros.addEventListener('click', (e) => {
  e.preventDefault();
  if (filtrosOpen) {
    filtros.style.top = '-1000px';
    filtrosOpen = false;
  } else {
    filtros.style.top = '4px';
    filtrosOpen = true;
  };
});

togglemenuFiltros.addEventListener('click', (e) => {
  e.preventDefault();
  toggleMenu.style.left = '100vw';
  if (filtrosOpen) {
    filtros.style.top = '-1000px';
    filtrosOpen = false;
  } else {
    filtros.style.top = '4px';
    filtrosOpen = true;
  };

});

categorias.forEach((cat) => {
  cat.addEventListener('click', (e) => {
    e.preventDefault();
  });
});


fetch("../datos/productos.json")
    .then(res => res.json())
    .then(json => {
        productos = [...json]
    
        cargarProductos(productos);
    })


const cargarProductos = (prods) => {
  prodRoot.innerHTML ='';

  numeroResultados.textContent = activeProds(prods).toString();


  
  prods.forEach( (element) => {

    
    if(element.activo === 1) {

      const div = document.createElement('div');
      div.classList.add('producto')
      
      div.innerHTML = `
      <div class="producto__img-container">
        <img src="./recursos/productos/${element.img1}" alt="${element.titulo}" class="producto__img">
      </div>
      <h3 class="producto__titulo">${element.titulo}</h3>
      <div class="producto__boton">
        <p class="producto__boton--precio">$ <span id="prod__precio">${element.precio.toString()}</span></p>
      </div>
      `;
      
      prodRoot.append(div);
    }
     
  })
}

const activeProds = (list) => {
  const active = list.filter( e => e.activo === 1)
  return active.length;
}

const numToPrice = () => {
  //posibles entradas: 1 / 12 / 123, 1234, 1234.23 / 1234.2 / 123 / 
  //pasarlo a string
  //reemplazar el punto . del decimal por una coma ,
  //si hay 1 número después de la coma, agregar un cero 0
  //si los enteros son más de mil, agregar un . en los miles

  // Posibles soluciones:
  //Separar decimales, y miles 
}