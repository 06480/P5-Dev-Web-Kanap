let elt = index.getElementsById('items')

elt.innerHTML = "<ul><li>Elément 1</li><li>Elément 2</li></ul>";

export function APIwork(){
    fetch("http://localhost:3000/api/products")
    .then(function(res){
      if (res.ok){
        return res.json();
      }
    })
    .then (function(value){
      console.log(value);
    })
    .catch(function(err){})
}