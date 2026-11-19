// Fetch-funktioner för produkter (GET, POST, PUT, DELETE) mot DummyJSON.
// TODO: Felhantering för API-anrop (try/catch)

const BASE_URL = "https://dummyjson.com/products";
const limit = 40;
const skip = 0;
const select = "id,title,price,thumbnail,category";

export async function fetchAllProducts() {
    const response = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}&select=${select}`);
    const data = await response.json();
    return {
        products: data.products,
        total: data.total,
    };
}

export async function fetchSingleProduct(id) {
    const response = await fetch(`${BASE_URL}/${id}`);
    const data = await response.json();
    return data;
}

export async function addNewProduct(product) {
    const response = await fetch(`${BASE_URL}/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });
    const data = await response.json();
    return data;
}

export async function searchProducts(query) {
    const response = await fetch(
        `${BASE_URL}/search?q=${encodeURIComponent(query)}&limit=${limit}&select=${select}`
    );
    const data = await response.json();
    return data.products;
}