// ---------- Meny ----------
const openMenuBtn = document.querySelector("#open-menu-btn");
const closeMenuBtn = document.querySelector("#close-menu-btn");
const menuModal = document.querySelector("#menu-modal");

openMenuBtn.addEventListener("click", function () {
    menuModal.classList.add("open");
});

closeMenuBtn.addEventListener("click", function () {
    menuModal.classList.remove("open");
});

// ---------- Sök ----------
const searchBtn = document.querySelector("#search-btn");
const searchPanel = document.querySelector("#search-panel");
const panelInput = document.querySelector("#search-input");
const searchForm = document.querySelector("#search-form");

searchBtn.addEventListener("click", function () {
    const isOpen = searchPanel.classList.contains("open");
    const hasText = panelInput.value.trim() !== "";

    // Rutan är öppen och något är inskrivet: sök
    if (isOpen && hasText) {
        searchForm.requestSubmit();
        return;
    }

    // Annars: öppna eller stäng rutan
    searchPanel.classList.toggle("open");

    if (searchPanel.classList.contains("open")) {
        panelInput.focus();
    }
});