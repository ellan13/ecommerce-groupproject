import { searchProducts } from "./api.js";

// ---------- HAMBURGERMENY ----------
const openMenuBtn = document.querySelector("#open-menu-btn");
const closeMenuBtn = document.querySelector("#close-menu-btn");
const menuModal = document.querySelector("#menu-modal");

// Menyn öppnas med klassen "open" (se .menu-modal.open i style.css)
if (openMenuBtn && menuModal) {
  openMenuBtn.addEventListener("click", function () {
    menuModal.classList.add("open");
  });
}

if (closeMenuBtn && menuModal) {
  closeMenuBtn.addEventListener("click", function () {
    menuModal.classList.remove("open");
  });
}

// ---------- SÖK ----------
const searchBtn = document.querySelector("#search-btn");
const searchPanel = document.querySelector("#search-panel");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const searchMessage = document.querySelector("#search-message");
const searchResults = document.querySelector("#search-results");

// Skapar ett kort för varje produkt och lägger in det på sidan
function showProducts(products) {
  searchResults.innerHTML = "";

  products.forEach(function (product) {
    const card = document.createElement("article");
    card.className = "product-card";

    // Länk med bara bilden (samma som på startsidan)
    const link = document.createElement("a");
    link.href = "product.html?id=" + product.id;

    const img = document.createElement("img");
    img.src = product.thumbnail;
    img.alt = product.title;
    link.append(img);

    // Text under bilden
    const info = document.createElement("div");
    info.className = "product-info";

    const title = document.createElement("p");
    title.textContent = product.title;

    const price = document.createElement("p");
    price.textContent = "$" + product.price;

    info.append(title, price);
    card.append(link, info);
    searchResults.append(card);
  });
}

// Körs när man söker
async function runSearch() {
  const query = searchInput.value.trim();

  // Tomt sökfält: rensa allt
  if (query === "") {
    searchMessage.textContent = "";
    searchResults.innerHTML = "";
    return;
  }

  searchMessage.textContent = "Loading...";

  try {
    const products = await searchProducts(query);

    if (products.length === 0) {
      searchResults.innerHTML = "";
      searchMessage.textContent = "No products found";
      return;
    }

    searchMessage.textContent = "";
    showProducts(products);
  } catch (error) {
    console.error(error);
    searchResults.innerHTML = "";
    searchMessage.textContent = "Something went wrong. Please try again.";
  }
}

// Koppla ihop knapparna (if-satsen gör att inget kraschar om sökrutan saknas)
if (searchBtn && searchPanel && searchForm && searchInput) {
  // Visa/dölj sökpanelen när man klickar på 🔍
  searchBtn.addEventListener("click", function () {
    searchPanel.classList.toggle("active");
    searchInput.focus();
  });

  // Tryck Enter i sökfältet
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault(); // stoppar att sidan laddas om
    runSearch();
  });
}