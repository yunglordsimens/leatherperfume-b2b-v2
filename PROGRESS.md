# B2B Wholesale Portal — Build Log

**Project:** Shopify Dawn Theme → B2B Wholesale portal (React mockups → Liquid sections)
**Branch:** `claude/react-to-shopify-hero-lfeDP-deepseek`
**Base branch (preserved, untouched):** `claude/react-to-shopify-hero-lfeDP`
**GitHub:** `yunglordsimens/leatherperfume-b2b-v2`
**Last Updated:** 2026-05-02

---

## Attribution Legend

| Symbol | Agent | Role |
|--------|-------|------|
| DS | DeepSeek | Code analysis, debugging, architecture decisions |
| GM | Gemini | Design / React mockup analysis |
| CL | Claude | Orchestration, file ops, git, applying edits |
| US | User | Requirements, product decisions, feedback |

Status icons: ✅ done · 🔄 in progress · ❌ blocked · 🔲 not started

---

## Cart Flow

### Fixes applied
- ✅ `product-b2b.liquid` — `cart:refresh` event renamed to `cart:updated` with cart detail payload so MOQ bar updates after PDP add-to-cart _(DS found · CL applied)_
- ✅ `product-grid-b2b-logged-in.liquid` — ATC handler now dispatches `cart:updated` after success so cart-summary MOQ bar responds to catalog adds _(DS found · CL applied)_

### Pending / not built
- 🔲 `/pages/thank-you` order confirmation page — cart-summary redirects here but page doesn't exist _(DS found)_
- 🔲 Shipping calculation — currently shows "Calculated Later" with no logic _(DS found)_
- 🔲 Back-in-stock notification for OOS products _(DS found)_
- 🔲 Order history / reorder flow _(DS found)_
- 🔲 `cart-summary-b2b.liquid` — re-test MOQ bar on live shop after refactor (commit `e5781b7`) _(US/CL)_

### Known issues (low priority)
- 🔲 `progress_raw` Liquid variable in `cart-summary-b2b.liquid` is dead code — bar is driven by JS, not Liquid. Harmless, can remove during cleanup _(DS found)_
- 🔲 Singleton guards (`window.lpCartItemsReady`, `window.lpCartSummaryReady`) use global flags instead of per-section-id. Low risk since sections appear once per page _(DS found)_

---

## Catalog / Grid

### Fixes applied
- ✅ `catalog-header.liquid` — merged `catalog-header-b2b.liquid` into one state-aware section: wholesale customers see "Create Order" heading + description, guests see `collection.title` / `collection.description` _(DS designed · CL built)_
- ✅ `catalog-header-b2b.liquid` — deleted (186 lines removed) _(CL)_
- ✅ `templates/collection.json`, `collection.partner-collection.json` — updated to use unified `catalog-header` section _(CL)_
- ✅ `product-grid-b2b-logged-in.liquid` — added `customer.tags contains 'wholesale'` gate; non-wholesale visitors now see a login prompt instead of B2B prices _(DS found · CL applied)_

### Pending / not built
- 🔲 Wire `custom.discount_tier` + `custom.discount_percentage` customer metafields to pricing in grid and cart _(DS found)_
- 🔲 Product-level MOQ enforcement — PDP qty stepper defaults to 5 but no minimum enforced _(DS found)_
- 🔲 Discount tier application logic not built _(DS found)_

---

## Product Pages (PDP)

### Fixes applied
- ✅ `product-b2b.liquid` — event name fix (see Cart Flow above)

### Pending
- 🔲 Analyze Gemini React mockups for PDP — compare design intent vs current Liquid implementation _(GM · waiting on mockups folder)_
- 🔲 Variant selector — currently only renders first available variant, no switching UI _(not built)_

---

## Sections / UI

### Fixes applied
- ✅ `predictive-search-overlay.liquid` — fixed double focus ring on search input. Root cause: Dawn `assets/base.css` line 727 `*:focus-visible { box-shadow: var(--focused-base-box-shadow) }` overrode local `outline: none`. Fixed by adding explicit `box-shadow: none` scoped rule _(DS diagnosed · CL applied)_
- ✅ `how-it-works.liquid` — added 4 optional URL settings (`step_1_url`–`step_4_url`); when set, step number renders as `<a>` with `aria-label`; added hover states (orange + scale) _(US requested · CL built)_

### Blocked
- ❌ Phone field overlap on Apply form — needs Massy app rendered HTML or screenshot to diagnose. Cannot fix blind _(DS/CL blocked · waiting on US)_

### Pending
- 🔲 Collect all Gemini React mockups into `/mockups` folder _(US to do)_
- 🔲 Gemini analysis of mockups vs Liquid implementations _(GM · after folder ready)_

---

## Architecture / Tech Decisions

