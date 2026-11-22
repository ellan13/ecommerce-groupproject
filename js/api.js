// Fetch-funktioner för produkter (GET, POST, PUT, DELETE) mot DummyJSON.

const BASE_URL = "https://dummyjson.com/products";
const select = "id,title,price,thumbnail,category";

export async function fetchAllProducts() {
    const response = await fetch(`${BASE_URL}?limit=0&select=${select}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch products (${response.status})`);
    }

    const data = await response.json();
    return {
        products: data.products,
        total: data.total,
    };
}

export async function fetchSingleProduct(id) {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error(`Product ${id} not found (${response.status})`);
    }

    return response.json();
}

export async function addNewProduct(product) {
    const response = await fetch(`${BASE_URL}/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        throw new Error(`Failed to create product (${response.status})`);
    }

    return response.json();
}

export async function updateProduct(id, product) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        throw new Error(`Failed to update product ${id} (${response.status})`);
    }

    return response.json();
}

export async function deleteProduct(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error(`Failed to delete product ${id} (${response.status})`);
    }

    return response.json();
}


export async function searchProducts(query) {
    const response = await fetch(
        `${BASE_URL}/search?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
        throw new Error("Search failed");
    }

    const data = await response.json();
    return data.products;
}