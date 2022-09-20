/*Création avec le Javascript de la section cachée en HTML
& Relier l'élement "a" à la section #items*/
fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => addProducts(data))

function addProducts(kanaps) {
    // Function loops pour avoir tous les kanaps de visibles
    kanaps.forEach((kanap) => {

        /*const permettant de récupér chaque
         caractéristiques des kanaps*/
        const _id = kanap._id
        const imageUrl = kanap.imageUrl
        const altTxt = kanap.altTxt
        const name = kanap.name
        const description = kanap.description

        const anchor = makeAnchor(_id)
        const article = document.createElement("article")
        const image = makeImage(imageUrl, altTxt)
        const h3 = makeH3(name)
        const p = makeParagraph(description)
        appendElementsToArticle(article, image, h3, p)
        appendChild(anchor, article)
    })
}

function appendElementsToArticle(article, image, h3, p) {
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
}

function makeAnchor(id) {
    const anchor = document.createElement("a")
    anchor.href = "./product.html?id=" + id
    return anchor
}

function appendChild(anchor, article) {
    const items = document.getElementById("items")
    if (items != null) {
        items.appendChild(anchor)
        anchor.appendChild(article)
    }
}

function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}

function makeH3(name) {
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
    return h3
}

function makeParagraph(description) {
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}



// function addProducts(product) {
//     const id = product[0]._id
//     const article = makeArticle()
//     const imageUrl = product[0].imageUrl
//     const altTxt = product[0].altTxt
//     const image = makeImage(imageUrl, altTxt)
//     article.appendChild(image)
//     appendChildren(id)
// }
// function makeAlt(id) {
//     const alt = document.createElement("a")
//     alt.href = "./product.html?id=" + id
//     alt.txt = altTxt
//     return alt
// }

// function appendChildren(alt, article) {
//     const items = document.getElementById("items")
//     items.appendChildren(alt, article)
//
// }

// function makeImage(imageUrl, altTxt) {
//     const image = document.createElement("img")
//     image.src = imageUrl
//     image.alt = altTxt
//     return image
// }

// function makeArticle() {
//     const article = document.createElement("article")
//     const h3 = makeH3()
//     const p = makeParagraph()
//     // article.appendChild(h3)
//     // article.appendChild(p)
//
//     return article
// }



// function makeH3() { }

// function makeParagraph() { }