### Decided
- ✅ Wholesale gating pattern: `customer.tags contains 'wholesale'` throughout
- ✅ Pricing: `compare_at_price` = RRP (retail), `price` or `custom.wholesale_price` metafield = WSP
- ✅ MOQ: 5,000 CZK display = 500,000 cents in Shopify
- ✅ Inline CSS per section only — no Tailwind, no external stylesheets
- ✅ Heading font: Yeseva One (`YesevaOne-Regular.woff2`) via `@font-face`, mapped to `--font-heading-family`
- ✅ Accessibility: `html.a11y-high-contrast` CSS class triggers all override rules
- ✅ Multi-AI workflow: DS for code/bugs, GM for design, CL for orchestration + git

### Open decisions needed from User
- 🔲 WSP metafield unit: does `custom.wholesale_price` store **cents** or **display CZK**? Grid and PDP currently assume cents — needs confirmation _(DS found)_
- 🔲 Checkout flow: cart-summary currently redirects to `/pages/thank-you` (B2B proforma flow). Confirm this is correct or should it go to `/checkout`?
- 🔲 Shipping: flat rate, calculated, or manual negotiation per order?
- 🔲 Discount tiers: how many tiers, what % ranges, how assigned to customers?

---

## Missing MVP Features

Items that don't exist yet and are needed before the portal can handle real orders:

| # | Feature | Priority | Owner |
|---|---------|----------|-------|
| 1 | `/pages/thank-you` order confirmation page | High | 🔲 |
| 2 | Discount tier pricing (metafields → price modifier) | High | 🔲 DS |
| 3 | Product-level MOQ per product | Medium | 🔲 DS |
| 4 | Shipping calculation or flat-rate logic | Medium | 🔲 |
| 5 | Back-in-stock notification / waitlist | Low | 🔲 |
| 6 | Order history + reorder from account | Low | 🔲 |
| 7 | Czech ARES business address validation | Low | 🔲 |
| 8 | VAT display toggle (EU vs non-EU customers) | Medium | 🔲 |

---

## Known Bugs Tracker

| # | Bug | Severity | Status | Found By | Notes |
|---|-----|----------|--------|----------|-------|
| 1 | `cart:refresh` event not caught by cart-summary | Critical | ✅ Fixed | DS | Renamed to `cart:updated` |
| 2 | Grid ATC never fired `cart:updated` | Critical | ✅ Fixed | DS | Dispatch added |
| 3 | No wholesale gate on product grid | Critical | ✅ Fixed | DS | Gate + login prompt added |
| 4 | WSP metafield unit ambiguity (cents vs CZK) | High | ❌ Open | DS | Needs US decision |
| 5 | Phone field overlap on Apply form | High | ❌ Blocked | US/DS | Needs Massy app DOM |
| 6 | Singleton JS guards not per-section-id | Low | 🔲 Open | DS | Harmless at current scale |
| 7 | `progress_raw` dead Liquid variable | Low | 🔲 Open | DS | Remove during cleanup |
| 8 | Margin calc could divide by zero if WSP = 0 | Medium | 🔲 Open | DS | Add guard when touching pricing |
| 9 | No `/pages/thank-you` page exists | High | 🔲 Open | DS | Cart-summary redirects here |

---

## Session Log

### 2026-04-28 / 2026-05-02 — Initial rewrite review + cart flow fixes

**Participants:** DS · CL · US

**Context:** User was using external DeepSeek web chat to build everything but got stuck — Claude was applying fixes to the wrong branch (main instead of the rewrite branch). External DS chat had accumulated context rot. Switched to in-session MCP multi-AI workflow.

**Done this session:**
- ✅ Identified active branch: `claude/react-to-shopify-hero-lfeDP-deepseek`
- ✅ Catalog header dedup (merged two sections into one)
- ✅ Deleted `catalog-header-b2b.liquid`
- ✅ Fixed predictive search overlay focus ring
- ✅ Added step links + hover states to `how-it-works.liquid`
- ✅ DS full review of 6 core B2B sections
- ✅ Fixed cart event chain: `cart:refresh` → `cart:updated` in PDP
- ✅ Added `cart:updated` dispatch to catalog grid ATC
- ✅ Added wholesale gate to product grid section

**Found this session (DS):**
- Broken event chain: PDP and grid ATC never updated cart-summary
- Missing wholesale gate on product grid
- WSP metafield unit ambiguity
- Dead Liquid variable `progress_raw`
- 4 singleton guard notes
- Full list of missing MVP features

**Blocked:**
- Phone field overlap — waiting on Massy app rendered HTML / screenshot from US

**Next session priorities:**
1. US drops React mockups into `/mockups` folder
2. US pastes old DeepSeek chat log into `/mockups` or repo root for context
3. GM analyzes mockups vs Liquid sections
4. DS: WSP unit decision → implement discount tier logic
5. DS: Product-level MOQ enforcement
6. Build `/pages/thank-you`

---

*Log maintained by CL (Claude Sonnet) · Code decisions by DS (DeepSeek) · Design decisions by GM (Gemini)*
