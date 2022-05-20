


let Basket = JSON.parse(localStorage.getItem('product'));



const displayBasket = async () => {
  if (Basket) {
    await Basket;

    cart__items.innerHTML = Basket.map((product, i) =>` 
    <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__img">
      <img src="${product.imageUrl}" id="productIMG" alt="Photographie d'un ${product.name}">
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
          <input type="number" id="id-input-test" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" data-id="${product._id}" data-color="${product.color}">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
    `).join("");

// selection de la quantitée du produit

    let inputs = document.querySelectorAll(".itemQuantity");

    Basket.forEach((product, i)=>{
      inputs[i].addEventListener('input', updateValue);
      function updateValue(e) {
          const price = document.getElementById(`price-${i}`);
          price.innerHTML = `<p id="price-${i}">${product.price * e.target.value}€</p>`;
        if(e.target.value > Basket[i].quantity){
          let newValuePositive = e.target.value - Basket[i].quantity;
          console.log("+", newValuePositive);
          Basket[i].quantity = e.target.value;
          for(j = 0; j < newValuePositive; j++){
            localStorage.setItem("product",JSON.stringify(Basket));
            (Basket = JSON.parse(localStorage.getItem("product"))); 
          }
        }
        if(e.target.value < Basket[i].quantity){
          let newValueNegative = Basket[i].quantity - e.target.value;
          console.log("-", newValueNegative);
          Basket[i].quantity = e.target.value;
          for(j = 0; j < newValueNegative; j++){
            localStorage.setItem("product",JSON.stringify(Basket));
            (Basket = JSON.parse(localStorage.getItem("product")));
          }
        } 
        basketPrice();
      }
    })
  }

 
};

displayBasket();


const deleteItems = async (displayBasket) => {
  await displayBasket;
  let remove = document.querySelectorAll(".deleteItem");
  remove.forEach((supprimer) => { 
    supprimer.addEventListener("click",() => {
      

      let totalBasket = Basket.length;

      for(i = 0; i < totalBasket; i++){
        if(Basket[i].quantity >= 1 && totalBasket == 1 ){
          return (
           localStorage.removeItem("product"),
            (location.href = "cart.html")
           );
        };
        if(Basket[i].quantity >= 1 && totalBasket != 1 
          && Basket[i]._id == supprimer.dataset.id 
          && Basket[i].color == supprimer.dataset.color){
          Basket.splice([i], 1);
          localStorage.setItem("product", JSON.stringify(Basket));
          location.href = "cart.html";
        }
        // if (Basket[i]._id == supprimer.dataset.id && Basket[i].color == supprimer.dataset.color){
        //   return (
        //     Basket[i].quantity++,
        //     localStorage.setItem("product", JSON.stringify(Basket))
        //     );
        // }
      };
    });
  });
};

deleteItems();

// calcul du panier

const basketPrice = () => {

  let productPrice = [];
  let productQuantityTotal = [];

  let newTable = JSON.parse(localStorage.getItem("product"));
  
  newTable.forEach((product) => {
    productPrice.push(product.price * product.quantity);
    productQuantityTotal.push(product.quantity);
  });
  totalQuantity.textContent = `${eval(productQuantityTotal.join("+"))}`
  totalPrice.textContent = `${eval(productPrice.join("+"))}`
};

basketPrice();

//récupérer et stocker les saisies du formulaire dans le localStorage
const btnSendForm = document.getElementById("order")

btnSendForm.addEventListener("click", function(e) {
  
//création de l'objet formulaire
  const formValues = {
    Prénom: document.getElementById("firstName").value,
    Nom: document.getElementById("lastName").value,
    Adresse: document.getElementById("address").value,
    Ville: document.getElementById("city").value,
    Email: document.getElementById("email").value,
}
  const inputFirstName = document.getElementById('firstName');
  const inputLastName = document.getElementById('lastName');
  const regexNames = /^[a-zA-Z-\s]+$/;
  const inputAddress = document.getElementById('address');
  const inputCity = document.getElementById('city');
  const regexAddress = /^[a-zA-Z0-9-\s]+$/;
  const inputEmail = document.getElementById('email');
  const regexEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  function firstNameControl(){
  if(regexNames.test(inputFirstName.value) == false){
    let firstNameError = document.getElementById('firstNameErrorMsg');
    firstNameError.innerHTML = "Ce champ peut comporter uniquement des lettres et des tirets.";
    e.preventDefault;
    }
  else{
    console.log('ok');
    return true;
    };
  };
  function lastNameControl(){
  if(regexNames.test(inputLastName.value) == false){
    let lastNameError = document.getElementById('lastNameErrorMsg');
    lastNameError.innerHTML = "Ce champ peut comporter uniquement des lettres et des tirets.";
    e.preventDefault;
    }
  else{
    return true
    };
  };
  function addressControl(){
  if(regexAddress.test(inputAddress.value) == false){
    let addressError = document.getElementById('addressErrorMsg');
    addressError.innerHTML = "Ce champ peut comporter uniquement des chiffres, des lettres et des tirets.";
    e.preventDefault;
    }
  else{
    return true
    };
  };
  function cityControl(){
  if(regexAddress.test(inputCity.value) == false){
   let cityError = document.getElementById('cityErrorMsg');
   cityError.innerHTML = "Ce champ peut comporter uniquement des chiffres, des lettres et des tirets.";
   e.preventDefault;
    }
  else{
    return true
   };
  };
  function emailControl(){
  if(regexEmail.test(inputEmail.value) == false){
   let emailError = document.getElementById('emailErrorMsg');
    emailError.innerHTML = "Cette adresse mail n'est pas valide";
   e.preventDefault;
    }
  else{
    return true
    };
  };


if(firstNameControl() && lastNameControl() && addressControl() && cityControl() && emailControl() == true){
localStorage.setItem("Formulaire de contact", JSON.stringify(formValues));
}
else{
  alert("Veuillez bien remplir le formulaire")
}

//création de l'objet (produits+formulaire) à envoyer au serveur
const sendToServer = {
  Basket,
  formValues,
}
console.log('ok',sendToServer)
// localStorage.setItem('Fiche client', JSON.stringify(sendToServer));
});

// vérification des données du formulaire
// let form = document.getElementById('Form');

// form.addEventListener('submit', function(e) {
//   let inputFirstName = document.getElementById('firstName');
//   let regex = /^[a-zA-Z-\s]+$/;
//   console.log(inputFirstName)
//   if(regex.test(inputFirstName.value) == false){
//     let firstNameError = documment.getElementById('firstNameErrorMsg');
//     firstNameError.innerHTML = "Le nom doit comporter uniquement des lettres et des tirets.";
//     e.preventDefault;
//   }

// });




