// Produktkatalog: lista, filter, sortering och create.

const openFilterBtn = document.getElementById("open-filter");
const closeFilterBtn = document.getElementById("close-filter");
const applyFilterBtn = document.getElementById("apply-filter");
const filterModal = document.getElementById("filter-modal");
const filterCount = document.getElementById("filter-count");

// Öppna filtret
openFilterBtn.addEventListener("click", function () {
    filterModal.hidden = false;
});

//stäng filtrer
closeFilterBtn.addEventListener("click", function () {
    filterModal.hidden = true;
});