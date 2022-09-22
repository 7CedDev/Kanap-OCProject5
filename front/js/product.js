// récupération de la chaine de requête dans l'URL
const queryString_url_id = window.location.search;

const urlSearchParams = new URLSearchParams(queryString_url_id);
const id = urlSearchParams("id");
console.log(id);
