# GOVONE DESIGN SYSTEM

This document defines the official design system, typography, colors, layouts, and component standards for **GovOne**, India's simple front door to government services.

The guiding philosophy of GovOne design is:
**"Simple enough for everyone. Trustworthy enough for government."**

---

## 1. Design Principles

- **Intent-Focused Simplicity:** The user interface does not present complex catalogs or marketing text. It is structured around the primary citizen task: *"What do you need to get done?"*
- **Typography-First Authority:** We rely on clean, highly readable, neutral sans-serif typography instead of decorative serif headlines or AI-generated layout structures.
- **Visual Restraint:** No gradients, glassmorphism, floating cards, unnecessary shadows, or decorative animations. Colors and shapes are used strictly to define hierarchy and functional actions.
- **Government-Grade Trust:** Trust is built through visual sobriety, clear labeling of official department domains, and strict readability metrics, rather than generic badges or crests.
- **Strict Accessibility:** Built from the ground up to support screen readers, keyboard focus, and text scaling. Our design goal is to target WCAG AAA where practical, with WCAG AA as the minimum baseline.

---

## 2. Design Tokens

### A. Color Palette
The GovOne palette uses color sparingly to establish trust and hierarchy.

| Token | Color Name | Hex Code | Primary Purpose |
| :--- | :--- | :--- | :--- |
| `color-primary` | **Ashoka Blue** | `#0C2340` | Headers, brand typography, navigation links, and primary buttons. |
| `color-canvas` | **Ivory Canvas** | `#FBFBFA` | Anti-glare page backgrounds. |
| `color-canvas-soft` | **Soft Sand** | `#F4F4F3` | Table headers, secondary details panels, and dividers. |
| `color-accent` | **Warm Saffron** | `#D97706` | Subtle selection borders, warning icons, and status flags. |
| `color-accent-soft` | **Saffron Sand** | `#FEF3C7` | Soft backgrounds for active state selections or warning blocks. |
| `color-success` | **Forest Green** | `#15803D` | Successful statuses, receipt markers, and approved timelines. |
| `color-success-soft` | **Light Green** | `#DCFCE7` | Background for success boxes. |
| `color-error` | **Crimson** | `#DC2626` | Failure statuses, missing fields, and error notifications. |
| `color-hairline` | **Divider Grey** | `#E4E4E3` | Standard borders and container lines. |
| `color-body-dark` | **Charcoal** | `#212529` | Main body typography and labels. |
| `color-body-muted` | **Medium Grey** | `#575756` | Subtitles, descriptive notes, and secondary details. |

### B. Typography Scale
We use **Noto Sans** for all textual elements in English, Hindi, and other Indian scripts, ensuring clean, uniform rendering of regional languages.

*   **Primary Typeface:** `Noto Sans`, `sans-serif`
*   **Devanagari Typeface:** `Noto Sans Devanagari`, `sans-serif`

```
┌────────────────────────────────────────────────────────┐
│                   NOTO SANS TYPOGRAPHY SCALE           │
├───────────────────┬─────────────┬───────────┬──────────┤
│ Token             │ Font Size   │ Weight    │ Height   │
├───────────────────┼─────────────┼───────────┼──────────┤
│ `font-hero`       │ 36px (2.25r)│ Bold (700)│ 1.2      │
│ `font-h1`         │ 24px (1.5r) │ Bold (700)│ 1.25     │
│ `font-h2`         │ 18px (1.12r)│ Bold (700)│ 1.3      │
│ `font-h3`         │ 14px (0.87r)│ Bold (700)│ 1.4      │
│ `font-body`       │ 16px (1.0rem)│ Reg (400) │ 1.5      │
│ `font-small`      │ 12px (0.75r)│ Reg (400) │ 1.4      │
│ `font-mono`       │ 11px (0.68r)│ Med (500) │ 1.3      │
└───────────────────┴─────────────┴───────────┴──────────┘
```

*   **Heading Spacing:** Headings must rely on size, weight, and letter-spacing (uppercase tracking for mono labels) to establish contrast. Editorial Georgia-style serif headlines are prohibited.

### C. Spacing Scale
A baseline 4px grid controls all paddings, margins, and layout gaps:
*   `space-xxs`: 4px
*   `space-xs`: 8px
*   `space-sm`: 12px
*   `space-md`: 16px
*   `space-lg`: 24px
*   `space-xl`: 32px
*   `space-xxl`: 48px
*   `space-xxxl`: 64px

### D. Structural Containers
*   **Max Width:** `1280px` (`max-w-7xl` centered) for dynamic content grids.
*   **Text Width:** `640px` (`max-w-2xl` or `prose` width) for long articles and details description blocks to optimize reading speeds.
*   **Border Radius:** Maximum `rounded-sm` (4px to 6px) for form inputs and action buttons. Circular/pill UI components (e.g. `rounded-full` buttons) are prohibited to maintain a serious, structured look.
*   **Borders:** 1px solid hairline (`#E4E4E3`) dividers.
*   **Shadows:** None. Shadows are deactivated on standard content panels to establish flat, horizontal layouts. Modals use a basic 1px hairline border and a solid dark overlay wrapper instead of diffuse drop-shadows.

