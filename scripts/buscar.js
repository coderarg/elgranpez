//DOM y Variables
import { prodArray, cargarProductos } from "./index.js";

const buscarBotton = document.querySelector('#boton__buscar');
const buscarInput = document.querySelector('#barra__buscar');

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
}

buscarBotton.addEventListener('click', (e)=> {
  e.preventDefault();
  buscarProductos();
});

buscarInput.addEventListener('keyup', (e)=>{
  if(e.keyCode === 13){
    buscarProductos();
  }
})



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