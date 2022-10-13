const orderId = getOrderId();
displayOrderId(orderId);
removeAllCache();

// récupère les informations par leur id
function getOrderId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("orderId");
}
// permet d'afficher les identifiants par leur id
function displayOrderId(orderId) {
  const orderIdElement = document.getElementById("orderId");
  orderIdElement.textContent = orderId;
}

// suppression du cache une fois la commande terminée
function removeAllCache() {
  const cache = window.localStorage;
  cache.clear();
}
