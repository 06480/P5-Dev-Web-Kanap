
let Basket = JSON.parse(localStorage.getItem('product'));

const displayBasket = async () => {
  console.log('salut');
  if (Basket) {
    await Basket;
    console.log('ok', Basket)
    
    cart__items.innerHTML = Basket.map((product) =>` 
    <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__img">
      <img src="${product.imageUrl}" id="productIMG" alt="Photographie d'un ${product.name}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2 id="title">${product.name}</h2>
        <p>${product.color}</p>
        <p>${product.price}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" change="change($event)" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" data-id="${product._id} data-color="${product.color}">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
    `)

    cart__price.innerHTML = Basket.map((product) => `
    <p>Total (<span id="totalQuantity">${product.quantity}</span> articles) : <span id="totalPrice">${product.quantity * product.price}</span> €</p>
    `)
    
   


  }

};

displayBasket();






//  function displayBasket(Basket){
//     console.log('okkkk', Basket)
   
//     document.getElementById("title").textContent = Basket.name;
//     document.getElementById("productIMG").src = Basket.imageUrl;
       

// };
// displayBasket(Basket);