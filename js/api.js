// Fetch-funktioner för produkter (GET, POST, PUT, DELETE) mot DummyJSON.

const BASE_URL = "https://dummyjson.com/products";
const limit = 40;
const skip = 0;
const select = "id,title,price,thumbnail,category";

export async function fetchAllProducts() {
    try {
        const response = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}&select=${select}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch products (${response.status})`);
        }
        const data = await response.json();
        return {
            products: data.products,
            total: data.total,
        };
    } catch (error) {
        console.error("fetchAllProducts:", error);
        throw error;
    }
}

export async function fetchSingleProduct(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) {
            throw new Error(`Product ${id} not found (${response.status})`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("fetchSingleProduct:", error);
        throw error;
    }
}

export async function addNewProduct(product) {
    try {
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
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("addNewProduct:", error);
        throw error;
    }
}

export async function updateProduct(id, product) {
    try {
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
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("updateProduct:", error);
        throw error;
    }
}

export async function deleteProduct(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Failed to delete product ${id} (${response.status})`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("deleteProduct:", error);
        throw error;
    }
}
