// Favoritsida: visa och ta bort favoriter från LocalStorage.

import { getFavorites, removeFromFavorites } from "./storage.js";
import { fetchSingleProduct } from "./api.js";

// Hitta listan och tommeddelandet
const favoriteItems = document.querySelector("#favorite-items");
const favoritesEmpty = document.querySelector("#favorites-empty");

const favorites = getFavorites();

// Hämta favoritesproducts
async function showFavorites() {
    favoritesEmpty.hidden = false;
    favoritesEmpty.textContent = "Loading favorites...";

    try {
        for (const id of favorites){
            const product = await fetchSingleProduct(id);

            const card = document.createElement("li");
            card.className = "favorite-item";

            const image = document.createElement("img");
            image.className = "favorite-image";
            image.src = product.thumbnail;
            image.alt = product.title;

            // Länk runt bilden
            const imageLink = document.createElement("a");
            imageLink.href = `product.html?id=${product.id}`;
            imageLink.append(image);

            const info = document.createElement("div");
            info.className = "favorite-info";

            const name = document.createElement("p");
            name.textContent = product.title;

            // Länk runt titeln
            const nameLink = document.createElement("a");
            nameLink.href = `product.html?id=${product.id}`;
            nameLink.append(name);

            const removeButton = document.createElement("button")
            removeButton.type = "button";
            removeButton.className = "remove-product-btn";
            removeButton.textContent = "Remove"

            info.append(nameLink, removeButton);
            card.append(imageLink, info);
            favoriteItems.append(card);

            removeButton.addEventListener("click", () => {
                removeFromFavorites(id);
                card.remove();
    
                favoritesEmpty.hidden = getFavorites().length > 0;
            });
        }

            favoritesEmpty.textContent = "You haven’t added any favorites yet.";
            favoritesEmpty.hidden = getFavorites().length > 0;


        } catch (error) {
            favoritesEmpty.hidden = false;
            favoritesEmpty.textContent = "Could not load all favorites. Please reload the page.";

        }
    }

showFavorites();

// Hämta ta bort-knapp
// const removeFavorites = document.querySelector(".remove-product-btn");

// removeFavorites.addEventListener("click", () => {

// })




const backLink = document.querySelector("#back-link");

backLink.addEventListener("click", (e) => {
    if (history.length > 1) {
        e.preventDefault();
        history.back();
    }
});

