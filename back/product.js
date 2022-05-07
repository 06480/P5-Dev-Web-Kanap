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
    // document.getElementById("color1").textContent = product.colors[0]
    document.getElementById("colors").innerHTML = `
    <option id="color1" value="color">${product.colors[0]}</option>
    <option id="color2" value="color">${product.colors[1]}</option>
    <option id="color3" value="color">${product.colors[2]}</option>
    <option id="color4" value="color">${product.colors[3]}</option>
    
    `
}