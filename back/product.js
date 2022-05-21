(async function () {
  // Récupération de l'id du produit
  const productId = getProductId();
  // Récupération du produit
  const product = await getProduct(productId);
  displayProduct(product);
  // Ajout de la possibilité d'ajouter le produit au panier
  addProductToBastketOnButtonClick(product);
})();

//Fonction permettant de récupérer l'id du produit dans l'URL
function getProductId() {
  return new URL(location.href).searchParams.get('id');
}

// Fonction permettant de récupérer un produit à partir de son id depuis l'API
function getProduct(productId) {
  return fetch(`http://localhost:3000/api/products/${productId}`)
    .then((response) => response.json())
    .then((product) => product)
    .catch((error) => alert(error));
}
// Fonction permettant l'affichage d'un produit
function displayProduct(product) {
  //Affichage des caractéristiques du produit
  document.getElementById('title').textContent = product.name;
  document.getElementById('price').textContent = product.price;
  document.getElementById('productImg').src = product.imageUrl;
  document.getElementById('description').textContent = product.description;

  //Affichage des couleurs du produit
  let colorsOptions = '';
  for (let i = 0; i < product.colors.length; i++) {
    colorsOptions += `<option id="color1" value="${product.colors[i]}">${product.colors[i]}</option>`;
  }
  document.getElementById('colors').innerHTML = colorsOptions;

  //Ajout du produit au panier
  document.getElementById('item__content__addButton').innerHTML = `
    <button id="${product._id}">Ajouter au panier</button>`;
}

// Fonction permettant l'ajout d'un produit dans le local storage au click sur le bouton
function addProductToBastketOnButtonClick(product) {
  const button = document.getElementById(product._id);
  button.addEventListener('click', addProductToBasketEventFunction);

  function addProductToBasketEventFunction() {
    let localStorageProduct = JSON.parse(localStorage.getItem('product'));

    let colorOptions = document.getElementById('colors');
    let productQuantity = document.getElementById('quantity');

    let productSpecifications = Object.assign({}, product, {
      color: `${colorOptions.value}`,
      quantity: `${productQuantity.value}`,
    });

    // Ajout du produit dans le localStorage quand le panier est vide
    if (localStorageProduct === null) {
      localStorageProduct = [];
      localStorageProduct.push(productSpecifications);
      localStorage.setItem('product', JSON.stringify(localStorageProduct));
    }

    // Ajout du nouveau produit au localStorage quand le panier n'est pas vide
    else {
      for (i = 0; i < localStorageProduct.length; i++) {
        console.log(localStorageProduct[i]._id);
        if (
          localStorageProduct[i]._id === product._id &&
          localStorageProduct[i].color === colorOptions.value
        ) {
          // Ajout du produit lorsqu'il est déjà existant dans le panier avec la même couleur
          return (
            (localStorageProduct[i].quantity = (
              parseInt(localStorageProduct[i].quantity) +
              parseInt(productQuantity.value)
            ).toString()),
            localStorage.setItem(
              'product',
              JSON.stringify(localStorageProduct)
            ),
            (localStorageProduct = JSON.parse(localStorage.getItem('product')))
          );
        }
      }
      // Ajout du produit lorsqu'il est déjà existant dans le panier mais avec une couleur différente ou non existant dans le panier
      return (
        localStorageProduct.push(productSpecifications),
        localStorage.setItem('product', JSON.stringify(localStorageProduct)),
        (localStorageProduct = JSON.parse(localStorage.getItem('product')))
      );
    }
  }
}
