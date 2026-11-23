// Produktkatalog: lista, filter, sortering och create.

// IMPORTS
import { fetchAllProducts, addNewProduct } from "./api.js";
import {
    saveProductsToLocalStorage,
    saveProductToLocalStorage,
    getProductsFromLocalStorage,
    addToCart,
    getFavorites,
    toggleFavorite,
} from "./storage.js";
import { showAlert, showToast } from "./dialog.js";
import { updateCartBadge } from "./navigation.js";

// DOM ELEMENTS
const openFilterBtn = document.getElementById("open-filter-btn");
const closeFilterBtn = document.getElementById("close-filter-btn");
const applyFilterBtn = document.getElementById("apply-filter-btn");
const filterModal = document.getElementById("filter-modal");
const activeFilterCount = document.getElementById("active-filter-count");
const filterCategoryList = document.getElementById("filter-category-list");

const sortSelect = document.getElementById("products-sort-select");

const openAddProductBtn = document.getElementById("open-add-product-btn");
const closeAddProductBtn = document.getElementById("close-add-product-btn");
const cancelAddProductBtn = document.getElementById("cancel-add-product-btn");
const addProductModal = document.getElementById("add-product-modal");
const addProductForm = document.getElementById("add-product-form");
const addProductImageInput = document.getElementById("add-product-image");
const addProductImagePreview = document.getElementById("add-product-image-preview");

const productsGrid = document.getElementById("products-grid");
const breadcrumbCurrent = document.getElementById("breadcrumb-current");
const loadMoreBtn = document.getElementById("load-more-btn");


// VARIABLES
let allProducts = [];
let activeCategories = [];
let totalProducts = 0;

const PRODUCTS_PER_LOAD = 20; // INFO: hur många kort som läggs till per "Load more"
let shownCount = PRODUCTS_PER_LOAD; // INFO: antal produkter som syns. I början lika många som PRODUCTS_PER_LOAD.
let selectedImageDataUrl = null;


const searchQuery = (new URLSearchParams(window.location.search).get("q") ?? "").trim(); // INFO: sök från meny → products.html?q=... (Alex länkar hit). Browse all = ingen q.

// FUNCTIONS (helpers)
function getCatalogProducts() { 
    // INFO: utgångspunkt för katalogen. Alla produkter, eller bara de som matchar ?q=
    if (!searchQuery) return allProducts;

    const query = searchQuery.toLowerCase();

    return allProducts.filter((product) => {
        const text = `${product.title || ""} ${product.brand || ""} ${product.category || ""} ${product.description || ""}`;
        return text.toLowerCase().includes(query);
    });
}

function countProductsInCategory(category) {
    return getCatalogProducts().filter((product) => product.category === category).length;
}

function getProductCategories() {
    const categories = [];
    getCatalogProducts().forEach((product) => {
        if (!categories.includes(product.category)) {
            categories.push(product.category);
        }
    });
    return categories;
}

function getFilteredAndSortedProducts() {
    // INFO: sök först, sedan kategori-filter, sedan sortering
    let productsToShow = [...getCatalogProducts()];

    if (activeCategories.length > 0) {
        productsToShow = productsToShow.filter((product) =>
            activeCategories.includes(product.category)
        );
    }

    if (sortSelect.value === "price-asc") {
        productsToShow.sort((a, b) => a.price - b.price);
    } else if (sortSelect.value === "price-desc") {
        productsToShow.sort((a, b) => b.price - a.price);
    }

    return productsToShow;
}

function clearImagePreview() {
    selectedImageDataUrl = null;
    addProductImagePreview.src = "";
    addProductImagePreview.classList.remove("is-visible");
}

function updateBreadcrumbs() {
    if (!breadcrumbCurrent) return;
    // INFO: vanlig katalog → Products; sök → själva sökfrågan
    breadcrumbCurrent.textContent = searchQuery || "Products";
}

function closeAddProductModal() {
    addProductModal.style.display = "none";
    addProductForm.reset();
    clearImagePreview();
}

