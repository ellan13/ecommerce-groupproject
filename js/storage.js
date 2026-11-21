// LocalStorage-hjälpare för favoriter, varukorg och Create/Update/Delete-ändringar.
const PRODUCTS_KEY = "products";
const CART_KEY = "cart";
const FAVORITES_KEY = "favorites";
const MAX_AGE_MS = 1000 * 60 * 30; // 30 min

export function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) ?? [];
}

export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) ?? [];
}

export function addToCart(productId) {
  const cart = getCart();
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function removeFromCart(productId) {
  const cart = getCart().filter((item) => item.id !== productId);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
// Ella
export function clearCart() {
  localStorage.setItem(CART_KEY, JSON.stringify([]));
}
//Ella
export function setQuantityInCart(productId, quantity) {
  const newQuantity = Number(quantity);

  // INFO: ogiltigt antal eller ≤ 0 → ta bort raden
  if (!Number.isFinite(newQuantity) || newQuantity <= 0) {
    removeFromCart(productId);
    return;
  }

  const cart = getCart();
  const item = cart.find((item) => item.id === productId);

  if (item) {
    item.quantity = newQuantity;
  } else {
    cart.push({ id: productId, quantity: newQuantity });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToFavorites(productId) {
  const favorites = getFavorites();
  if (!favorites.includes(productId)) {
    favorites.push(productId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFromFavorites(productId) {
  const favorites = getFavorites().filter((id) => id !== productId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function toggleFavorite(productId) {
  if (getFavorites().includes(productId)) {
    removeFromFavorites(productId);
  } else {
    addToFavorites(productId);
  }
}

function readProductsData() {
  const dataAsText = localStorage.getItem(PRODUCTS_KEY);
  if (!dataAsText) return null;

  const data = JSON.parse(dataAsText);
  return {
    products: data.products ?? [],
    total: data.total ?? 0,
    savedAt: data.savedAt ?? 0,
  };
}

// INFO: returnerar null om äldre än 30 min så listan refetchas
export function getProductsFromLocalStorage() {
  const data = readProductsData();
  if (!data) return null;

  const isFresh = Date.now() - data.savedAt < MAX_AGE_MS;
  if (!isFresh) return null;

  return { products: data.products, total: data.total };
}

export function getProductFromLocalStorage(id) {
  const data = readProductsData();
  if (!data) return null;

  return data.products.find((product) => Number(product.id) === Number(id)) ?? null;
}

export function saveProductsToLocalStorage(products, total) {
  const dataAsText = JSON.stringify({
    savedAt: Date.now(),
    products,
    total,
  });

  localStorage.setItem(PRODUCTS_KEY, dataAsText);
}

// INFO: sparar en produkt lokalt – lägger till om den är ny, uppdaterar om den finns
export function saveProductToLocalStorage(product) {
  const data = readProductsData() ?? { products: [], total: 0 };
  const index = data.products.findIndex((item) => Number(item.id) === Number(product.id));

  if (index === -1) {
    data.products.push(product);
    data.total += 1;
  } else {
    data.products[index] = { ...data.products[index], ...product };
  }

  saveProductsToLocalStorage(data.products, data.total);
}

export function removeProductFromLocalStorage(id) {
  const data = readProductsData();
  if (!data) return;

  const products = data.products.filter((item) => Number(item.id) !== Number(id));
  saveProductsToLocalStorage(products, Math.max(0, data.total - 1));
}
