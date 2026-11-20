# Att göra (prioritetsordning)

Deadline **24 november**. Börja högst upp.

---

## Gör först – funkar det som det ska?

### 1. Felhantering
Kolla att alla API-anrop har try/catch, loading och ett begripligt felmeddelande.  
*Filer: `products.js`, `product.js`, `api.js`, övriga sidor*

- [x]

### 2. Create ska använda sync-funktionen
Använd `saveProductToLocalStorage` vid create (samma mönster som update), istället för manuell push + save.  
*Filer: `storage.js`, `products.js`*

- [x]

### 3. När ska katalogen uppdateras?
`refreshCatalog` körs vid load och create. Bestäm om update/delete från detaljsidan också ska synas i listan (t.ex. via LocalStorage).  
*Filer: `products.js`, `product.js`*

- [x] Ja – update/delete speglas i LocalStorage (`saveProductToLocalStorage` / `removeProductFromLocalStorage`), så listan visar ändringarna vid nästa load.

### 4. Uppdatera varukorgen i UI
När man klickar "lägg i varukorg" på ett produktkort ska header-badge/räknaren uppdateras direkt.  
*Filer: `products.js`, ev. `navigation.js`*

- [ ]

### 5. Antal i varukorg
I `setQuantityInCart`: om antalet är ogiltigt eller ≤ 0 tas raden bort. Är det det beteendet ni vill ha?  
*Fil: `storage.js`*

- [ ]

---

## Därefter – synlig polish innan video

### 6. Breadcrumbs
Visa kategori eller sökfråga i brödsmulorna, inte alltid "All products".  
*Filer: `products.html` + JS*

- [ ]

### 7. Inga fula alert/confirm
Byt till egna modaler om ni vill ha det snyggt – eller bestäm en gemensam standard i gruppen.  
*Filer: `products.js`, `product.js`*

- [ ]

### 8. Favoritikoner
Två SVG-filer: fyllt och tomt hjärta (istället för ♥/♡-text).  
*Filer: `products.js`, ev. `product.js` + `assets/`*

- [ ]

### 9. Gemensam form-styling
Samma look för add- och edit-formulär (knappar, layout). Filter-modal kan följa samma mönster.  
*Fil: `css/style.css`*

- [ ]

### 10. Bättre storage fil
Ställ denna fråga igen efter att ha allas kod: är det något storage funktion jag saknar? någon jag borde ändra eller slå ihop?.  
*Fil: `storage.js`*

- [ ]



---

## Om tid över

### 11. Load more / infinite scroll
Byt pagination (Previous/Next) mot "ladda mer" eller scroll-laddning.  
*Filer: `products.html`, `products.js`*

- [ ]

### 12. Fler bilder på detaljsidan
En stor bild + små thumbnails från API:ets `images[]`.  
*Filer: `product.js`, `product.html`*

- [ ]

### 13. Mer info från API
T.ex. rating, stock, brand, reviews – om det passar designen.  
*Filer: `product.js`, `product.html`*

- [ ]

---

Kurskrav och faser: se `PROJECT_PLAN.md`.
