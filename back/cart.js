// Récupération du panier
let basket = JSON.parse(localStorage.getItem('product'));

// Fonction permettant l'affichage du panier
const displayBasket = (basket) => {
  if (basket) {
    cart__items.innerHTML = basket
      .map(
        (product, i) => ` 
    <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__img">
      <img src="${product.imageUrl}" id="productIMG" alt="Photographie d'un ${
          product.name
        }">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2 id="title">${product.name}</h2>
        <p>${product.color}</p>
        <p id="price-${i}">${product.price * product.quantity}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" id="id-input-test" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
            product.quantity
          }">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" data-id="${product._id}" data-color="${
          product.color
        }">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
    `
      )
      .join('');

    // Selection de la quantitée du produit
    let quantityInputs = document.querySelectorAll('.itemQuantity');

    basket.forEach((product, i) => {
      quantityInputs[i].addEventListener('input', updateProductQuantity);

      // Fonction permettant d'actualiser la quantité d'un produit depuis le panier
      function updateProductQuantity(e) {
        const price = document.getElementById(`price-${i}`);
        price.innerHTML = `<p id="price-${i}">${
          product.price * e.target.value
        }€</p>`;

        // Cas où l'utilisateur ajoute un ou plusieurs produits
        if (e.target.value > basket[i].quantity) {
          let newValuePositive = e.target.value - basket[i].quantity;
          console.log('+', newValuePositive);
          basket[i].quantity = e.target.value;
          for (j = 0; j < newValuePositive; j++) {
            localStorage.setItem('product', JSON.stringify(basket));
            basket = JSON.parse(localStorage.getItem('product'));
          }
        }

        // Cas où l'utilisateur retire un ou plusieurs produits
        if (e.target.value < basket[i].quantity) {
          let newValueNegative = basket[i].quantity - e.target.value;
          console.log('-', newValueNegative);
          basket[i].quantity = e.target.value;
          for (j = 0; j < newValueNegative; j++) {
            localStorage.setItem('product', JSON.stringify(basket));
            basket = JSON.parse(localStorage.getItem('product'));
          }
        }
        // Affichage du prix du panier initial
        basketPrice();
      }
    });
  }
};

// Affichage du panier
displayBasket(basket);

// Fonction permettant de supprimer un produit du panier
const deleteProductFromBasket = () => {
  let removeItems = document.querySelectorAll('.deleteItem');
  removeItems.forEach((supprimer) => {
    supprimer.addEventListener('click', () => {
      let numberOfProductsInBasket = basket.length;

      for (i = 0; i < numberOfProductsInBasket; i++) {
        // Cas où il n'y a qu'un seul type de produits dans le panier
        if (basket[i].quantity >= 1 && numberOfProductsInBasket == 1) {
          return (
            localStorage.removeItem('product'), (location.href = 'cart.html')
          );
        }
        // Cas où il y a plus d'un seul type de produits dans le panier
        if (
          basket[i].quantity >= 1 &&
          numberOfProductsInBasket != 1 &&
          basket[i]._id == supprimer.dataset.id &&
          basket[i].color == supprimer.dataset.color
        ) {
          basket.splice(i, 1);
          localStorage.setItem('product', JSON.stringify(basket));
          location.href = 'cart.html';
        }
      }
    });
  });
};

// Ajout des événements permettant la suppression d'un produit du panier
deleteProductFromBasket();

// Fonction permettant de calculer le prix du panier
const basketPrice = () => {
  let productPrice = [];
  let productQuantityTotal = [];

  let products = JSON.parse(localStorage.getItem('product'));

  products.forEach((product) => {
    productPrice.push(product.price * product.quantity);
    productQuantityTotal.push(product.quantity);
  });
  totalQuantity.textContent = `${eval(productQuantityTotal.join('+'))}`;
  totalPrice.textContent = `${eval(productPrice.join('+'))}`;
};

// Mise à jour du prix du panier
basketPrice();

// Définition des regex
const inputFirstName = document.getElementById('firstName');
const inputLastName = document.getElementById('lastName');
const regexNames = /^[a-zA-Z-\s]+$/;
const inputAddress = document.getElementById('address');
const inputCity = document.getElementById('city');
const regexAddress = /^[a-zA-Z0-9\s,'-]*$/;
const inputEmail = document.getElementById('email');
const regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

// Fonction qui controle la validité d'un champ du formulaire
function formInputControl(input, regex, errorId, errorMessage) {
  let error = document.getElementById(errorId);
  if (regex.test(input.value) === false) {
    error.innerHTML = errorMessage;
    return false;
  } else {
    error.innerHTML = '';
    return true;
  }
}

const btnSendForm = document.getElementById('order');

// Fonction permettant l'envoie et la vérification des données du formulaire
function sendForm(form) {
  form.action = 'cart.html';

  // Création de l'objet Contact du formulaire
  const formContactObject = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    address: document.getElementById('address').value,
    city: document.getElementById('city').value,
    email: document.getElementById('email').value,
  };

  if (
    formInputControl(
      inputFirstName,
      regexNames,
      'firstNameErrorMsg',
      'Ce champ peut comporter uniquement des lettres et des tirets.'
    ) &&
    formInputControl(
      inputLastName,
      regexNames,
      'lastNameErrorMsg',
      'Ce champ peut comporter uniquement des lettres et des tirets.'
    ) &&
    formInputControl(
      inputAddress,
      regexAddress,
      'addressErrorMsg',
      'Ce champ peut comporter uniquement des chiffres, des lettres et des tirets.'
    ) &&
    formInputControl(
      inputCity,
      regexAddress,
      'cityErrorMsg',
      'Ce champ peut comporter uniquement des chiffres, des lettres et des tirets.'
    ) &&
    formInputControl(
      inputEmail,
      regexEmail,
      'emailErrorMsg',
      "Cette adresse mail n'est pas valide"
    )
  ) {
    // Ajout des données dans le localStorage quand le formulaire est valide
    localStorage.setItem(
      'Formulaire de contact',
      JSON.stringify(formContactObject)
    );

    // Création du body de la requête POST
    const body = {
      contact: formContactObject,
      products: basket.map((product) => product._id),
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };

    // Envoie de la requête POST pôur récupérer l'id de la commande puis redirection vers la page de confirmation
    fetch('http://localhost:3000/api/products/order', requestOptions)
      .then((response) => response.json())
      .then((data) => (location.href = `confirmation.html?id=${data.orderId}`));

    return false;
  } else {
    // Alerte lorque le formulaire n'est pas valide
    alert('Veuillez bien remplir le formulaire');
    return false;
  }
}
