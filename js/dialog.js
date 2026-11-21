// Egna modaler istället för window.alert och window.confirm.
// Toast: kort feedback som försvinner av sig själv (setTimeout).

let toastHideTimer;

// INFO: visar en ruta några sekunder, sedan tas den bort
export function showToast(message, durationMs = 3000) {
    let toast = document.getElementById("app-toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "app-toast";
        toast.className = "app-toast";
        toast.setAttribute("role", "status");
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("is-visible");

    clearTimeout(toastHideTimer);
    toastHideTimer = setTimeout(() => {
        toast.classList.remove("is-visible");
    }, durationMs);
}

// INFO: returnerar en Promise så vi kan använda await (vänta tills användaren klickar)
export function showAlert(message) {
    return new Promise((resolve) => {
        const overlay = document.createElement("div");
        overlay.className = "app-dialog-overlay";
        overlay.innerHTML = `
            <div class="app-dialog">
                <p class="app-dialog-message"></p>
                <div class="app-dialog-actions">
                    <button type="button" class="save-btn" id="dialog-ok-btn">OK</button>
                </div>
            </div>
        `;

        overlay.querySelector(".app-dialog-message").textContent = message;

        function close() {
            overlay.remove();
            resolve();
        }

        overlay.querySelector("#dialog-ok-btn").addEventListener("click", close);
        // INFO: klick utanför rutan = stäng
        overlay.addEventListener("click", (event) => {
            if (event.target === overlay) {
                close();
            }
        });

        document.body.appendChild(overlay);
    });
}

export function showConfirm(message) {
    return new Promise((resolve) => {
        const overlay = document.createElement("div");
        overlay.className = "app-dialog-overlay";
        overlay.innerHTML = `
            <div class="app-dialog">
                <p class="app-dialog-message"></p>
                <div class="app-dialog-actions">
                    <button type="button" class="cancel-btn" id="dialog-cancel-btn">Cancel</button>
                    <button type="button" class="delete-btn" id="dialog-ok-btn">Delete</button>
                </div>
            </div>
        `;

        overlay.querySelector(".app-dialog-message").textContent = message;

        function close(answer) {
            overlay.remove();
            resolve(answer);
        }

        overlay.querySelector("#dialog-ok-btn").addEventListener("click", () => {
            close(true);
        });
        overlay.querySelector("#dialog-cancel-btn").addEventListener("click", () => {
            close(false);
        });
        overlay.addEventListener("click", (event) => {
            if (event.target === overlay) {
                close(false);
            }
        });

        document.body.appendChild(overlay);
    });
}
