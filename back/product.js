(async function() {
    const productId = getProductId();
    let product = await getProduct(productId);
    displayProduct(product);   
})()
function getProductId() {
    return new URL(location.href).searchParams.get("id");
}
// récuperation de l'API
function getProduct(productId){
    return fetch(`http://localhost:3000/api/products/${productId}`)
        .then(function(httpBodyResponse) {
            return httpBodyResponse.json();
        })
        .then(function(products){
            return products; 
        })
        .catch(function(error){
            alert(error);
        })
};
// affichage du produit
function displayProduct(product){
    document.getElementById("title").textContent = product.name;
    document.getElementById("price").textContent = product.price;
    document.getElementById("productImg").src = product.imageUrl;
    document.getElementById("description").textContent = product.description;
    let colorsOptions = '';
    for(let i = 0; i < product.colors.length; i++){
        colorsOptions += `<option id="color1" value="${product.colors[i]}">${product.colors[i]}</option>`;
    };
    document.getElementById("colors").innerHTML = colorsOptions;
    document.getElementById("item__content__addButton").innerHTML = `
    <button id="${product._id}">Ajouter au panier</button>`;
    addBastket(product);
};
// ajout d'un produit dans le local storage
function addBastket(product){
    let button = document.getElementById(product._id);
    button.addEventListener("click", () => {
        let productTable = JSON.parse(localStorage.getItem("product"));
        let options = document.getElementById("colors");
        let itemQuantity = document.getElementById('quantity');
        
        let colorChoice = Object.assign({}, product, {
            color: `${options.value}`,
            quantity: `${itemQuantity.value}`,
        });
        // ajout des objets quantity et color dans le produit du localStorage
        if(productTable == null){
            productTable = [];
            productTable.push(colorChoice);
            localStorage.setItem("product", JSON.stringify(productTable));
        } 
        // ajout d'un nouveau produit au localStorage
        else if (productTable != null){
             for (i = 0; i < productTable.length; i++){
                if(productTable[i]._id == product._id && productTable[i].color == options.value){
                 return(
                     productTable[i].quantity++,
                     localStorage.setItem("product",JSON.stringify(productTable)),
                     (productTable = JSON.parse(localStorage.getItem("product")))
                 );
                }
            }
            // ajout du même produit au panier mais avec une couleur différente
            for (i = 0; i < productTable.length; i++){
                if((productTable[i]._id === product._id && productTable[i].color !== options.value) || productTable[i]._id !== product._id){
                    return(
                        productTable.push(colorChoice),
                        localStorage.setItem("product",JSON.stringify(productTable)),
                        (productTable = JSON.parse(localStorage.getItem("product")))
                    );
                };
            };
        }
    });
    return (productTable = JSON.parse(localStorage.getItem("product")));
    
};
