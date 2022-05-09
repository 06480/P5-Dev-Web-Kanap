
let Basket = JSON.parse(localStorage.getItem("product"));
console.log('ok',Basket);

 function displayBasket(Basket){
   if(Basket !== null){
    document.getElementById("title").textContent = Basket.name;
    document.getElementById("productIMG").src = Basket.imageUrl;
   }
       

};
displayBasket(Basket);