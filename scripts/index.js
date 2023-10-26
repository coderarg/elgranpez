/*******************************************
              DOM y Variables 
*******************************************/
import './toggleMenu.js';
const buscarBotton = document.querySelector('#boton__buscar');
const buscarInput = document.querySelector('#barra__buscar');
const buscarLupa = document.querySelector('.buscar__logo');

const numeroResultados = document.querySelector('#numero-resultados');
const prodRoot = document.querySelector('#prod-root');
let prodArray = [];
const productos = [];

const filtrosBTN = document.querySelector('#filtrosBTN')
const filtros = document.querySelector('#filtros');
const categorias = document.querySelectorAll('.selectores__cat');
const togglemenuFiltros = document.querySelector('#togglemenu--filtros');
const headerFiltros = document.querySelector('#header--botonFiltros');
let filtrosOpen = false;

let botonesProductos;
let idElementoSeleccionado;

/*******************************************
              DOM y Variables 
*******************************************/
fetch("../datos/productos.json")
  .then(res => res.json())
  .then(json => {
    prodArray = [...json];
    cargarProductos(prodArray);
  })



/*******************************************
                  Eventos
*******************************************/
buscarBotton.addEventListener('click', (e) => {
  e.preventDefault();
  buscarProductos();
});
buscarLupa.addEventListener('click', (e) => {
  e.preventDefault();
  buscarProductos();
});

buscarInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    buscarProductos();
  }
})

filtrosBTN.addEventListener('click', (e) => {
  e.preventDefault();
  filtrosOpen ? filtros.style.top = '-1000px' : filtros.style.top = '4px';
  filtrosOpen = !filtrosOpen;
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
/*******************************************
              Funciones
*******************************************/
const buscarProductos = () => {

  const palabrasInput = [];
  const productosDuplicados = [];

  palabrasInput.push(...buscarInput.value.toLowerCase().split(' '));

  palabrasInput.forEach(palabra => {
    prodArray.forEach(producto => {
      if (producto.titulo.toLowerCase().includes(palabra)) {
        productosDuplicados.push(producto);
      }
    })
  })

  const productosSinDuplicar = productosDuplicados.reduce((sum, prod) => {
    if (!sum.find(item => item.titulo === prod.titulo)) sum.push(prod);
    return sum;
  }, [])

  cargarProductos(productosSinDuplicar)
  if (prodArray.length == productosDuplicados.length) {
    document.querySelector('#filtro-resultado').innerText = "todos los productos";
  } else {
    document.querySelector('#filtro-resultado').innerText = "resultado de búsqueda";
  }

}

const cargarProductos = (prods) => {
  prodRoot.innerHTML = '';

  numeroResultados.textContent = activeProds(prods).toString();

  prods.forEach((element) => {


    if (element.activo === 1) {

      const div = document.createElement('div');
      div.classList.add('producto')

      div.innerHTML = `
      <div class="producto__img-container" id="${element.codigo_producto}">
        <img src="./recursos/productos/${element.img1}" alt="${element.titulo}" class="producto__img">
      </div>
      <h3 class="producto__titulo">${element.titulo}</h3>
      <div class="producto__boton">
        <p class="producto__boton--precio"><span id="prod__precio">${numToPrice(element.precio)}</span></p>
      </div>
      `;

      prodRoot.append(div);
    }

  })

  cargarBotonesProductos()
}

const activeProds = (list) => {
  const active = list.filter(e => e.activo === 1)
  return active.length;
}

const numToPrice = (num) => {
  const f = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
  })
  return (f.format(num))
}

const cargarBotonesProductos = () => {
  botonesProductos = document.querySelectorAll('.producto__img-container');

  botonesProductos.forEach((element) => {
    element.addEventListener('click', (e) => {
      idElementoSeleccionado = (e.target.tagName === "IMG") ? e.target.parentNode.id : e.target.id;
      localStorage.setItem('producto', idElementoSeleccionado);
      //const nuevaPantalla = window.open();
      window.location = './html/producto.html';
    })
  })
}



// Encontrar los productos y guardarlos en una variable
// Identificar cada producto cuando es clickeado
// Buscar el producto en la base de datos
// Abrir una nueva pestaña de navegador
// Cargar en esa nueva pestaña el contenido del producto
// Eliminar el id donde se renderiza el producto para no modificarlo cuando se clickea otro producto
