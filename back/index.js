(async function () {
  //Récupération des produits
  const products = await getProducts();

  for (product of products) {
    //  Affichage des produits
    displayProduct(product);
  }
})();

// Fonction permettant la récuperation des produits en utilisant l'API
function getProducts() {
  return fetch('http://localhost:3000/api/products')
    .then((response) => response.json())
    .then((products) => products)
    .catch((error) => alert(error));
}

// Fonction permettant d'afficher un produit
function displayProduct(product) {
  const templateProduct = document.getElementById('templateProduct');
  const cloneProduct = document.importNode(templateProduct.content, true);

  cloneProduct.getElementById('imgkanap').src = product.imageUrl;
  cloneProduct.getElementById('productName').textContent = product.name;
  cloneProduct.getElementById('productDescription').textContent =
    product.description;
  cloneProduct.getElementById('product_link').href += `?id=${product._id}`;

  document.getElementById('limitedWidthBlock').appendChild(cloneProduct);
}
