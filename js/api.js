// Fetch-funktioner för produkter (GET, POST, PUT, DELETE) mot DummyJSON.

const BASE_URL = "https://dummyjson.com/products";
const BATCH_SIZE = 40; // DummyJSON ger max 40 produkter per anrop
const select = "id,title,price,thumbnail,category";

// INFO: hämta i batcher (0–39, 40–79, …) tills vi har alla
export async function fetchAllProducts() {
    let allFetchedProducts = [];
    let totalInApi = 0;

    do {
        const skip = allFetchedProducts.length; // hoppa över det vi redan har
        const response = await fetch(
            `${BASE_URL}?limit=${BATCH_SIZE}&skip=${skip}&select=${select}`
        );
        if (!response.ok) {
            throw new Error(`Failed to fetch products (${response.status})`);
        }

        const data = await response.json();
        totalInApi = data.total;
        allFetchedProducts = allFetchedProducts.concat(data.products);
    } while (allFetchedProducts.length < totalInApi);

    return { products: allFetchedProducts, total: totalInApi };
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
