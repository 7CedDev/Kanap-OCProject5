// Recupération des données de l'API sur les produits
fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    /*Boucle permetttant de créer et d'aficher chacun des élements
          sur la page en les liants les uns aux autres*/
    value.forEach((element) => {
      const article = createArticle();
      const image = createImage(element.imageUrl, element.altTxt);
      const title = createTitle(element.name);
      const p = createParagraph(element.description);

      article.appendChild(image);
      article.appendChild(title);
      article.appendChild(p);
      const link = createLink(element._id);
      link.appendChild(article);

      let itemsList = document.querySelector("#items");
      itemsList.appendChild(link);
    });
  })
  .catch(function () {
    window.alert("une erreur est survenue");
  });

/*Fonction permettant de voir chacun des éléments
 de la page d'accueil mis en commentaire dans le code HTMl*/
// produit
function createProducts() {
  let a = document.createElement("a");
  document.getElementById("items").appendChild(a);
}
// lien
function createLink(id) {
  let a = document.createElement("a");
  a.setAttribute("href", "./product.html?id=" + id);
  return a;
}
// Article
function createArticle() {
  let article = document.createElement("article");
  return article;
}
// image
function createImage(imageUrl, altTxt) {
  let img = document.createElement("img");
  img.setAttribute("src", imageUrl);
  img.setAttribute("alt", altTxt);
  return img;
}
// titre
function createTitle(name) {
  let title = document.createElement("h3");
  title.classList.add("productName");
  title.textContent = name;
  return title;
}
// paragraphe
function createParagraph(description) {
  let p = document.createElement("p");
  p.classList.add("productDescription");
  p.textContent = description;
  return p;
}
