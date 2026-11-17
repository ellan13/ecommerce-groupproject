// LocalStorage-hjälpare för favoriter, varukorg och Create/Update/Delete-ändringar.
const PRODUCTS_KEY = "productsCache";
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

export function setQuantity(productId, quantity) {
  const amount = Number(quantity);

  // TODO: kolla isFinie funktionen. NNär skulle detta hända? Detta betyder iaf att amount inte är ett tal(är ogiltigt) eller 0 så ta bort raden
  if (!Number.isFinite(amount) || amount <= 0) {
    removeFromCart(productId);
    return;
  }

  const cart = getCart();
  const item = cart.find((item) => item.id === productId);

  if (item) {
    item.quantity = amount;
  } else {
    cart.push({ id: productId, quantity: amount });
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

export function getCachedProducts() {
  const raw = localStorage.getItem(PRODUCTS_KEY);
  if (!raw) return null;

  const cache = JSON.parse(raw);
  const isFresh = Date.now() - cache.savedAt < MAX_AGE_MS;
  if (!isFresh) return null;

  return { products: cache.products, total: cache.total };
}

export function saveProducts(products, total) {
  localStorage.setItem(
    PRODUCTS_KEY,
    JSON.stringify({ savedAt: Date.now(), products, total })
  );
}
