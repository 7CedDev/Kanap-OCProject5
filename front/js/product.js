// récupération de la chaine de requête dans l'URL
const queryString_url_id = window.location.search;
const urlSearchParams = new URLSearchParams(queryString_url_id);
const id = urlSearchParams.get("id")
if (id != null) {
    let itemPrice = 0
    let imgUrl, altText, articleName;
}

// récupération de l'objet
fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((res) => takeInfos(res));

// récupération des éléments de l'objet 
function takeInfos(kanap) {
    const { imageUrl, altTxt, name, price, description, colors } = kanap;
    itemPrice = price;
    imgUrl = imageUrl;
    altText = altTxt;
    articleName = name;
    takeImage(imageUrl, altTxt);
    takeTitle(name);
    takePrice(price);
    takeCartContent(description);
    takeColors(colors);
}

// fonctions définit à chaque éléments

function takeImage(imageUrl, altTxt) {
    const img = document.createElement("img")
    img.setAttribute("src", imageUrl);
    img.setAttribute("altTxt", altTxt);
    document.querySelector(".item__img").appendChild(img);
    return img
}

function takeTitle(name) {
    const h1 = document.querySelector("#title")
    h1.textContent = name;
    return h1;
}

function takePrice(price) {
    const span = document.querySelector("#price");
    span.innerHTML = price;
    return span;
}

function takeCartContent(description) {
    const p = document.querySelector("#description");
    p.textContent = description;
    return p;
}

function takeColors(colors) {
    const select = document.querySelector("#colors");
    colors.forEach((colors) => {
        const option = document.createElement("option");
        option.value = colors;
        option.textContent = colors;
        select.appendChild(option);
        return select;
    })
}

// création du panier avec les valeurs recherchés
const button = document.querySelector("#addToCart")
button.addEventListener("click", (e) => {
    const color = document.querySelector("#colors").value;
    const quantity = document.querySelector("#quantity").value;
    saveCart(color, quantity);
    redirectToCart();
})

// détermination des données que l'on souhaite récupéré de l'objet 
function saveCart(color, quantity) {
    const key = `${id}-${color}`
    const basket = {
        id: id,
        color: color,
        quantity: Number(quantity),
        price: itemPrice,
        altTxt: altText,
        imageUrl: imgUrl,
        name: articleName
    }
    localStorage.setItem(key, JSON.stringify(basket))
}
// lien vers le panier "cart.html" 
function redirectToCart() {
    window.location.href = "cart.html"
}