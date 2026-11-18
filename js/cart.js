// Varukorg: visa varor, ändra antal, totalsumma och simulerat köp.
// Vi behöver anropa till storage.js för att ändra antal och ta bort produkter från varukorgen. 
// Först och främst måste vi se till att varje rad har data-id och ett input med aktuellt antal.

// plus
// setQuantity(productId, currentQuantity + 1);

// updateTotalPrice();
// minus
// setQuantity(productId, currentQuantity - 1);

// användaren skriver "3" i fältet
// setQuantity(productId, input.value);

// "ta bort"-ikon
// removeFromCart(productId);

import { getCart, setQuantity, removeFromCart } from "./storage.js";
import { fetchSingleProduct } from "./api.js";

const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");
const backLink = document.querySelector("#back-link");

// Läs sparad varukorg
const cart = getCart();
console.log(cart);

console.log("Varukorg:", cartItems);
console.log("Tillbaka-länk:", backLink);

backLink.addEventListener("click", (e) => {
    if (history.length > 1) {
        e.preventDefault();
        history.back();
    }
});

// Hämta varukorgens produkter
async function showCart() {
    for (const item of cart) {
        const product = await fetchSingleProduct(item.id);

        console.log(product);
        console.log("Antal: ", item.quantity);
    }
}

showCart()

cartItems.innerHTML = `
    <tr class="cart-empty" hidden>
        <td colspan="4">Your cart is empty</td>
    </tr>

    <tr>
        <!-- Produktbild, namn och ta bort-knapp -->
        <td>
            <div class="cart-product">
                <div class="cart-image"></div>
                <div class="cart-product-info">
                    <p>T-shirt</p>
                    <button type="button">Remove</button>
                </div>
            </div>
        </td>

        <!-- Styckpris -->
        <td>450 kr</td>

        <!-- Antal -->
        <td>
            <div class="cart-quantity">
                <button type="button" aria-label="Decrease quantity">−</button>
                <span>2</span>
                <button type="button" aria-label="Increase quantity">+</button>
            </div>
        </td>

        <!-- Radsumma -->
        <td>900 kr</td>
    </tr>
`;