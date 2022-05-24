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

    let productLocal = {
      id: product._id,
      nom: product.name,
      couleur: `${colorOptions.value}`,
      quantite: `${productQuantity.value}`,
      image: product.imageUrl,
    };

    // Ajout du produit dans le localStorage quand le panier est vide
    if (localStorageProduct === null) {
      localStorage.setItem('product', JSON.stringify([productLocal]));
    }

    // Ajout du nouveau produit au localStorage quand le panier n'est pas vide
    else {
      console.log(localStorageProduct);
      for (i = 0; i < localStorageProduct.length; i++) {
        if (
          localStorageProduct[i].id === product._id &&
          localStorageProduct[i].couleur === colorOptions.value
        ) {
          // Ajout du produit lorsqu'il est déjà existant dans le panier avec la même couleur
          return (
            (localStorageProduct[i].quantite = (
              parseInt(localStorageProduct[i].quantite) +
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
        localStorageProduct.push(productLocal),
        localStorage.setItem('product', JSON.stringify(localStorageProduct)),
        (localStorageProduct = JSON.parse(localStorage.getItem('product')))
      );
    }
  }
}
