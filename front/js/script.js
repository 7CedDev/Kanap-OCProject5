//Création avec le Javascript de la section cachée en HTML
// Relier l'element "a" à la section #items
fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => addProducts(data))

function addProducts(product) {
    const imageUrl = product[0].imageUrl

    const alt = document.createElement("a")
    alt.href = "http://localhost:3000/images/kanap01.jpeg"
    alt.text = "Photo d'un canapé bleu, deux places"
    const items = document.getElementById("items")
    items.appendChild(alt)
}

