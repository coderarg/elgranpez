//DOM y Variables
import {prodArray, cargarProductos} from "./index.js";

const buscarBotton = document.querySelector('#boton__buscar');
const buscarInput = document.querySelector('#barra__buscar');

const buscarProductos = (e) => {
  e.preventDefault();
  
  const palabrasInput = [];
  const productosDuplicados = [];

  palabrasInput.push(...buscarInput.value.toLowerCase().split(' '));

  palabrasInput.forEach(palabra => {
    prodArray.forEach(producto => {
      if(producto.titulo.includes(palabra)) {
        productosDuplicados.push(producto);
      }
    })
  })
  
  const productosSinDuplicar = productosDuplicados.reduce((sum, prod) => {
    if(!sum.find(item => item.titulo === prod.titulo)) sum.push(prod);
    return sum;
  }, [])
}


/* const searchProducts = (e) => {
    
  e.preventDefault()
  const duplicatedSearch = [];
  resultProducts.length = 0;
  searchedWords.length = 0;

  let words = document.querySelector('#barra__buscar').value.toLowerCase();
  searchedWords.push(...words.split(' '));

  searchedWords.forEach((element)=>{
      let result = productos.filter((prodItem) => {
          return prodItem.titulo.toLowerCase().includes(element);
      })

      duplicatedSearch.push(...result);

  })

  const filteredResult = duplicatedSearch.reduce((sum, element) => {
      if(!sum.find(prod => prod.titulo == element.titulo)) {
          sum.push(element);
      }
      return sum;
      }, 
  [])

  resultProducts.push(...filteredResult);

  loadProducts(resultProducts);

  categoryButtons.forEach(button => button.classList.remove("active__btn"))
  prodTitle.innerText = "Resultado de búsqueda";
  filterbar.style.top = "-500px";
  filterActive = true;
} */