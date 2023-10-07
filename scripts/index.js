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

const filtrosBTN = document.querySelector('#filtrosBTN')
const filtros = document.querySelector('#filtros');
const categorias = document.querySelectorAll('.selectores__cat');
const togglemenuFiltros = document.querySelector('#togglemenu--filtros');
const headerFiltros = document.querySelector('#header--botonFiltros');
let filtrosOpen = false;


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
buscarBotton.addEventListener('click', (e)=> {
  e.preventDefault();
  buscarProductos();
});
buscarLupa.addEventListener('click', (e)=> {
  e.preventDefault();
  buscarProductos();
});

buscarInput.addEventListener('keyup', (e)=>{
  if(e.keyCode === 13){
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
      if(producto.titulo.toLowerCase().includes(palabra)) {
        productosDuplicados.push(producto);
      }
    })
  })
  
  const productosSinDuplicar = productosDuplicados.reduce((sum, prod) => {
    if(!sum.find(item => item.titulo === prod.titulo)) sum.push(prod);
    return sum;
  }, [])

  cargarProductos(productosSinDuplicar)
  if(prodArray.length == productosDuplicados.length) {
    document.querySelector('#filtro-resultado').innerText = "todos los productos";
  }else{
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
      <div class="producto__img-container">
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