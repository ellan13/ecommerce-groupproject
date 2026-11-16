// Produktkatalog: lista, filter, sortering och create.
// TODO: korta ner funktionere som finns flera gånger
// TODO: korta ner funktioner som bara har ett rad skriv => istället för function (){} 
//       dvs function test(){ return "test"; } => const test = () => "test"; Alex gick igenom det kolla kompendiet.


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
function createProductCard(product) {
    const card = document.createElement("article");
    card.className = "product-card";
    card.dataset.id = product.id;
    card.dataset.category = product.category;
    card.dataset.price = product.price;
    card.innerHTML = `
      <a href="product.html?id=${product.id}">
        <img src="${product.thumbnail ?? ""}" alt="${product.title}">
      </a>
      <div class="product-info">
        <div class="product-info-text">
          <a href="product.html?id=${product.id}">${product.title}</a>
          <p>$${product.price}</p>
        </div>
        <div class="product-info-icons">
          <button type="button" class="toggle-favorite-btn">♡</button>
          <button type="button" class="add-to-cart-btn">👜</button>
        </div>
      </div>
    `;
    return card;
}
function renderProducts(products) {
    productsGrid.innerHTML = "";
    products.forEach((product) => {
        console.log(product);
        productsGrid.appendChild(createProductCard(product));
    });
}
function getFilteredAndSortedProducts() {
    let list = [...allProducts];
    if (activeCategories.length > 0) {
        list = list.filter((product) =>
            // TODO: kolla upp.includes() funktionen och hur den fungerar.
            activeCategories.includes(product.category)
        );
    }
    // TODO: Kolla upp sort() funktionen och hur den fungerar.
    if (productsSortSelect.value === "price-asc") {
        list.sort((a, b) => a.price - b.price);
    } else if (productsSortSelect.value === "price-desc") {
        list.sort((a, b) => b.price - a.price);
    }
    return list;
}
function updateProductList() {
    renderProducts(getFilteredAndSortedProducts());
}
async function loadProducts() {
    // TODO: Byt till fetchProducts() från api.js senare
    const response = await fetch("https://dummyjson.com/products?limit=20");
    const data = await response.json();
    allProducts = data.products;
    updateProductList();
}
function closeAddProductModal() {
    addProductModal.style.display = "none";
    addProductForm.reset();
}

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

    // TODO: kolla skillnnaden på dessa och hur de fungerar, vilken är bäst?
    activeCategories = [...checked].map((input) => input.value);
    // activeCategories = Array.from(checked).map(checkbox => checkbox.value);

    filterCount.textContent = activeCategories.length > 0 ? `(${activeCategories.length})` : "";
    updateProductList();
});

productsSortSelect.addEventListener("change", function () {
    updateProductList();
});

openAddProductBtn.addEventListener("click", function () {
    addProductModal.style.display = "flex";
});

closeAddProductBtn.addEventListener("click", closeAddProductModal);
cancelAddProductBtn.addEventListener("click", closeAddProductModal);

addProductForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // TODO: POST till API + LocalStorage + uppdatera allProducts/UI
    closeAddProductModal();
});


productsGrid.addEventListener("click", function (event) {
    // TODO: kolla upp closest() funktionen och hur den fungerar.
    const cartBtn = event.target.closest(".add-to-cart-btn");
    const favBtn = event.target.closest(".toggle-favorite-btn");
    if (!cartBtn && !favBtn) return;
    const card = event.target.closest(".product-card");
    const productId = card.dataset.id;
    if (cartBtn) {
        console.log("Add to cart:", productId);
        // addToCart(productId); // när storage.js finns
        return;
    }
    if (favBtn) {
        console.log("Toggle favorite:", productId);
        // toggleFavorite(productId); // när storage.js finns
    }
});
loadProducts();



