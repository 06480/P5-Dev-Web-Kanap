// const { json } = require("express");

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
          // let testPLUS = Basket[i].quantity++;
          // console.log('ok', Basket[i].quantity++)
    
          Basket[i].quantity++;
          localStorage.setItem("product",JSON.stringify(Basket));
          (Basket = JSON.parse(localStorage.getItem("product"))); 
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

const basketPrice = async () => {

  let productPrice = [];
  let productQuantityTotal = [];

  let newTable = JSON.parse(localStorage.getItem("product"));
  // let displayQuantity = document.querySelectorAll(".itemQuantity")
  
  newTable.forEach((product) => {
    productPrice.push(product.price * product.quantity);
    productQuantityTotal.push(product.quantity);
  });
  totalQuantity.textContent = `${eval(productQuantityTotal.join("+"))}`
  totalPrice.textContent = `${eval(productPrice.join("+"))}`
};

basketPrice();




// vérification des données du formulaire
let form = document.getElementById('Form');

form.addEventListener('submit', () => {
  let input = document.getElementById('firstName');
  let regex = /^[a-zA-Z-\s]+$/;

  
  
  // if(input.value == ""){
    
  //   let firstNameError = documment.getElementById('firstNameErrorMsg');
  //   firstNameError.innerHTML = "Ce champ est requis.";
  //   firstNameError.style.color = 'red';
  //   e.preventDefault();

  // } else if (regex.test(input.value) == false) {

  //   let firstNameError = documment.getElementById('firstNameErrorMsg');
  //   firstNameError.innerHTML = "Le nom doit comporter uniquement des lettres et des tirets.";
  //   firstNameError.style.color = 'red';
  //   e.preventDefault();
  // }

});

//stocker les saisies 
let btnSendForm = document.getElementById("order")

btnSendForm.addEventListener("click", () => {
localStorage.setItem("Prénom", document.getElementById("firstname").value);

});
