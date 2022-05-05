const img = document.getElementById('imgkanap')
const productName = document.getElementsByClassName('productName')
const productDescription = document.getElementsByClassName('productDescription')


let products = [];

 fetch("http://localhost:3000/api/products")
        .then(res => res.json())
         .then(data => {
             products = data;
             console.log(data);
            //  img.src = data[0].imageUrl;
            //  productName.innerHTML = data[0].name;
            //  productDescription.innerHTML = data[0].description;
        });
    


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
        
        
        
        
    



