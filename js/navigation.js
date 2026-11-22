// Header-navigation och hamburgermeny (och sökfunktion).

import { getCartCount } from "./storage.js";

// hämta element från DOM
const openMenuBtn = document.querySelector("#open-menu-btn");
const closeMenuBtn = document.querySelector("#close-menu-btn");
const menuModal = document.querySelector("#menu-modal");

// Varukorgs-badge i headern
export function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  if (!badge) return;

  const count = getCartCount();
  badge.textContent = String(count);
  badge.hidden = count === 0;
}

// event listener för att öppna menyn när man klickar på hamburgermenyn
openMenuBtn.addEventListener("click", function () {
  menuModal.classList.add("open");
});

 //Event listener för att stänga menyn när man klickar på stäng-knappen
closeMenuBtn.addEventListener("click", function () {
  menuModal.classList.remove("open");
});

updateCartBadge();
