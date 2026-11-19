// Startsida: hämta och visa utvalda produkter.
import { searchProducts } from "./api.js";

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const searchMessage = document.querySelector("#search-message");
const searchResults = document.querySelector("#search-results");

function showProducts(products) {
    searchResults.innerHTML = "";

    if (products.length === 0) {
        searchMessage.textContent = "Inga produkter hittades.";
        return;
    }

    searchMessage.textContent = products.length + " träffar";

    products.forEach(function (product) {
        searchResults.innerHTML += `
            <article class="product-card">
                <a href="product.html?id=${product.id}">
                    <img src="${product.thumbnail}" alt="${product.title}">
                </a>
                <div class="product-info">
                    <div class="product-info-text">
                        <a href="product.html?id=${product.id}">${product.title}</a>
                        <p>${product.price} $</p>
                    </div>
                </div>
            </article>
        `;
    });
}

searchForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const query = searchInput.value.trim();
    if (query === "") {
        return;
    }

    searchMessage.textContent = "Söker...";

    try {
        const products = await searchProducts(query);
        showProducts(products);
    } catch (error) {
        searchMessage.textContent = "Något gick fel. Försök igen.";
        console.log(error);
    }
});