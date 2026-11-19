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
const cartEmpty = document.querySelector("#cart-empty");
const cartStatus = document.querySelector("#cart-status");

// Läs sparad varukorg
const cart = getCart();
cartEmpty.hidden = cart.length > 0;
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
    cartStatus.textContent = "Loading cart...";
    cartStatus.hidden = false;
    
try{
    for (const item of cart) {
        const product = await fetchSingleProduct(item.id);

        console.log(product);
        console.log("Antal: ", item.quantity);

        const row = document.createElement("tr");
        row.dataset.id = item.id;

        const productCell = document.createElement("td");

        const productBox = document.createElement("div");
        productBox.className = "cart-product";

        const image = document.createElement("img");
        image.className = "cart-image";
        image.src = product.thumbnail;
        image.alt = product.title; 

        const info = document.createElement("div");
        info.className = "cart-product-info";

        const name = document.createElement("p");
        name.textContent = product.title;

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.textContent = "Remove";

        info.append(name, removeButton);
        productBox.append(image, info);
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
            setQuantity(item.id, item.quantity);

            quantity.textContent = item.quantity;
            totalCell. textContent = (product.price * item.quantity).toFixed(2) + " kr";

            row.dataset.total = product.price * item.quantity;
            updateTotalPrice();
        });

        // Minska antal
        minusButton.addEventListener("click", () => {
            if (item.quantity > 1) {
                item.quantity = item.quantity - 1;
                setQuantity(item.id, item.quantity);

                quantity.textContent = item.quantity;
                totalCell.textContent = (product.price * item.quantity).toFixed(2) + " kr"

                row.dataset.total = product.price * item.quantity;
                updateTotalPrice();
            }
        })

        // Ta bort vara
        removeButton.addEventListener("click", () => {
            removeFromCart(item.id);
            row.remove();
            updateTotalPrice();

            cartEmpty.hidden = getCart().length > 0;
        });
    }

        // Dölj laddningstexten
        cartStatus.hidden = true;

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

showCart()