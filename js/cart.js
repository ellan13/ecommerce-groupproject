// Varukorg: visa varor, ändra antal, totalsumma och simulerat köp.
// Vi behöver anropa till storage.js för att ändra antal och ta bort produkter från varukorgen. 
// Först och främst måste vi se till att varje rad har data-id och ett input med aktuellt antal.
// // plus
// setQuantity(productId, currentQuantity + 1);
// // minus
// setQuantity(productId, currentQuantity - 1);
// // användaren skriver "3" i fältet
// setQuantity(productId, input.value);
// // "ta bort"-ikon
// removeFromCart(productId);

const backLink = document.querySelector("#back-link")

backLink.addEventListener("click", (e) => {
    if (history.length > 1) {
        e.preventDefault();
        history.back();
    }
});