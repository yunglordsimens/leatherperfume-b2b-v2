# Leather Parfum B2B — Theme Customizations

Complete list of every file created or modified for the B2B wholesale theme on branch `claude/react-to-shopify-hero-lfeDP`.

---

## Assets

| File | What changed |
|------|-------------|
| `assets/base.css` | Added Yeseva One heading override (`h1–h6`); header icons (cart/search/account) fixed at 22×22 (Dawn forced the cart icon to 44px); breakpoints left at Dawn default 990px |
| `assets/YesevaOne-Regular.woff2` | Custom font file added |

---

## Layout

| File | What changed |
|------|-------------|
| `layout/theme.liquid` | Added `@font-face` for Yeseva One with `font-display: swap`; JS redirect guard `/account/login → /pages/partner-login` |
| `layout/password.liquid` | B2B-styled password/coming-soon page |

---

## Config

| File | What changed |
|------|-------------|
| `config/settings_data.json` | Theme settings updated (font, colours, etc.) |
| `config/settings_schema.json` | Schema updated to match theme settings |

---

## Templates

| File | Type | Description |
|------|------|-------------|
| `templates/cart.json` | Modified | Added cart-items-b2b reference |
| `templates/collection.json` | Modified | Default for every collection: catalog-header + catalog-sidebar + product-grid-b2b-logged-in |
| `templates/collection.wholesale.json` | Created | Same layout as collection.json |
| `templates/collection.partner-collection.json` | Created | Same layout as collection.json |
| `templates/index.json` | Modified | Homepage template |
| `templates/product.json` | Modified | Standard product template |
| `templates/product.b2b.json` | Created | B2B product template using `product-b2b` section |
| `templates/404.json` | Modified | Uses `main-404-b2b` section |
| `templates/password.json` | Modified | Uses `main-password-b2b` section |
| `templates/page.about-us.json` | Created | About Us page |
| `templates/page.contact-b2b.json` | Created | Contact page using `contact-b2b` section |
| `templates/page.dashboard.json` | Created | Partner dashboard page |
| `templates/page.invoices.json` | Created | Invoices list page |
| `templates/page.partner-dashboard.json` | Created | Partner dashboard with dashboard-header + dashboard-content |
| `templates/page.quick-reorder.json` | Created | Quick reorder page |
| `templates/page.wholesale-application.json` | Created | Wholesale apply form using `massy-form-wrapper` |
| `templates/page.wholesale-login.json` | Created | Wholesale login using `wholesale-login` section (handle: `partner-login`) |
| `templates/page.wholesale-packages.json` | Created | Packages page |

---

## Sections — Created

| File | Description |
|------|-------------|
| `sections/cart-items-b2b.liquid` | B2B cart items: `{% for item in cart.items %}`, image, SKU, name, variant/size, ±qty stepper with AJAX `/cart/change.js`, remove button, line total, empty state. Schema empty. |
| `sections/cart-summary-b2b.liquid` | B2B cart summary: MOQ progress bar (target 5000 CZK), PO number input, submit button. On submit: saves cart attributes via `/cart/update.js`, redirects to `/pages/thank-you`. |
| `sections/catalog-header.liquid` | Single catalog header: wholesale → "Create Order" / "Add products to your wholesale cart"; others → "Wholesale Catalog" / "Log in for B2B pricing" (links to partner login). Mobile filter toggle. (`catalog-header-b2b` merged in and deleted.) |
| `sections/catalog-cards.liquid` | Featured category cards for the B2B catalog. |
| `sections/catalog-sidebar.liquid` | Sidebar filters for B2B collection pages. |
| `sections/contact-b2b.liquid` | Contact page: email/phone/WhatsApp info cards (inline SVG, no React deps), contact form, office details. |
| `sections/cta-bottom.liquid` | Bottom CTA banner with customizable heading and button. |
| `sections/custom-mix-banner.liquid` | Promotional banner for custom fragrance mix. |
| `sections/dashboard-content.liquid` | Partner dashboard: order history, account details, quick actions. Auth gate redirects guests to `/pages/partner-login`. |
| `sections/dashboard-header.liquid` | Dashboard hero with company name and welcome message. |
| `sections/editorial-heritage.liquid` | Brand story / heritage editorial section. |
| `sections/hero-b2b.liquid` | Full-width B2B landing hero with headline, subheading, dual CTA buttons. |
| `sections/how-it-works.liquid` | 4-step "How to order" section; step numbers are links (set per step in the editor) with amber hover. |
| `sections/invoices-list.liquid` | Partner invoice list with status badges. Auth gate redirects to `/pages/partner-login`. |
| `sections/lp-top-bar.liquid` | 3-state announcement bar: guest (Apply CTA), pending (clock icon), wholesale (star + company name + discount tier + discount %). |
| `sections/main-404-b2b.liquid` | Custom 404 page styled for B2B. |
| `sections/main-password-b2b.liquid` | B2B-styled coming-soon / password page. |
| `sections/massy-form-wrapper.liquid` | Wrapper that applies B2B form styles to embedded Massy forms. Direct tag selectors, amber focus ring, 12px radii, body font on fields / Yeseva One on headings, phone-field prefix/icon padding fix. |
| `sections/packages-grid.liquid` | Wholesale packages grid display. |
| `sections/packages-wholesale.liquid` | Full wholesale packages section with pricing. |
| `sections/page-header-b2b.liquid` | Reusable B2B page header (title + breadcrumb). |
| `sections/product-b2b.liquid` | B2B product page: breadcrumbs, media gallery, RRP/WSP pricing (WSP hidden for guests), qty counter, "Add to Order" AJAX button. |
| `sections/product-grid-b2b.liquid` | Alternative standalone grid (not used by any template; can be added in the editor): qty stepper, AJAX add-to-cart, "Added!" toast, OOS chip, empty state. |
| `sections/product-grid-b2b-logged-in.liquid` | **Active catalog grid** (all collection templates). Floats beside catalog-sidebar and reacts to its filters. Wholesale: RRP + WSP + margin + qty + AJAX "Add to Order". Guests: RRP + "Log in for B2B price"; logged-in non-wholesale: "Apply for B2B pricing". |
| `sections/quick-reorder.liquid` | Past orders quick-reorder interface. Auth gate redirects to `/pages/partner-login`. |
| `sections/trust-bar.liquid` | Icon + text trust signals bar (shipping, support, etc.). |
| `sections/wholesale-login.liquid` | Split-panel login: left brand/benefits, right Shopify customer login form. Used by `page.wholesale-login.json` (handle: `partner-login`). |
| `sections/application-info.liquid` | Wholesale application info / explainer. |
| `sections/bottom-cta.liquid` | Alternate bottom CTA section. |
| `sections/about-craft-grid.liquid` | About page: craft/process photo grid. |
| `sections/about-hero.liquid` | About page hero. |
| `sections/about-image.liquid` | About page full-width image. |
| `sections/about-manifesto.liquid` | About page brand manifesto text section. |

