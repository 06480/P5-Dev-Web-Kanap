// const img = document.getElementById('imgkanap')
// const productName = document.getElementsByClassName('productName')
// const productDescription = document.getElementsByClassName('productDescription')


// let products = [];

//  fetch("http://localhost:3000/api/products")
//         .then(res => res.json())
//          .then(data => {
//              products = data;
//              console.log(data);
            //  img.src = data[0].imageUrl;
            //  productName.innerHTML = data[0].name;
            //  productDescription.innerHTML = data[0].description;
        // });
    

// for (let data of products){
//     console.log(data);
// }

    // document.getElementById('items').innerHTML = products.map (
    //     (product) =>
    //     <a>
    //     <img src="${meuble.imageUrl}" id="imgKanap"></img>
        
    //     <h3 class="productName">${product.name}</h3>
    //     <p class="productDescription">${product.description}</p>
        
    //     </a>
    
    
    (async function(){
        const products = await getProducts()
         for (product of products){
            displayProducts(product)
        }
    })()
    
    function getProducts() {
       return fetch("http://localhost:3000/api/products")
        .then(function(httpBodyResponse) {
            return httpBodyResponse.json()
        })
        .then(function(products){
            return products
        })
        .catch(function(error){
            alert(error)
        })
    }
    
    function displayProducts(product) {
        const templateElt = document.getElementById("templateProduct")
        const cloneElt = document.importNode(templateElt.content, true)

        cloneElt.getElementById("imgkanap").src = product.imageUrl
        cloneElt.getElementById("productName").textContent = product.name
        cloneElt.getElementById("productDescription").textContent = product.description
        cloneElt.getElementById("product_link").href += `?id=${product._id}`

        document.getElementById("limitedWidthBlock").appendChild(cloneElt)
      }