---

## 3. Layout System

GovOne follows a **content-first layout** that organizes options in clear horizontal rows.

```
┌────────────────────────────────────────────────────────┐
│ Navbar: Brand Logo & Links                             │
├────────────────────────────────────────────────────────┤
│ Hero Area: Primary Heading & Search input               │
├────────────────────────────────────────────────────────┤
│ Split Columns:                                         │
│ ┌───────────────────────────┐┌───────────────────────┐ │
│ │ Left: Requirements        ││ Right: Process Steps  │ │
│ └───────────────────────────┘└───────────────────────┘ │
├────────────────────────────────────────────────────────┤
│ Footer: Supporting links and disclaimer notices        │
└────────────────────────────────────────────────────────┘
```

-   **Horizontal Alignment:** All blocks align to a clean left-edge margin.
-   **No Nested Cards:** We do not stack panels inside cards inside other cards. Information is divided using simple headings and horizontal rule lines (`<hr className="border-hairline" />`).
-   **Whitespace:** Generous spacing around text blocks allows citizens to read information without being overwhelmed by visual noise.

---

## 4. Homepage Hierarchy & Search

The homepage layout is designed around a single centerpiece action.

1.  **GovOne Header:** Branding identifying the gateway.
2.  **"What do you need to get done?":** Bold, flat Noto Sans hero heading (no serif font, no sparkles, no startup tags).
3.  **The Search Input Bar:** Large input box.
    *   Left side: Clear state selector dropdown (MapPin icon, All India default).
    *   Center: Large input box with placeholder: *"Tell us what you need help with"*
    *   Right side: Square Ashoka Blue button labeled *"Search"*.
4.  **Common Tasks Shortcuts:** Small text links below the input showing quick search phrases: *"Common tasks: Renew Licence, Check PF Balance, Pay Traffic Challan"*.
5.  **Small Explanation:** Clear descriptive text explaining how GovOne routes tasks to verified official department sites.
6.  **Secondary Categories Menu:** Hidden behind a text-based disclosure link (*"Or browse by category directory"*) to keep the hero page clean.

---

## 5. Standardized Service Details Layout

Service pages are structured to help citizens prepare documents before beginning the application:

-   **Breadcrumb:** Simple path list at the top (e.g. *Home > Services > Renew Licence*).
-   **Header Panel:** Service title, department name, processing duration, and statutory fees.
-   **Preparation Columns:**
    *   **Document Checklist (Left Column):** Plain checkbox checklist. Ticking items updates a visual check-off state.
    *   **Eligibility Checker (Left Column):** Simple Yes/No radio choices with a verify button returning clear green (qualified) or red (constraint warning) messages.
    *   **Process Steps (Right Column):** Grouped timeline steps showing the sequence (e.g. *1. File Online, 2. Upload Scans, 3. Pay Fees*).
-   **Obvious CTA:** A primary button consistently styled in Ashoka Blue to launch the mock application or official redirection workflow (Forest Green is reserved strictly for success/status states).

---

## 6. Trust & Safety Interstitials

To maintain transparency and prevent phishing concerns, GovOne clearly identifies external domains:

-   **Redirect Modal:** Proceeding to external portals triggers a fullscreen warning showing:
    *   Clear "You are leaving GovOne" message.
    *   Verified destination domain in monospaced font (e.g., `sarathi.parivahan.gov.in`).
    *   Obvious "Cancel & Return" option.
    *   Obvious "Continue to Official Site" option.
    *   Note: Redirection is triggered immediately upon user confirmation (no mandatory countdown timer is required).
-   **Fictional Identity Notice:** The Citizen Dashboard and form wizards display persistent notices explaining that mock databases use dummy data (such as Ramesh Kumar's profile details) and do not collect real personal data.

---

## 7. Accessibility Specifications

-   **Font Scalability:** Global states multiplier scaling sizes by `Normal` (16px base), `Large` (18px base), or `Extra Large` (20px base).
-   **Contrast compliance:** Contrast ratios for main text target WCAG AAA where practical, with WCAG AA as the minimum baseline. Toggling High Contrast swaps elements to pure high-contrast values.
-   **Visible Focus States:** Focus rings (`focus-visible:ring-2 focus-visible:ring-accent`) must outline elements on key navigation.
-   **Touch Targets:** Action buttons and link targets maintain a minimum size of 48px by 48px to prevent click errors on mobile viewports.
-   **Indian Script Alignment:** Typography settings define explicit font family fallbacks for Devanagari script, ensuring Hindi text renders with correct line height metrics.
