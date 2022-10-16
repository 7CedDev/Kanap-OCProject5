// récupération de la chaine de requête dans l'URL
const queryString_url_id = window.location.search;
const urlSearchParams = new URLSearchParams(queryString_url_id);
const id = urlSearchParams.get("id");
if (id != null) {
  let itemPrice = 0;
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
// image, alt txt
function takeImage(imageUrl, altTxt) {
  const img = document.createElement("img");
  img.setAttribute("src", imageUrl);
  img.setAttribute("altTxt", altTxt);
  document.querySelector(".item__img").appendChild(img);
  return img;
}
// titre
function takeTitle(name) {
  const h1 = document.querySelector("#title");
  h1.textContent = name;
  return h1;
}
// prix
function takePrice(price) {
  const span = document.querySelector("#price");
  span.textContent = price;
  return span;
}
// description
function takeCartContent(description) {
  const p = document.querySelector("#description");
  p.textContent = description;
  return p;
}
// selection des couleurs et de la quantité
function takeColors(colors) {
  const select = document.querySelector("#colors");
  colors.forEach((colors) => {
    const option = document.createElement("option");
    option.value = colors;
    option.textContent = colors;
    select.appendChild(option);
    return select;
  });
}

// Ajout (grâce au clic ou clavier) dans le panier des valeures enregistrées
function handleClick() {
  const color = document.querySelector("#colors").value;
  const quantity = document.querySelector("#quantity").value;
  if (isOrderInvalid(color, quantity)) return;
  saveOrder(color, quantity);
  redirectToCart();
}

// ajout dans le panier au clic
const button = document.querySelector("#addToCart");
button.addEventListener("click", handleClick);

// tri par id et par couleur dans le local storage
function rangeBasket() {
  let basket = JSON.parse(localStorage.getItem("basket"));
  basket.sort((a, b) => parseInt(a.id) - parseInt(b.id));
  saveBasket(basket);
}

// détermination des données que l'on souhaite récupéré de l'objet
function saveOrder(color, quantity) {
  const key = `${id}-${color}`;
  let basket = localStorage.getItem(key);

  if (basket == null) {
    basket = {
      id: id,
      color: color,
      quantity: Number(quantity),
      altTxt: altText,
      imageUrl: imgUrl,
      name: articleName,
    };
  } else {
    basket = JSON.parse(basket);
    const newQuantity = Number(basket.quantity) + Number(quantity);
    basket = {
      id: id,
      color: color,
      quantity: newQuantity,
      altTxt: altText,
      imageUrl: imgUrl,
      name: articleName,
    };
  }
  localStorage.setItem(key, JSON.stringify(basket));
}

// vérifier qu'il n'y ai pas d'erreurs dans le panier
function isOrderInvalid(color, quantity) {
  if (color == null || color === "" || color == undefined) {
    alert("Please select a color before");
    return true;
  }
  if (quantity == null || quantity == 0 || quantity < 0 || quantity > 100) {
    alert("Please select a valid quantity, quantity must be between 1 and 100");
    return true;
  }
}
// lien vers le panier "cart.html"
function redirectToCart() {
  window.location.href = "cart.html";
}
