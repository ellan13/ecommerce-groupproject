// Produktdetalj: visa produkt, favorit, varukorg, update och delete.

const editBtn = document.getElementById("edit-product-btn");
const cancelEditBtn = document.getElementById("cancel-edit-btn");
const productView = document.getElementById("product-view");
const editForm = document.getElementById("edit-product-form");

//EVENTLISTENERS

editBtn.addEventListener("click", function () {
    productView.style.display = "none";
    editForm.style.display = "flex";
});
cancelEditBtn.addEventListener("click", function () {
    editForm.style.display = "none";
    productView.style.display = "flex";
});