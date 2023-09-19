//VARIABLES Y DOM
const filtrosBTN = document.querySelector('#filtrosBTN')
const filtros = document.querySelector('#filtros');
const categorias = document.querySelectorAll('.selectores__cat');
const togglemenuFiltros = document.querySelector('#togglemenu--filtros');
const headerFiltros = document.querySelector('#header--botonFiltros');
let filtrosOpen = false;
const productos = [];

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

fetch("../recursos/datos/productos.json")
  .then(res => res.json())
  .then(json => {
    productos = [...json]
    console.log(productos);
  })