// Produktkatalog: lista, filter, sortering och create.

const openFilterBtn = document.getElementById("open-filter-btn");
const closeFilterBtn = document.getElementById("close-filter-btn");
const applyFilterBtn = document.getElementById("apply-filter-btn");
const filterModal = document.getElementById("filter-modal");
const filterCount = document.getElementById("filter-count");

const openCreateBtn = document.getElementById("open-create-btn");
const closeCreateBtn = document.getElementById("close-create-btn");
const cancelCreateBtn = document.getElementById("cancel-create-btn");
const createModal = document.getElementById("create-modal");


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

openCreateBtn.addEventListener("click", function () {
    createModal.style.display = "flex";
});
closeCreateBtn.addEventListener("click", function () {
    createModal.style.display = "none";
});
cancelCreateBtn.addEventListener("click", function () {
    createModal.style.display = "none";
});