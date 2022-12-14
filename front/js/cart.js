// affiche sous forme de tableau le contenu du panier
const cart = [];

let products = [];
retrieveItemsFromCache();

// fonction permettant de récupérer les éléments pour les ajouter au panier
async function retrieveItemsFromCache() {
  products = await getAllProducts();
  const numberOfItems = localStorage.length;
  for (let i = 0; i < numberOfItems; i++) {
    const item = localStorage.getItem(localStorage.key(i)) || "";
    const itemObject = JSON.parse(item);
    const price = getPrice(itemObject.id);
    itemObject.price = price;
    cart.push(itemObject);
    displayItem(itemObject);
  }
}
// récupération de tous les produits
function getAllProducts() {
  return fetch("http://localhost:3000/api/products")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      return value;
    })
    .catch(function () {
      alert("Error, an object missing!");
      // Une erreur est survenue
    });
}
// récupération du prix hors du localStorage
function getPrice(productId) {
  const product = products.filter((product) => {
    return product._id == productId;
  });
  return product[0].price;
}
// ---------------------------------Fonction permettant d'afficher les éléments et de les modifier------------------------------------

function displayItem(item) {
  const article = takeArticle(item);
  const div = takeImage(item);
  article.appendChild(div);
  const cartItemContent = takeCartContent(item);
  article.appendChild(cartItemContent);
  displayArticle(article);
  displayTotalQuantity();
  displayTotalPrice(item);
}

function displayTotalQuantity() {
  const totalQuantity = document.querySelector("#totalQuantity");
  const total = cart.reduce((total, item) => total + item.quantity, 0);
  totalQuantity.textContent = total;
}

function displayTotalPrice() {
  const totalPrice = document.querySelector("#totalPrice");
  const total = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  totalPrice.textContent = total;
}

function takeCartContent(item) {
  const cartItemContent = document.createElement("div");
  cartItemContent.classList.add("cart__item__content");

  const description = takeDescription(item);
  const settings = takeSettings(item);

  cartItemContent.appendChild(description);
  cartItemContent.appendChild(settings);
  return cartItemContent;
}

function takeDescription(item) {
  const description = document.createElement("div");
  description.classList.add("cart_item_content__description");

  const h2 = document.createElement("h2");
  h2.textContent = item.name;
  const p = document.createElement("p");
  p.textContent = item.color;
  const p2 = document.createElement("p");
  p2.textContent = item.price + "€";

  description.appendChild(h2);
  description.appendChild(p);
  description.appendChild(p2);
  return description;
}

function takeSettings(item) {
  const settings = document.createElement("div");
  settings.classList.add("cart__item__content__settings");

  addQuantityToSettings(settings, item);
  addDeleteToSettings(settings, item);
  return settings;
}

function displayArticle(article) {
  document.querySelector("#cart__items").appendChild(article);
}

function takeArticle(item) {
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = item.id;
  article.dataset.color = item.color;
  return article;
}

function takeImage(item) {
  const div = document.createElement("div");
  div.classList.add("cart__item__img");
  const image = document.createElement("img");
  image.src = item.imageUrl;
  image.alt = item.altxt;
  div.appendChild(image);
  return div;
}

function addQuantityToSettings(settings, item) {
  const quantity = document.createElement("div");
  quantity.classList.add("cart__item__content__settings__quantity");
  const p = document.createElement("p");
  p.textContent = "Qté :";
  quantity.appendChild(p);
  const input = document.createElement("input");
  input.type = "number";
  input.classList.add("itemQuantity");
  input.name = "itemQuantity";
  input.min = "1";
  input.max = "100";
  input.value = item.quantity;
  input.addEventListener("input", () => {
    if (input.value <= 100) {
      refreshPriceAndQuantity(item.id, input.value, item);
    }
  });
  quantity.appendChild(input);
  settings.appendChild(quantity);
}

function refreshPriceAndQuantity(id, newValue, item) {
  const itemToRefresh = cart.find((item) => item.id === id);
  itemToRefresh.quantity = Number(newValue);
  item.quantity = itemToRefresh.quantity;
  displayTotalQuantity();
  displayTotalPrice();
  saveNewDataToCache(item);
}

function saveNewDataToCache(item) {
  const dataToSave = JSON.stringify(item);
  const key = `${item.id}-${item.color}`;
  localStorage.setItem(key, dataToSave);
}

// ---------------------------Suppression des données dès que la commande est validée-------------------------

function addDeleteToSettings(settings, item) {
  const div = document.createElement("div");
  div.classList.add("cart__item__content__settings__delete");
  div.addEventListener("click", () => deleteItem(item));

  const p = document.createElement("p");
  p.textContent = "Supprimer";
  div.appendChild(p);
  settings.appendChild(div);
}

