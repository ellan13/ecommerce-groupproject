// Produktkatalog: lista, filter, sortering och create.

const openFilterBtn = document.getElementById("open-filter-btn");
const closeFilterBtn = document.getElementById("close-filter-btn");
const applyFilterBtn = document.getElementById("apply-filter-btn");
const filterModal = document.getElementById("filter-modal");
const filterCount = document.getElementById("filter-count");

// öppna filtret
openFilterBtn.addEventListener("click", function () {
    filterModal.style.display = "flex";
});

// stäng filtret
closeFilterBtn.addEventListener("click", function () {
    filterModal.style.display = "none";
});

//tillämpa filtret
applyFilterBtn.addEventListener("click", function () {
    filterModal.style.display = "none";
});