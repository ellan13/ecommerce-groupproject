// Header-navigation och hamburgermeny (och sökfunktion).

// hämta element från DOM
const openMenuBtn = document.querySelector("#open-menu-btn");
const closeMenuBtn = document.querySelector("#close-menu-btn");
const menuModal = document.querySelector("#menu-modal");

// event listener för att öppna menyn när man klickar på hamburgermenyn
openMenuBtn.addEventListener("click", function () {
    menuModal.classList.add("open");
});

 //Event listener för att stänga menyn när man klickar på stäng-knappen
closeMenuBtn.addEventListener("click", function () {
    menuModal.classList.remove("open");
});