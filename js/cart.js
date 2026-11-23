// Varukorg: visa varor, ändra antal, totalsumma och simulerat köp.
// Vi behöver anropa till storage.js för att ändra antal och ta bort produkter från varukorgen. 
// Först och främst måste vi se till att varje rad har data-id och ett input med aktuellt antal.

// // plus
// setQuantityInCart(productId, currentQuantity + 1);

// // updateTotalPrice();
// // minus
// setQuantityInCart(productId, currentQuantity - 1);

// // användaren skriver "3" i fältet
// setQuantityInCart(productId, input.value);

// "ta bort"-ikon
// removeFromCart(productId);

import { getCart, setQuantityInCart, removeFromCart, clearCart } from "./storage.js";
import { fetchSingleProduct } from "./api.js";
import { updateCartBadge } from "./navigation.js";

const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");
const backLink = document.querySelector("#back-link");
const cartEmpty = document.querySelector("#cart-empty");
const cartStatus = document.querySelector("#cart-status");
const checkoutButton = document.querySelector("#checkout-button");

// Läs sparad varukorg
const cart = getCart();
cartEmpty.hidden = cart.length > 0;

backLink.addEventListener("click", (e) => {
    if (history.length > 1) {
        e.preventDefault();
        history.back();
    }
});

// Hämta varukorgens produkter
async function showCart() {
    cartStatus.textContent = "Loading cart...";
    cartStatus.hidden = false;
    checkoutButton.disabled = true;
    
    try{
        for (const item of cart) {
            const product = await fetchSingleProduct(item.id);

            const row = document.createElement("tr");
            row.dataset.id = item.id;

            const productCell = document.createElement("td");

            const productBox = document.createElement("div");
            productBox.className = "cart-product";

            const image = document.createElement("img");
            image.className = "cart-image";
            image.src = product.thumbnail;
            image.alt = product.title; 

            // Länk runt bild
            const imageLink = document.createElement("a");
            imageLink.href = `product.html?id=${product.id}`;
            imageLink.append(image);

            const info = document.createElement("div");
            info.className = "cart-product-info";

            const name = document.createElement("p");
            name.textContent = product.title;

            // Länk runt titeln
            const nameLink = document.createElement("a");
            nameLink.href = `product.html?id=${product.id}`;
            nameLink.append(name);

            const removeButton = document.createElement("button");
            removeButton.type = "button";
            removeButton.textContent = "Remove";

            info.append(nameLink, removeButton);
            productBox.append(imageLink, info);
            productCell.append(productBox);

            // Styckpris
            const priceCell = document.createElement("td");
            priceCell.textContent = product.price.toFixed(2) + " kr";

            // Antal
            const quantityCell = document.createElement("td");

            const quantityBox = document.createElement("div");
            quantityBox.className = "cart-quantity";

            const minusButton = document.createElement("button");
            minusButton.type = "button";
            minusButton.textContent = "-";
            minusButton.setAttribute("aria-label", "Decrease quantity");

            const quantity = document.createElement("span");
            quantity.textContent = item.quantity;

            const plusButton = document.createElement("button");
            plusButton.type = "button";
            plusButton.textContent = "+";
            plusButton.setAttribute("aria-label", "Increase quantity");

            quantityBox.append(minusButton, quantity, plusButton);
            quantityCell.append(quantityBox);

            // Radsumma
            const totalCell = document.createElement("td");
            row.dataset.total = product.price * item.quantity;
            totalCell.textContent = (product.price * item.quantity).toFixed(2) + " kr";

            // Sätt ihop och visa raden
            row.append(productCell, priceCell, quantityCell, totalCell);
            cartItems.append(row);
            updateTotalPrice();

            // Öka antal
            plusButton.addEventListener("click", () => {
                item.quantity = item.quantity + 1;
                setQuantityInCart(item.id, item.quantity);

                quantity.textContent = item.quantity;
                totalCell. textContent = (product.price * item.quantity).toFixed(2) + " kr";

                row.dataset.total = product.price * item.quantity;
                updateTotalPrice();
                updateCartBadge();
            });

            // Minska antal
            minusButton.addEventListener("click", () => {
                if (item.quantity > 1) {
                    item.quantity = item.quantity - 1;
                    setQuantityInCart(item.id, item.quantity);

                    quantity.textContent = item.quantity;
                    totalCell.textContent = (product.price * item.quantity).toFixed(2) + " kr"

                    row.dataset.total = product.price * item.quantity;
                    updateTotalPrice();
                    updateCartBadge();
                }
            })

            // Ta bort vara
            removeButton.addEventListener("click", () => {
                removeFromCart(item.id);
                row.remove();
                updateTotalPrice();
                updateCartBadge();

                cartEmpty.hidden = getCart().length > 0;
            });
        }

            // Dölj laddningstexten
            cartStatus.hidden = true;

            checkoutButton.disabled = getCart().length === 0;

            } catch (error) {
                cartStatus.textContent = "Could not load all cart items. Please reload the page";
                cartStatus.hidden = false;

                console.error(error);
            }
            }

function updateTotalPrice() {
    let total = 0;

    const rows = cartItems.querySelectorAll("tr[data-total]");

    for (const row of rows) {
        total = total + Number(row.dataset.total);
    }
    cartTotal.textContent = total.toFixed(2) + " kr";
}

checkoutButton.addEventListener("click", () => {
    if (getCart().length === 0) {
        return;
    }

    clearCart();

    const rows = cartItems.querySelectorAll("tr[data-id]");

    for (const row of rows) {
        row.remove();
    }

    updateTotalPrice();

    cartEmpty.querySelector("td").textContent = "Thank you for your order! Your purchase is complete";
    cartEmpty.hidden = false;

    checkoutButton.disabled = true;
    updateCartBadge();

    setTimeout(() => {
        cartEmpty.querySelector("td").textContent = "Your cart is empty";
      }, 4000);
})


showCart()