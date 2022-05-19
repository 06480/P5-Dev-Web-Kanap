    (async function(){
        const products = await getProducts()
         for (product of products){
            displayProducts(product)
        }
    })()
// récuperation de l'API
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
// affichage des produits
    function displayProducts(product) {
        const templateElt = document.getElementById("templateProduct")
        const cloneElt = document.importNode(templateElt.content, true)

        cloneElt.getElementById("imgkanap").src = product.imageUrl
        cloneElt.getElementById("productName").textContent = product.name
        cloneElt.getElementById("productDescription").textContent = product.description
        cloneElt.getElementById("product_link").href += `?id=${product._id}`

        document.getElementById("limitedWidthBlock").appendChild(cloneElt)
      }
