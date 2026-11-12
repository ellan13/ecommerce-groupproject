// Favoritsida: visa och ta bort favoriter från LocalStorage.

const backLink = document.querySelector("#back-link")

backLink.addEventListener("click", (e) => {
    if (history.length > 1) {
        e.preventDefault();
        history.back();
    }
});