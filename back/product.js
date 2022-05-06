(async function() {
    const productId = getProductId()
    console.log(productId)
    const product = await getProduct(productId)
    displayProduct(product)
})()

function getProductId() {
    return new URL(location.href).searchParams.get("id")
}

function getProduct(productId){
    return fetch(`http://localhost:3000/api/products/${productId}`)
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

function displayProduct(product){
    document.getElementById("title").textContent = product.name
    document.getElementById("price").textContent = product.price
    document.getElementById("productImg").src = product.imageUrl
    document.getElementById("description").textContent = product.description
    // document.getElementById("colors").textContent = product.colors
}