---

## Sections — Modified

| File | What changed |
|------|-------------|
| `sections/header.liquid` | Custom B2B nav (wholesale vs guest split); account button routes: wholesale → `/pages/partner-dashboard`, logged-in → `/account`, guest → `/pages/partner-login`; account label shows `first_name` for wholesale; search SVG 22×22; cart SVG 22×22; lang switcher POST forms with double-submit guard. |
| `sections/footer.liquid` | "Partner Login" link → `/pages/partner-login`; "About Us" link → `/pages/about-us`. |
| `sections/main-account.liquid` | JS redirect guard: wholesale customers are sent to `/pages/partner-dashboard` instead of showing default account page. |

---

## Snippets — Created

| File | Description |
|------|-------------|
| `snippets/accessibility-panel.liquid` | High-contrast toggle panel. |
| `snippets/scroll-to-top.liquid` | Floating scroll-to-top button. |

## Snippets — Modified

| File | What changed |
|------|-------------|
| `snippets/predictive-search-overlay.liquid` | Replaced `{{ '...' | t }}` with hardcoded English strings to prevent "translation missing" errors; placeholder → "Search SKU or Fragrance…"; no focus ring on the search input |
| `snippets/header-drawer.liquid` | Mobile menu account link uses the same routing as the desktop header (dashboard / account / partner login) |

---

## Key Behaviour Notes (native Shopify B2B)

- **Partner detection**: `customer.b2b?` (customer belongs to a Shopify B2B company); the `wholesale` customer tag still works as a fallback.
- **Prices**: WSP = `variant.price`, which Shopify fills from the partner's B2B catalog — the storefront always shows what checkout will charge. RRP comes from the product metafield `custom.rrp` (money) because `compare_at_price` is empty for B2B buyers; without it guests see the regular price and partners see no RRP/margin. Helper: `snippets/money-meta-cents.liquid`.
- **Company name**: `customer.current_company.name` (metafield `custom.company_name` only as fallback). `custom.discount_tier` / `custom.discount_percentage` metafields are optional extras for the top bar.
- **Cart flow**: cart (`cart.json`: cart-items-b2b + cart-summary-b2b) → "Submit for Invoicing" saves PO number + notes as cart attributes → **Shopify checkout** (B2B: PO field, payment terms, submit for review). Shopify's order status page replaces the old fake thank-you page (removed).
- **Login**: `/pages/partner-login` (wholesale-login section) is a branded landing page whose button goes to `routes.account_login_url` — new customer accounts, one-time email code. No password form.
- **Quantity rules**: qty steppers in the catalog grid, product page and cart read `variant.quantity_rule` (min / increment / max).
- **MOQ**: 5000 CZK order-value bar in the cart summary (theme-side hint; per-product minimums belong in B2B quantity rules).
- **Auth gates**: Dashboard, quick reorder and invoices are for B2B partners only: guests get a login prompt, logged-in retail customers an "Apply for partnership" prompt. Order links go to `order.customer_url` (Shopify customer account).
- **Catalog layout**: catalog-sidebar (float left) + product-grid-b2b-logged-in (float right); `#MainContent` is `display: flow-root` on catalog pages so the footer never wraps beside the sidebar.
- **Font**: Yeseva One loaded via `@font-face` from assets, applied to all heading elements
- **High-contrast**: `html.a11y-high-contrast` CSS class overrides throughout all B2B sections

## Admin setup this theme expects

1. B2B market + catalog with wholesale prices; companies with locations; customers assigned to companies.
2. New customer accounts (required for B2B).
3. Payment terms (e.g. Net 30) and, if wanted, ordering approval ("submit for review").
4. Product metafield `custom.rrp` (type: money) filled with the retail price, so partners see RRP and margin.
5. Optional: quantity rules / volume pricing in the catalog.
