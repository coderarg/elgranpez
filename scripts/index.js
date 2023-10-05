import './toggleMenu.js';
import './filtros.js';

//DOM y Variables
const numeroResultados = document.querySelector('#numero-resultados');
const prodRoot = document.querySelector('#prod-root');
export let prodArray = [];


fetch("../datos/productos.json")
  .then(res => res.json())
  .then(json => {
    prodArray = [...json];
    cargarProductos(prodArray);
  })

export const cargarProductos = (prods) => {
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