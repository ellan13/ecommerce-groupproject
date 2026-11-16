// Produktdetalj: visa produkt, favorit, varukorg, update och delete.


//IMPORT
// import { fetchProduct } from "./api.js";
// import { addToCart, toggleFavorite } from "./storage.js";

//HÄMTA DOM-ELEMENT
const editProductBtn = document.getElementById("edit-product-btn");
const editProductForm = document.getElementById("edit-product-form");
const cancelEditBtn = document.getElementById("cancel-edit-btn");
const saveEditBtn = document.getElementById("save-edit-btn");
const deleteProductBtn = document.getElementById("delete-product-btn");

const productView = document.getElementById("product-view");
const productDetailsActions = document.getElementById("product-details-actions");
const addToCartBtn = document.getElementById("add-to-cart-btn");
const toggleFavoriteBtn = document.getElementById("toggle-favorite-btn");

//FUNKTIONER

//EVENTLISTENERS

editProductBtn.addEventListener("click", function () {
    productView.style.display = "none";
    editProductForm.style.display = "flex";
    editProductBtn.style.display = "none";
    productDetailsActions.style.display = "none";

});
cancelEditBtn.addEventListener("click", function () {
    editProductForm.style.display = "none";
    productView.style.display = "flex";
    editProductBtn.style.display = "";
    productDetailsActions.style.display = "";
    editProductForm.reset();
});
saveEditBtn.addEventListener("click", function () {
    console.log("Save edit");
    editProductForm.style.display = "none";
    productView.style.display = "flex";
    editProductBtn.style.display = "";
    productDetailsActions.style.display = "";
    editProductForm.reset();
});
deleteProductBtn.addEventListener("click", function () {
    console.log("Delete product");
    window.location.href = "products.html";
});
addToCartBtn.addEventListener("click", function () {
    console.log("Add to cart");
});
toggleFavoriteBtn.addEventListener("click", function () {
    console.log("Toggle favorite");
});