// Varukorg: visa varor, ändra antal, totalsumma och simulerat köp.

const cartItems = document.querySelector("#cart-items")
const backLink = document.querySelector("#back-link")

console.log("Varukorg:", cartItems);
console.log("Tillbaka-länk:", backLink);

backLink.addEventListener("click", (e) => {
    if (history.length > 1) {
        e.preventDefault();
        history.back();
    }
});

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