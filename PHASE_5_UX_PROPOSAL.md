# PHASE 5 — GOVONE FINAL UX REDESIGN PROPOSAL

This document outlines the final approved UX layout, composition, and interaction patterns for **GovOne**, India's simple front door to government services.

The design philosophy is centered entirely on a **Search-First public-service portal** (modeled after GOV.UK usability standards), stripping away generic startup marketing elements and visual clutter.

---

## 1. Current UX Problems Identified

- **Traditional Landing Page Layout:** Centered layouts with large subtitles and informational blocks make the homepage resemble a marketing portal rather than a transactional citizen utility.
- **Visual Clutter from Shortcuts & Badges:** Floating card-pills, explanation bubbles, and icons next to headers compete with the search input, creating choices that delay user action.
- **Premature Results & Directories:** Showing grids of category folders or search results before a user has actively typed a query creates choice paralysis.
- **Inconsistent Font Application:** Monospaced fonts were occasionally used for citizen-facing text elements instead of being restricted to technical identifiers (official domains, reference IDs).

---

## 2. Final Homepage Architecture

The homepage is composed as a compact, left-aligned utility:

1.  **GovOne Identity:** Clean, minimalist logo header and navigation link to "All Services".
2.  **Clear One-Line Proposition:** *"Government services, all in one place."*
3.  **Core Interaction Prompt:** *"What do you need to get done?"*
4.  **Large Rectangular Search Console:** Integrated state filter selection dropdown, a text input field, and a solid Ashoka Blue "Go" button.
5.  **Clean Search Examples:** Single inline text list: *"Try: Challan • Passport • PAN • Tax • PF"*.
6.  **Search Results Area:** Renders only *after* a query is typed.
7.  **Simple Link Fallback:** *"Browse all government services →"*.
8.  **Minimalist Footer Disclaimer:** Compact text warning detailing prototype limits.

---

## 3. Search Journey States

```
┌────────────────────────────────────────────────────────┐
│ STATE A: BEFORE SEARCH                                 │
│                                                        │
│ GovOne                                                 │
│ "Government services, all in one place."               │
│                                                        │
│ What do you need to get done?                          │
│ ┌───────────────┬──────────────────────────┬────────┐  │
│ │ All India     │ Tell us what you need... │ Search │  │
│ └───────────────┴──────────────────────────┴────────┘  │
│ Try: Challan • Passport • PAN • Tax • PF               │
│                                                        │
│ Browse all government services →                       │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ STATE B: WHILE TYPING AUTOCOMPLETE                     │
│                                                        │
│ What do you need to get done?                          │
│ ┌───────────────┬──────────────────────────┬────────┐  │
│ │ All India     │ license renew            │ Search │  │
│ └───────────────┴──────────────────────────┴────────┘  │
│                 ┌──────────────────────────────────┐   │
│                 │ 🔍 Renew Driving Licence         │   │
│                 │ 🔍 Apply for Driving Licence     │   │
│                 └──────────────────────────────────┘   │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ STATE C: AFTER SEARCH (1-3 RESULTS)                    │
│                                                        │
│ Traffic Challan                                        │
│ Check and pay pending traffic fines.                   │
│ Transport Department                                   │
│ Fee: Varies • Time: Instant                            │
│ View Service Requirements →                            │
└────────────────────────────────────────────────────────┘
```

---

## 4. Search Language Support

To accommodate different literacy levels and typing behaviors across India, the search input supports:
- **English:** `"renew driving license"`
- **Hindi / Devanagari script:** `"लाइसेंस रिन्यू"`
- **Phonetic Hinglish:** `"license renew karwana hai"`, `"gaadi ka challan check karna"`, `"pan card banana"`
- **Colloquial Short-Hands:** `"challan"`, `"pf status"`
- **Common Spelling Errors:** `"licence"` vs `"license"`, `"pasport"` vs `"passport"`

*Note: All search inputs, suggestions, and results use the standard, clean sans-serif **Noto Sans** (or Noto Sans Devanagari) typeface. Monospaced font is used strictly for technical identifiers (e.g. `sarathi.parivahan.gov.in`).*

---

## 5. Trust & Verification Principles

Trust is communicated quietly through institutional restraint rather than marketing badges:
- **Clear Redirection Details:** The redirect modal explicitly states when a user is leaving the prototype, displaying the verified destination domain in monospaced font (e.g. `sarathi.parivahan.gov.in`).
- **Restrained Copy:** A single, clear trust statement is placed above the footer:
  > *"GovOne helps you find the right government service and routes you to the official department portal."*

---

## 6. Mobile & Accessibility Specifications

- **Immediate Action Area:** On mobile viewports, the search input sits above the fold, ensuring the user can start searching without scrolling.
- **Accessibility Font Scaling:** Contrast compliance targets WCAG AAA where practical, with WCAG AA as the minimum baseline.
- **Keyboard Navigation:** All input elements, buttons, and links support visible focus outlines (`focus-visible:ring-2 focus-visible:ring-accent`) for keyboard-only users.
- **Tap Targets:** Search options, buttons, and dropdown links maintain a minimum target area of 48px by 48px to prevent click errors on touch screens.