// FUNCTIONS (render)
function createProductCard(product) {
    const isFavorite = getFavorites().includes(product.id);
    const card = document.createElement("article");
    card.className = "product-card";
    card.dataset.id = product.id;
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
          <button type="button" class="toggle-favorite-btn${isFavorite ? " active" : ""}" aria-label="${isFavorite ? "Remove from favorites" : "Add to favorites"}">
            <img src="assets/icons/${isFavorite ? "heart-filled" : "heart"}.svg" alt="" width="18" height="18">
          </button>
          <button type="button" class="add-to-cart-btn" aria-label="Add to cart">
            <img src="assets/icons/shopping-bag.svg" alt="" width="18" height="18">
          </button>
        </div>
      </div>
    `;
    return card;
}

function renderProductGrid() {
    const matchingProducts = getFilteredAndSortedProducts();
    // INFO: slice(start, end) = ta ut en bit av listan. Ex: 20 → index 0–19
    const productsToShow = matchingProducts.slice(0, shownCount);

    productsGrid.innerHTML = "";

    if (matchingProducts.length === 0) {
        productsGrid.innerHTML =
          '<p class="status-message">No products found.</p>';
        loadMoreBtn.hidden = true;
        return;
      }

    productsToShow.forEach((product) => {
        productsGrid.appendChild(createProductCard(product));
    });

    // INFO: knappen syns bara om det finns fler att visa
    loadMoreBtn.hidden = shownCount >= matchingProducts.length;
}

function renderCategoryFilters() {
    filterCategoryList.innerHTML = "";
    getProductCategories().forEach((category) => {
        const total = countProductsInCategory(category);
        const checked = activeCategories.includes(category) ? "checked" : "";
        const li = document.createElement("li");
        li.innerHTML = `
        <label>
          <input type="checkbox" name="category" value="${category}" ${checked}>
          ${category}
          <span class="category-count">[${total}]</span>
        </label>
      `;
        filterCategoryList.appendChild(li);
    });
}


function refreshCatalog() {
    shownCount = PRODUCTS_PER_LOAD; // INFO: börja om från första batchen
    renderCategoryFilters();
    renderProductGrid();
    updateBreadcrumbs();
}

// FUNCTIONS (load)
async function loadProducts() {
    // INFO: samma idé som tidigare. Först localStorage, annars API
    const saved = getProductsFromLocalStorage();
    const hasAllProductsSaved = saved && saved.products.length >= saved.total;

    if (hasAllProductsSaved) {
        allProducts = saved.products;
        totalProducts = saved.total;
    } else {
        // INFO: saknas sparade produkter eller om det finns färre produkter än det somm är reggat från API → hämta från API
        productsGrid.innerHTML = '<p class="status-message">Loading products...</p>';
        loadMoreBtn.hidden = true;
        try {
            const fromApi = await fetchAllProducts();
            allProducts = fromApi.products;
            totalProducts = fromApi.total;
            saveProductsToLocalStorage(allProducts, totalProducts);
        } catch (error) {
            productsGrid.innerHTML =
                '<p class="status-message status-message--error">Could not load products. Please try again later.</p>';
            return;
        }
    }

    refreshCatalog();
}

// EVENTS (filter and sort)
openFilterBtn.addEventListener("click", () => {
    filterModal.style.display = "flex";
});

closeFilterBtn.addEventListener("click", () => {
    filterModal.style.display = "none";
});

applyFilterBtn.addEventListener("click", () => {
    filterModal.style.display = "none";
    const checked = filterModal.querySelectorAll("input[name='category']:checked");
    // INFO: NodeList → Array så .map funkar
    activeCategories = [...checked].map((input) => input.value);
    activeFilterCount.textContent = activeCategories.length > 0 ? `(${activeCategories.length})` : "";

    shownCount = PRODUCTS_PER_LOAD;
    renderProductGrid();
});

sortSelect.addEventListener("change", () => {
    shownCount = PRODUCTS_PER_LOAD;
    renderProductGrid();
});

// EVENTS (add product)
openAddProductBtn.addEventListener("click", () => {
    addProductModal.style.display = "flex";
});

closeAddProductBtn.addEventListener("click", closeAddProductModal);
cancelAddProductBtn.addEventListener("click", closeAddProductModal);

addProductImageInput.addEventListener("change", () => {
    const file = addProductImageInput.files?.[0];
    if (!file) {
        clearImagePreview();
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        selectedImageDataUrl = reader.result;
        addProductImagePreview.src = selectedImageDataUrl;
        addProductImagePreview.classList.add("is-visible");
    };
    reader.readAsDataURL(file);
});

addProductForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(addProductForm);
    // INFO: skicka bara textfält till API – bilder (data-URL) ger 403 hos DummyJSON
    const product = {
        title: formData.get("title"),
        brand: formData.get("brand"),
        price: Number(formData.get("price")),
        category: formData.get("category"),
        description: formData.get("description"),
    };

    const submitBtn = addProductForm.querySelector('button[type="submit"]');
    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Adding...";

    try {
        const createdProduct = await addNewProduct(product);
        const productToSave = selectedImageDataUrl
            ? {
                  ...createdProduct,
                  thumbnail: selectedImageDataUrl,
                  images: [selectedImageDataUrl],
              }
            : createdProduct;
        allProducts.push(productToSave);
        totalProducts++;
        saveProductToLocalStorage(productToSave);
        refreshCatalog();
        closeAddProductModal();
    } catch (error) {
        showAlert("Could not create product. Please try again.");
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
    }
});

// EVENTS (product card actions)
productsGrid.addEventListener("click", (event) => {
    const cartBtn = event.target.closest(".add-to-cart-btn");
    const favBtn = event.target.closest(".toggle-favorite-btn");
    if (!cartBtn && !favBtn) return;

    const card = event.target.closest(".product-card");
    if (!card) return;

    const productId = Number(card.dataset.id);

    if (cartBtn) {
        addToCart(productId);
        updateCartBadge();
        const product = allProducts.find((item) => item.id === productId);
        const title = product?.title ?? "Product";
        showToast(`${title} added to cart`);
    } else if (favBtn) {
        toggleFavorite(productId);
        const isFavorite = getFavorites().includes(productId);
        favBtn.classList.toggle("active", isFavorite);
        favBtn.querySelector("img").src = `assets/icons/${isFavorite ? "heart-filled" : "heart"}.svg`;
        favBtn.setAttribute(
            "aria-label",
            isFavorite ? "Remove from favorites" : "Add to favorites"
        );
    }
});

loadMoreBtn.addEventListener("click", () => { // INFO: visa 20 till utan att byta sida
    shownCount += PRODUCTS_PER_LOAD;
    renderProductGrid();
});

// START
loadProducts();