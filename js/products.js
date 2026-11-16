// Produktkatalog: lista, filter, sortering och create.


//IMPORT
// import { fetchProducts } from "./api.js";
// import { addToCart, toggleFavorite } from "./storage.js";

//HÄMTA DOM-ELEMENT
const openFilterBtn = document.getElementById("open-filter-btn");
const closeFilterBtn = document.getElementById("close-filter-btn");
const applyFilterBtn = document.getElementById("apply-filter-btn");
const filterModal = document.getElementById("filter-modal");
const filterCount = document.getElementById("filter-count");

const productsSortSelect = document.getElementById("products-sort-select");

const openAddProductBtn = document.getElementById("open-add-product-btn");
const closeAddProductBtn = document.getElementById("close-add-product-btn");
const cancelAddProductBtn = document.getElementById("cancel-add-product-btn");
const addProductModal = document.getElementById("add-product-modal");
const addProductForm = document.getElementById("add-product-form");

const productsGrid = document.getElementById("products-grid");

let allProducts = [];
let activeCategories = [];

//FUNKTIONER
// products.forEach((product) => {
//     const card = document.createElement("article");
//     card.className = "product-card";
//     card.dataset.id = product.id; // blir data-id="..."
//     card.dataset.category = product.category;
//     card.dataset.price = product.price;

//     card.innerHTML = `
//       <a href="product.html?id=${product.id}">bild</a>
//       <button type="button" class="add-to-cart-btn">👜</button>
//     `;

//     productsGrid.appendChild(card);
// });

//EVENTLISTENERS
openFilterBtn.addEventListener("click", function () {
    filterModal.style.display = "flex";
});

closeFilterBtn.addEventListener("click", function () {
    filterModal.style.display = "none";
});

applyFilterBtn.addEventListener("click", function () {
    filterModal.style.display = "none";
    const checked = filterModal.querySelectorAll("input[name='category']:checked");
    if (checked.length > 0) {
        filterCount.textContent = `(${checked.length})`;
    } else {
        filterCount.textContent = "";
    }
});

openAddProductBtn.addEventListener("click", function () {
    addProductModal.style.display = "flex";
});
closeAddProductBtn.addEventListener("click", function () {
    addProductModal.style.display = "none";
    addProductForm.reset();
});

saveAddProductBtn.addEventListener("click", function () {
    // Skicka till API (skapa produkt) och sen uppdatera localStorage samt UI
    addProductModal.style.display = "none";
    addProductForm.reset();
});
cancelAddProductBtn.addEventListener("click", function () {
    addProductModal.style.display = "none";
    addProductForm.reset();
});

productsGrid.addEventListener("click", function (event) {
    const cartBtn = event.target.closest(".add-to-cart-btn");
    const favBtn = event.target.closest(".toggle-favorite-btn");

    if (cartBtn) {
        const card = cartBtn.closest(".product-card");
        addToCart(card.dataset.id); // koppla till addToCart funktionen (ska göras i storage.js sen)
        return;
    }
    if (favBtn) {
        const card = favBtn.closest(".product-card");
        toggleFavorite(card.dataset.id); // koppla till toggleFavorite funktionen (ska göras i storage.js sen)
        return;
    }
});



