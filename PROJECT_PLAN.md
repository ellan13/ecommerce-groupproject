# Projektplan – E-commerce Web Application

Grupprojekt · HTML · CSS · Vanilla JavaScript · DummyJSON

| | |
| --- | --- |
| **Deadline** | 24 november 2026, kl. 23:59 |
| **Muntlig redovisning** | 25 november 2026 |
| **Gruppstorlek** | 3 personer |
| **API** | [DummyJSON Products](https://dummyjson.com/docs/products) |

---

## 1. Projektets mål

Vi ska utveckla en fungerande e-handelswebbplats med HTML, CSS och JavaScript.

Webbplatsen ska använda DummyJSON Products API för att hämta och hantera produkter. Användaren ska kunna bläddra, söka, filtrera, sortera, favoritmarkera, använda varukorg och genomföra ett simulerat köp.

**Prioriteringar**

- Uppfylla samtliga obligatoriska kurskrav.
- Hålla JavaScript-koden enkel, tydlig och återanvändbar.
- Arbeta i egna Git-branches och använda Pull Requests.
- Minimera merge conflicts genom att fördela uppgifter i Discord.
- Se till att alla tre förstår och kan förklara projektets kod.

---

## 2. Hur vi delar den här planen

Den här filen ligger i GitHub-repot så att alla ser samma översikt. Vem som gör vad bestäms i **Discord** — kryssa gärna i listan nedan när något är klart, men ni behöver inte uppdatera planen för varje claim.

---

## 3. Webbplatsens sidor

Vi bygger **fem HTML-sidor**. CRUD integreras i katalogen och detaljsidan (ingen separat admin-sida).

| Sida | Syfte |
| --- | --- |
| `index.html` | Startsida med utvalda produkter och länk till katalogen |
| `products.html` | Produktkatalog, sökning, filtrering, sortering och **Create** |
| `product.html` | Produktdetaljer, varukorg, favorit samt **Update** och **Delete** |
| `favorites.html` | Visa och ta bort favoriter |
| `cart.html` | Varukorg, antal, totalbelopp och simulerat köp |

### CRUD

| Operation | Var | Vad som händer |
| --- | --- | --- |
| **Create** | `products.html` | Formulär → `POST` till API → spegla lokalt i LocalStorage → uppdatera UI |
| **Read** | `products.html`, `product.html`, `index.html` | `GET` från API (+ lokal overlay) |
| **Update** | `product.html` | Formulär → `PUT`/`PATCH` till API → spegla lokalt → uppdatera UI |
| **Delete** | `product.html` | Bekräftelse → `DELETE` till API → spegla lokalt → uppdatera UI |

DummyJSON simulerar Create, Update och Delete och sparar **inte** permanent på servern. Vi skickar ändå riktiga API-anrop **och** speglar resultatet lokalt i LocalStorage så att gränssnittet ser ut att uppdateras.

---

## 4. Filstruktur

```text
ecommerce-groupproject/
├── index.html
├── products.html
├── product.html
├── favorites.html
├── cart.html
├── css/
│   └── main.css
├── js/
│   ├── api.js
│   ├── storage.js
│   ├── navigation.js
│   ├── home.js
│   ├── products.js
│   ├── product.js
│   ├── favorites.js
│   └── cart.js
├── assets/
├── PROJECT_PLAN.md
└── README.md
```

**Princip:** Varje HTML-sida har en egen JS-fil. Delad logik ligger i `api.js` och `storage.js`.

---

## 5. Tekniska överenskommelser

| Område | Överenskommelse |
| --- | --- |
| Språk | HTML5, CSS3, Vanilla JS |
| Moduler | ES Modules (`type="module"`) |
| API | DummyJSON Products |
| API-anrop | `fetch` + `async/await` + `try/catch` |
| Favoriter | LocalStorage (lista med produkt-ID:n) |
| Varukorg | LocalStorage (produkt-ID + antal) |
| CRUD-persistens i UI | LocalStorage-overlay ovanpå API-svar |
| Priser | USD enligt DummyJSON |
| Loading | Textmeddelande vid alla API-anrop |
| Timer | `setTimeout()` för köpbekräftelse |
| Navigation | Vanliga HTML-länkar mellan fem sidor + hamburgermeny |
| Design | Bestäms gemensamt utifrån low-fi-skissen |

### Gemensamma funktionsnamn (bestäm tidigt)

```js
addToCart(product);
toggleFavorite(product);
isFavorite(productId);
```

Alla som bygger produktkort eller detaljsida ska använda samma namn så att favoriter och varukorg fungerar överallt.

### LocalStorage – vad vi lagrar och varför

| Nyckel (förslag) | Innehåll | Varför |
| --- | --- | --- |
| `favorites` | Array med produkt-ID:n | Favoriter ska finnas kvar mellan sidladdningar |
| `cart` | Array med `{ id, quantity }` | Varukorgen ska synkas mellan sidor |
| `productOverrides` (eller liknande) | Skapade/uppdaterade/borttagna produkter | Så CRUD syns i UI trots att DummyJSON inte sparar |

Exakta nyckelnamn och format låses under **Fas 0**.

---

## 6. Arbetsordning – faser

Arbeta i fasordning. Börja inte nästa fas innan föregående fas har en stabil grund i `main` (mindre konflikter, enklare integration).

```text
Fas 0 → Fas 1 → Fas 2 → Fas 3 → Fas 4 → Fas 5
```

### Fas 0 – Överenskommelser (första mötet)

- Designriktning utifrån low-fi-skissen
- Gemensamma funktionsnamn
- LocalStorage-format för favoriter, varukorg och CRUD-overlay
- Kort överenskommelse i Discord om vem som tar vad i Fas 1

### Fas 1 – Grundstruktur (10–11 november)

- Filstruktur
- HTML-skelett för alla fem sidor
- Header, navigation, footer, hamburgermeny
- Gemensam CSS (knappar, produktkort, layout, breakpoints)
- Första PR mergad till `main`

### Fas 2 – API och grundläggande sidor (12–15 november)

- `api.js` med GET/POST/PUT/DELETE
- Produktkatalog och produktdetalj
- Startsida med utvalda produkter
- Grundskelett för favoriter och varukorg

### Fas 3 – Funktionalitet (16–19 november)

- Sökning, filtrering och sortering (kombinerat)
- CRUD + lokal LocalStorage-simulering
- Favoriter och varukorg
- Simulerat köp + `setTimeout`-bekräftelse
- Loading states och felhantering

### Fas 4 – Integration (20–21 november)

- Koppla ihop funktioner mellan sidor
- Responsivitet (mobil, surfplatta, dator)
- Tillgänglighet (WCAG 2.2 AA där det är relevant)
- Buggfix

### Fas 5 – Inlämning (22–24 november)

- Skriv `README.md` (vänta tills projektet är klart – filer och struktur kan ändras under vägen)
- Demonstrationsvideo
- Öva muntlig redovisning
- Lämna in GitHub-länk + video på Itslearning

---

## 7. Uppgifter att välja bland

Välj en uppgift i Discord, skapa branch, öppna PR. Kryssa i när det är mergat. Jobba fasvis — börja inte Fas 3 innan Fas 1–2 finns i `main`.

### Fas 1 – Grundstruktur

- [ ] Projektstruktur + HTML-skelett (`feature/project-structure`)
- [ ] Header, footer, navigation, hamburgermeny (`feature/navigation`)
- [ ] Gemensam CSS (`feature/base-css`)

### Fas 2 – API och sidor

- [ ] `api.js` – GET/POST/PUT/DELETE (`feature/api`)
- [ ] Produktkatalog (`feature/products-list`)
- [ ] Produktdetalj (`feature/product-detail`)
- [ ] Startsida med utvalda produkter (`feature/home`)
- [ ] Favoriter – HTML-grund (`feature/favorites-shell`)
- [ ] Varukorg – HTML-grund (`feature/cart-shell`)

### Fas 3 – Funktionalitet

- [ ] Sök, filter, sortering (`feature/product-filters`)
- [ ] Create + lokal overlay (`feature/product-create`)
- [ ] Update/Delete + lokal overlay (`feature/product-edit-delete`)
- [ ] Favoriter + LocalStorage (`feature/favorites`)
- [ ] Varukorg + LocalStorage (`feature/cart`)
- [ ] Simulerat köp + `setTimeout` (`feature/checkout`)
- [ ] Loading states och felmeddelanden (`feature/loading-errors`)

### Fas 4–5 – Integration och inlämning

- [ ] Responsivitet + tillgänglighet (`feature/a11y-responsive`)
- [ ] README + demovideo-checklista (`feature/docs-handoff`)
- [ ] Spela in demovideo
- [ ] Öva muntlig redovisning
- [ ] Lämna in på Itslearning

**Tips:** `api.js` bör in tidigt i Fas 2. Synka `main.css`, `api.js` och `storage.js` i Discord innan ni ändrar dem parallellt.

---

## 8. Git-arbetsprocess

```text
main (stabil)
  ↑ PR + review
feature/... (en uppgift i taget)
```

### Steg

```bash
git switch main
git pull origin main
git switch -c feature/din-uppgift

# … arbeta …
git add .
git commit -m "Add short description of change"
git push -u origin feature/din-uppgift
```

Skapa sedan Pull Request på GitHub (`feature/...` → `main`). En annan gruppmedlem granskar innan merge.

### Regler

1. Ingen pushar direkt till `main`.
2. Säg till i Discord innan du börjar, så ni inte tar samma sak.
3. Jobba främst i filerna för din uppgift; synka `main.css`, `api.js` och `storage.js` i Discord.
4. Gör små PR:er hellre än en stor.
5. Uppdatera `main` innan du skapar ny branch.
6. Testa innan du öppnar PR.

---

## 9. Definition of Done

En uppgift är klar först när:

- Den uppfyller kursens krav för området.
- Den fungerar utan JavaScript-fel i konsolen.
- Den visar begriplig återkoppling vid lycka och fel (inkl. loading där API används).
- Den fungerar på mobil och dator.
- Den går att använda med tangentbord där det är relevant.
- Koden har tydliga namn och är begriplig för övriga gruppen.
- Den har granskats och mergats via Pull Request.

---

## 10. Inlämning och muntlig redovisning

### GitHub

Repot ska innehålla all HTML, CSS och JavaScript. `README.md` skrivs i Fas 5 när projektet är klart (projektbeskrivning, hur man startar sidan, arbetsfördelning). Under projektet är **den här filen** (`PROJECT_PLAN.md`) den gemensamma källan.

### Video (Itslearning, inte GitHub)

Videon ska visa:

- Navigation och mobilmeny
- Produktkatalog och produktdetaljer
- Hämtning från API
- CRUD-operationer
- Sökning, filtrering, sortering
- Favoritlista
- Varukorg och kassa
- Simulerat köp och bekräftelse
- Loading states
- LocalStorage
- `setTimeout` / `setInterval`
- Responsiv design

Ingen audio krävs.

### Muntlig redovisning

Alla tre ska kunna förklara:

- HTML, CSS och JavaScript i projektet
- Fetch API och CRUD
- LocalStorage
- `setTimeout`
- Responsivitet och tillgänglighet
- Git / Pull Requests och hur ni samarbetat

---

## 11. Kurskrav – snabbcheck

Använd före inlämning:

- [ ] Minst fyra sidor/vyer med navigation (vi har fem)
- [ ] Produkter från DummyJSON
- [ ] Create, Read, Update, Delete via UI + API
- [ ] Sök, filter, sort tillsammans + tomt resultat
- [ ] Favoriter med LocalStorage
- [ ] Varukorg med antal, total, simulerat köp, tömning, bekräftelse
- [ ] Loading states + felhantering
- [ ] LocalStorage eller SessionStorage
- [ ] `setTimeout` eller `setInterval` med tydligt syfte
- [ ] Header, nav, hamburgermeny
- [ ] Responsiv design
- [ ] Tillgänglighet (WCAG 2.2 AA där relevant)
- [ ] Semantisk HTML, strukturerad CSS, återanvändbara JS-funktioner
- [ ] Inga konsolfel

---

Lycka till – välj något i Fas 1 i Discord och börja där.
