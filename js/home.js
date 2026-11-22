// API URL
const API_URL = "https://dummyjson.com/products";


// HTML elements
const heroContent = document.getElementById("hero-content");

const newsGrid = document.getElementById("news-grid");

const bestSellersGrid = document.getElementById("best-sellers-grid");


// Get products from API
async function getProducts() {

    try {

        const response = await fetch(`${API_URL}?limit=13`);

        if (!response.ok) {
            throw new Error("Could not fetch products");
        }

        const data = await response.json();

        return data.products;

    } catch (error) {

        console.error("Error fetching products:", error);

        heroContent.innerHTML = "<p>Could not load hero product.</p>";

        newsGrid.innerHTML = "<p>Could not load products.</p>";

        bestSellersGrid.innerHTML = "<p>Could not load products.</p>";

    }

}


// Show hero product
function showHeroProduct(product) {

    heroContent.innerHTML = `

        <div class="hero-image">

            <img src="${product.thumbnail}" alt="${product.title}">

        </div>

        <div class="hero-content">

            <h1>${product.title}</h1>

            <p>${product.description}</p>

            <p class="hero-price">
                $${product.price}
            </p>

           <a href="products.html" class="hero-btn">
    See products
</a>

        </div>

    `;

}


// Create product card
function createProductCard(product) {

    return `

        <article class="product-card">

            <a href="product.html?id=${product.id}">

                <img
                    src="${product.thumbnail}"
                    alt="${product.title}"
                >

                <h3>${product.title}</h3>

                <p>$${product.price}</p>

            </a>

        </article>

    `;

}


// Show products in a section
function showProducts(products, container) {

    container.innerHTML = "";

    products.forEach(function (product) {

        container.innerHTML += createProductCard(product);

    });

}


// Load homepage products
async function loadHomePage() {

    const products = await getProducts();

    if (!products) {
        return;
    }

    // First product is used for hero
    showHeroProduct(products[0]);


    // News products
    const newsProducts = products.slice(1, 7);

    showProducts(newsProducts, newsGrid);


    // Best sellers products
    const bestSellerProducts = products.slice(7, 13);

    showProducts(bestSellerProducts, bestSellersGrid);

}


// Start homepage
loadHomePage();