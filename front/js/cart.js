const cart = [];

retrieveItemsFromCache()
cart.forEach((item) => displayItem(item));

function retrieveItemsFromCache() {
    const numberOfItems = localStorage.length;
    for (let i = 0; i < numberOfItems; i++) {
        const item = localStorage.getItem(localStorage.key(i)) || "";
        const itemObject = JSON.parse(item);
        cart.push(itemObject);
    };
}

function displayItem(item) {
    const article = takeArticle(item);
    const div = takeImage(item);
    article.appendChild(div)
    const cartItemContent = takeCartContent(item);
    article.appendChild(cartItemContent)
    displayArticle(article);
    displayTotalQuantity();
    displayTotalPrice(item);

}

function displayTotalQuantity() {
    const totalQuantity = document.querySelector("#totalQuantity");
    const total = cart.reduce((total, item) => total + item.quantity, 0);
    totalQuantity.textContent = total
}


function displayTotalPrice() {
    const totalPrice = document.querySelector("#totalPrice");
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    totalPrice.textContent = total
    // let total = 0
    // const item = document.createElement(kanap)
    // const totalPrice = document.querySelector("#totalPrice");
    // cart.forEach(kanap => {
    //     const totalPrice = item.price * item.quantity
    //     total = total + totalPrice;
    // })
    // totalPrice.textContent = total
}

function takeCartContent(item) {
    const cartItemContent = document.createElement("div");
    cartItemContent.classList.add("cart__item__content");

    const description = takeDescription(item);
    const settings = takeSettings(item);

    cartItemContent.appendChild(description);
    cartItemContent.appendChild(settings);
    return cartItemContent
}

function takeDescription(item) {
    const description = document.createElement("div");
    description.classList.add("cart_item_content__description")

    const h2 = document.createElement("h2");
    h2.textContent = item.name;
    const p = document.createElement("p");
    p.textContent = item.color;
    const p2 = document.createElement("p");
    p2.textContent = item.price + "€";

    description.appendChild(h2);
    description.appendChild(p)
    description.appendChild(p2)
    return description
}

function takeSettings(item) {
    const settings = document.createElement("div");
    settings.classList.add("cart__item__content__settings");

    addQuantityToSettings(settings, item);
    addDeleteToSettings(settings, item);
    return settings
}

function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
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
    div.classList.add("cart__item__img")
    const image = document.createElement('img');
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
    input.addEventListener("input", () => refreshPriceAndQuantity(item.id, input.value, item))
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

function addDeleteToSettings(settings, item) {
    const div = document.createElement("div");
    div.classList.add("cart__item__content__settings__delete");
    div.addEventListener("click", () => deleteItem(item))

    const p = document.createElement("p");
    p.textContent = "Supprimer";
    div.appendChild(p);
    settings.appendChild(div);
}

function deleteItem(item) {
    const itemToDelete = cart.findIndex(
        (product) => product.id === item.id && product.color === item.color)
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
    )
    articleToDelete.remove()
}

