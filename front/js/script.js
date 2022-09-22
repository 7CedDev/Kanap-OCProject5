fetch("http://localhost:3000/api/products")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {

        value.forEach(element => {

            const article = createArticle();
            const image = createImage(element.imageUrl, element.altTxt);
            const title = createTitle(element.name);
            const p = createParagraph(element.description);

            article.appendChild(image);
            article.appendChild(title);
            article.appendChild(p);
            const link = createLink(element._id)
            link.appendChild(article);

            let itemsList = document.querySelector("#items");
            itemsList.appendChild(link);
        });
    })
    .catch(function (err) {
        // Une erreur est survenue
    });

function createProducts(product) {
    let a = document.createElement("a")
    document.getElementById("items").appendChild(a)
}

function createLink(id) {
    let a = document.createElement("a");
    a.setAttribute("href", "./product.html?id=" + id);
    return a;
}

function createArticle() {
    let article = document.createElement("article");
    return article;
}

function createImage(imageUrl, altTxt) {
    let img = document.createElement("img");
    img.setAttribute("src", imageUrl);
    img.setAttribute("alt", altTxt);
    return img;
}

function createTitle(name) {
    let title = document.createElement("h3");
    title.classList.add("productName");
    title.textContent = name
    return title;
}

function createParagraph(description) {
    let p = document.createElement("p");
    p.classList.add("productDescription");
    p.textContent = description;
    return p;
}


// console.log(itemsList);
// value.forEach(element => {
//     // console.log("element", element);
//     const article = `<a href="./product.html?id=42">
//     <article>
//       <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
//       <h3 class="productName">Kanap name1</h3>
//       <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada
//         risus sapien gravida nulla nisl arcu.</p>
//     </article>
//   </a>`
//     itemsList.append(article);
// })