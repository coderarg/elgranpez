//DOM y Variables
const wordsArray = [];

const buscarProductos = (e) => {
  e.preventDefault();

  wordsArray.length = 0;
  wordsArray.push(...document.querySelector('#barra__buscar').value.toLowerCase().split(' '));


 //Guardarlas en un array

 //buscar los productos 
 
 // eliminar duplicados
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