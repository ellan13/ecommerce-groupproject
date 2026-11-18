// Favoritsida: visa och ta bort favoriter från LocalStorage.

import { getFavorites, removeFromFavorites } from "./storage.js";

const favorites = getFavorites();
console.log(favorites);

// Hämta ta bort-knapp
const removeFavorites = document.querySelector(".remove-product-btn");

removeFavorites.addEventListener("click", () => {

});




const backLink = document.querySelector("#back-link");

backLink.addEventListener("click", (e) => {
    if (history.length > 1) {
        e.preventDefault();
        history.back();
    }
});

