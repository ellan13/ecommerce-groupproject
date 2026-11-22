const newsGrid = document.querySelector("#news-grid");
const bestsellersGrid = document.querySelector("#bestsellers-grid");
const heroImage = document.querySelector("#hero-image");

// Hämtar produkter från DummyJSON
async function getProducts(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.products;
}

// Skapar ett kort för varje produkt
function showProducts(container, products) {
  container.innerHTML = "";

  products.forEach(function (product) {
    const card = document.createElement("article");
    card.className = "product-card";

    const link = document.createElement("a");
    link.href = "product.html?id=" + product.id;

    const img = document.createElement("img");
    img.src = product.thumbnail;
    img.alt = product.title;

    link.append(img);
    card.append(link);
    container.append(card);
  });
}

async function loadHome() {
  newsGrid.textContent = "Loading...";
  bestsellersGrid.textContent = "Loading...";

  try {
    const news = await getProducts("https://dummyjson.com/products?limit=6");
    showProducts(newsGrid, news);

    const best = await getProducts(
      "https://dummyjson.com/products?limit=6&sortBy=rating&order=desc"
    );
    showProducts(bestsellersGrid, best);
  } catch (error) {
    console.error(error);
    newsGrid.textContent = "Could not load products.";
    bestsellersGrid.textContent = "Could not load products.";
  }
}

// Hämtar en produkt och använder dess bild som hero-bild
async function loadHeroImage() {
  try {
    const response = await fetch("https://dummyjson.com/products/6");
    const product = await response.json();

    console.log("Hero-produkt:", product);

    heroImage.src = product.images[0];
    heroImage.alt = product.title;
  } catch (error) {
    console.error("Hero-bilden gick fel:", error);
  }
}

loadHeroImage();
loadHome();