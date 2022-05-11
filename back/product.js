(async function() {
    const productId = getProductId();
    let product = await getProduct(productId);
    displayProduct(product);   
})()

// let product = [];

function getProductId() {
    return new URL(location.href).searchParams.get("id");
}

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


function addBastket(product){
    let button = document.getElementById(product._id);
    button.addEventListener("click", () => {
        let productTable = JSON.parse(localStorage.getItem("produit"));
        let options = document.getElementById("colors");
        let itemQuantity = document.getElementById('quantity');
        
        let colorChoice = Object.assign({}, product, {
            color: `${options.value}`,
            quantity: `${itemQuantity.value}`,
        });
        
        if(productTable == null){
            productTable = [];
            productTable.push(colorChoice);
            console.log('y', productTable);
            localStorage.setItem("product", JSON.stringify(productTable));
        } else if (productTable != null){
            for (i = 0; i < productTable.length; i++){
                console.log("test");
                if(productTable[i]._id == product._id && productTable[i].color == options.value){
                 return(
                     productTable[i].quantity++,
                     console.log("quantity++"),
                     localStorage.setItem("product",JSON.stringify(productTable)),
                     (productTable = JSON.parse(localStorage.getItem("product")))
                 );
                }
            }
        }
    });
    return (productTable = JSON.parse(localStorage.getItem("product")));
    
};




// addToCart.onclick = () =>{
//     localStorage.setItem("nom", price.value)
// }