function deleteItem(item) {
  const itemToDelete = cart.findIndex(
    (product) => product.id === item.id && product.color === item.color
  );
  cart.splice(itemToDelete, 1);
  displayTotalPrice();
  displayTotalQuantity();
  deleteDataFromCache(item);
  deleteArticleFromPage(item);
}

function deleteDataFromCache(item) {
  const key = `${item.id}-${item.color}`;
  localStorage.removeItem(key);
}

function deleteArticleFromPage(item) {
  const articleToDelete = document.querySelector(
    `article[data-id="${item.id}"][data-color="${item.color}"]`
  );
  articleToDelete.remove();
}

//------------------------------------Construction du formulaire---------------------------------------

const orderButton = document.querySelector("#order");
orderButton.addEventListener("click", (e) => submitForm(e));

// evite la migration 'naturelle' vers la page "confirmation" avant qu'un kanap ne soit selectionné
function submitForm(e) {
  e.preventDefault();
  if (cart.length === 0) {
    alert("You have to choose a Kanap before!");
    return;
  }
  // boucle avec la confirmation valide nécessaire
  if (isFormInvalid()) return;
  if (isEmailInvalid()) return;
  if (isNameInvalid()) return;
  if (isLastNameInvalid()) return;
  if (isAddressInvalid()) return;
  if (isCityInvalid()) return;
  const body = getBodyRequest();
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const orderId = data.orderId;
      window.location.href = "./confirmation.html" + "?orderId=" + orderId;
    })
    .catch((err) => console.error(err));
}
// récupération des données de l'utilisateur
function getBodyRequest() {
  const form = document.querySelector(".cart__order__form");
  const firstName = form.elements.firstName.value;
  const lastName = form.elements.lastName.value;
  const address = form.elements.address.value;
  const city = form.elements.city.value;
  const email = form.elements.email.value;
  const body = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    },
    products: getIdsFromCache(),
  };
  return body;
}
// Boucle permettant d'obtenir l'id uniquement et de l'envoyer
function getIdsFromCache() {
  const numberOfProducts = localStorage.length;
  const ids = [];
  for (let i = 0; i < numberOfProducts; i++) {
    const key = localStorage.key(i);
    const id = key.split("-")[0];
    ids.push(id);
  }
  return ids;
}

// alerte si formulaire non rempli
function isFormInvalid() {
  const form = document.querySelector(".cart__order__form");
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.value === "") {
      alert("Please fill all the fields");
      return true;
    }
    return false;
  });
}
// alerte si prénom invalide
function isNameInvalid() {
  const firstNameErrMsg = document.querySelector("#firstNameErrorMsg");
  const firstName = document.querySelector("#firstName").value;
  const regexName = /^[a-z][a-z '-.,]{1,31}$|^$/i;
  if (regexName.test(firstName) === false) {
    firstNameErrMsg.textContent =
      "Please enter a name valid, without number and accent";
    return true;
  }
  return false;
}

// alerte si nom invalide
function isLastNameInvalid() {
  const lastNameErrMsg = document.querySelector("#lastNameErrorMsg");
  const lastName = document.querySelector("#lastName").value;
  const regexLastName = /^[a-z][a-z '-.,]{1,31}$|^$/i;
  if (regexLastName.test(lastName) === false) {
    lastNameErrMsg.textContent =
      "Please enter a last name valid, without number and accent";
    return true;
  }
  return false;
}

// alerte si adresse invalide
function isAddressInvalid() {
  const addressErrMsg = document.querySelector("#addressErrorMsg");
  const address = document.querySelector("#address").value;
  const regexAddress =
    /(\d+)?\,?\s?(bis|ter|quater)?\,?\s?(rue|avenue|boulevard|r|av|ave|bd|bvd|square|sente|impasse|cours|esplanade|allée|résidence|parc|rond-point|chemin|côte|place|cité|quai|passage|lôtissement|hameau)?\s([a-zA-Zà-ÿ0-9\s]{2,})+$/gi;
  if (regexAddress.test(address) === false) {
    addressErrMsg.textContent = "Please enter a valid Address ";
    return true;
  }
  return false;
}

// alerte si ville invalide
function isCityInvalid() {
  const cityErrMsg = document.querySelector("#cityErrorMsg");
  const city = document.querySelector("#city").value;
  const regexCity =
    /^[a-zA-Z\u0080-\u024F]+(?:([\ \-\']|(\.\ ))[a-zA-Z\u0080-\u024F]+)*$/;
  if (regexCity.test(city) === false) {
    cityErrMsg.textContent = "Please enter a City valid, without number";
    return true;
  }
  return false;
}

// alerte si email invalide
function isEmailInvalid() {
  const emailErrMsg = document.querySelector("#emailErrorMsg");
  const email = document.querySelector("#email").value;
  const regexMail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regexMail.test(email) === false) {
    emailErrMsg.textHTML = "Please enter an email valid";
    return true;
  }
  return false;
}
