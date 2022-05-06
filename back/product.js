(async function() {
    const productId = getProductId()
    const product = await getProduct(productId)
    displayProduct(product)
})()

function getProductId() {
    return new URL(location.href).searchParams.get("id")
}

function getProduct(productId){
    return fetch('http://localhost:3000/api/products/${productId}')
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
    
}