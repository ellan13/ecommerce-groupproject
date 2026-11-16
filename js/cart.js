// Varukorg: visa varor, ändra antal, totalsumma och simulerat köp.

const backLink = document.querySelector("#back-link")

backLink.addEventListener("click", (e) => {
    if (history.length > 1) {
        e.preventDefault();
        history.back();
    }
});