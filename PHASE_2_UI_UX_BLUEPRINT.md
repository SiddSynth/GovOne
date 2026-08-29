# PHASE 2 UI/UX BLUEPRINT: GOVONE
## An Intent-First Government Search Engine

---

## 1. Design Goals

GovOne is not a directory portal or a catalog of cards. It is an **intent-first search engine** designed to translate a citizen's natural statement of intent into the precise administrative pathway required to complete it. The interface is optimized to answer one primary question: **"What do you need to get done?"**

```
┌────────────────────────────────────────────────────────┐
│                   INTENT-FIRST UX ARCHITECTURE         │
├───────────────────┬───────────────────┬────────────────┤
│ Central Search    │ Task Resolution   │ Zero-Clutter   │
│ (Phonetic / NL    │ (Immediate target │ (No decorative │
│  interpretation)  │  checklists)      │  cards/emojis) │
└───────────────────┴───────────────────┴────────────────┘
```

### Core Design Goals:
- **Search as the Platform:** The homepage is a clean, authoritative search interface, mirroring the focus of a single-purpose search tool.
- **Scale-Independent Architecture:** The interface works identically whether the catalog hosts 12 services or 10,000+ services, because users are routed by intent rather than manual category navigation.
- **Immediate Task Clarification:** Rather than scrolling through lists of pages, search results immediately isolate the top 1-3 matching tasks, complete with timelines, fees, and verified credentials.
- **Institutional Authority:** Built using a high-contrast layout, serif headings for official weight, and verified badges.
- **No Directory Clutter:** Avoid emojis, decorative cards, and generic SaaS layouts. The visual space is dedicated entirely to readable search inputs, autocomplete suggestions, and clean data lists.

---

## 2. Screen Inventory

The GovOne MVP requires a focused inventory of screens, centered on search and task execution:

| Screen Code | Screen Name | Purpose & Primary User Goal | Primary CTA | Secondary Actions |
| :--- | :--- | :--- | :--- | :--- |
| **SCR-01** | **Search Engine Home** | Clean interface for entering natural language or Hinglish task queries. | Input query | Select State filter, toggle Accessibility tools |
| **SCR-02** | **Search Results Dashboard**| Narrow query to the top 1-3 matching tasks with context details. | Select task card | Edit search, filter by state |
| **SCR-03** | **Suggestions List** | Autocomplete suggestions appearing under the search input. | Select suggestion | Close suggestions list |
| **SCR-04** | **Disambiguation Portal** | Resolve ambiguous queries that map to multiple departments. | Select specific task | Go back to search |
| **SCR-05** | **Zero-Match Fallback** | Guide users when search fails, offering grievances or basic help. | Report missing service | File grievance on CPGRAMS |
| **SCR-06** | **Service Preparation Page**| Single standardized page showing document lists, fees, and rules. | Start Service | Verify eligibility, check document list |
| **SCR-07** | **Eligibility Checker** | Radio button questionnaire to check qualification before redirect. | Verify eligibility | Reset choices |
| **SCR-08** | **Redirect Interstitial** | Safety countdown screen warning before routing to `.gov.in` sites. | "Go Now" (link) | "Cancel & return to GovOne" |
| **SCR-09** | **DigiLocker Auth (Mock)**| Link profile to pre-fill application forms in mock workflows. | Link profile | Cancel linkage |
| **SCR-10** | **UPI Payment (Mock)** | Scan mock QR code to settle fees. | "Mock Pay Success" | Cancel payment |
| **SCR-11** | **Receipt & Timeline** | Displays transaction receipt and link to status roadmap. | "Track Status" | Print/download receipt |
| **SCR-12** | **Roadmap Tracking** | Search reference code to see visual stepper timeline. | Search ID | Select pre-seeded test IDs |
| **SCR-13** | **User Dashboard** | Manage active applications and verified profiles. | Open active application | Link/Unlink DigiLocker |

---

## 3. Homepage (SCR-01)

The homepage is minimal, clear, and centered entirely on the search experience. Category lists and marketing blocks are removed or moved to secondary utility text below.

```
┌────────────────────────────────────────────────────────┐
│  GovOne | Government of India Gateway                  │
├────────────────────────────────────────────────────────┤
│                                                        │
│               What do you need to get done?            │
│                                                        │
│  [ MapPin ] [ All India   ▼ ] [ Search services...   ] │
│                                                        │
│  Common tasks: Renew Licence | Check PF Balance |      │
│                Pay Challan                             │
│                                                        │
├────────────────────────────────────────────────────────┤
│                                                        │
│  How GovOne Works:                                     │
│  Write your task in plain words (e.g. "meri gadi ka    │
│  challan"). GovOne finds the verified department,      │
│  checks documents, and guides you to completion.       │
│                                                        │
│  [ Browse All Categories ]                             │
└────────────────────────────────────────────────────────┘
```

### Layout Hierarchy & Spacing:
1.  **Accessibility Header (Height 32px):** Dark primary color. Hosts skip-link, contrast selector, text sizes (Normal, Large, Extra Large), and English/Hindi language toggle.
2.  **Branding Navigation (Height 64px):** Plain white with a 1px solid hairline grey border. Hosts the official GovOne crest logo and navigation links (Home, Track Status, Dashboard).
3.  **Search Input Centerpiece (Padding 80px top/bottom):**
    *   **Heading:** *"What do you need to get done?"* (Serif font, size 36px, Ashoka Blue, centered).
    *   **Input Box (Max-width 720px):** Includes state selection dropdown on the left with a thin dividing line. Central search box has a text placeholder: *"Try 'renew driving licence', 'gadi ka challan', 'ITR refund'..."*.
    *   **Common Tasks Row:** A small, text-based row below the input offering shortcuts: *"Common tasks: Renew Licence, Check PF Balance, Pay Traffic Challan"*.
4.  **How GovOne Works (Padding 48px top/bottom, Canvas Soft background):** A minimal explanation of the search-first logic.
5.  **Categories Secondary Link:** No grid cards. A single text link: *"Browse all categories"* is located at the bottom for users who want to browse manually.

---

## 4. Search UX (SCR-02 & SCR-03)

The search bar uses an intent-translation engine to direct users to specific service detail pages.

```
                     [ User Input Query ]
                              │
                              ▼
                 [ Intent & Syntax Parsing ]
           • Direct Match? ──► Route to Service Page
           • Multiple Matches? ──► Route to Disambiguation
           • Ambiguous / No Match? ──► Route to Zero-Result Fallback
```

### Search Principles & Result Narrowing:
- **Autocomplete Suggestions:** Displayed as a clean dropdown while typing. Selecting an item takes the user to the service details instantly.
- **Matching Score Weight:** Matches terms against our phonetic Hinglish dictionary and ranks results based on intent matches.
- **Top-Match Focus:** Displays only the **top 1-3 matching cards** instead of long lists of search results.
- **Disambiguation Portal:** If a query like *"register details"* maps to multiple services, GovOne presents a clarifying list:
    *   *"Are you trying to: Register as a new voter, Register a vehicle, or Register a cybercrime complaint?"*
- **Zero-Result fallbacks:** If a search query does not return any matches, GovOne suggests similar services, provides a direct link to file a public grievance on CPGRAMS, or displays an input to request support.

---

## 5. Search Result Card Blueprint

Results cards are clean, structured, and display only essential parameters:

```
┌────────────────────────────────────────────────────────┐
│ [High Match]                                 15 Days   │
│                                                        │
│ Renew Driving Licence (DL)                             │
│ Ministry of Road Transport & Highways (MoRTH)          │
│                                                        │
│ Check requirements, upload medical certificate Form    │
│ 1A, and renew your licence online.                     │
│                                                        │
│ Documents: Old License, Address Proof, Medical Cert    │
├────────────────────────────────────────────────────────┤
│ Fees: ₹200 + card fee             [ View Checklist > ] │
└────────────────────────────────────────────────────────┘
```

### Result Card Fields:
1.  **Match Badge (Top Left):** `High Match` (Saffron border) or `Medium Match` (Grey border).
2.  **Processing Timeline (Top Right):** Estimated resolution days (e.g. `15 Days`).
3.  **Title:** 18px Bold, Ashoka Blue.
4.  **Department Code:** 11px uppercase, body-muted color (e.g. *Ministry of Road Transport & Highways*).
5.  **Plain Language Description:** Brief summary of the service.
6.  **Requirements Summary:** List of required documents.
7.  **Fees & Navigation CTA:** Clean bottom layout containing fee estimates and the checklist link.

---

## 6. Service Detail Page Blueprint (SCR-06)

Standardized layout designed to help users prepare *before* navigating away.

```
┌────────────────────────────────────────────────────────────────────────┐
│ Home > Services > Renew Driving Licence                                │
│                                                                        │
│ Renew Driving Licence (DL)                                             │
│ Extend the validity of your expired or expiring driving license...     │
├──────────────────────────────────────┬─────────────────────────────────┤
│ REQUIREMENTS & ELIGIBILITY           │ APPLICATION ROADMAP             │
│                                      │                                 │
│ [x] Original Driving Licence         │ 1. Fill Online Form             │
│ [ ] Address Proof (Aadhaar/Passport) │    Enter details on Sarathi     │
│ [ ] Medical Form 1A (Age > 40)       │                                 │
│                                      │ 2. Upload Documents             │
│ ELIGIBILITY CHECK                    │    Upload address & DL scans    │
│ Are you older than 18 years?         │                                 │
│ (•) Yes    ( ) No                    │ 3. Pay Fees                     │
│                                      │    Settle RTO charges online    │
│ [ Verify Eligibility ]               │                                 │
│                                      ├─────────────────────────────────┤
│                                      │ [ Start Application (Mock) ]    │
└──────────────────────────────────────┴─────────────────────────────────┘
```

### Information Hierarchy:
- **Left Column (Prerequisites):**
    *   **Document checklist with checkboxes:** Allows users to tick items they have ready.
    *   **Interactive Eligibility Questionnaire:** Multi-choice questions to confirm if they qualify.
    *   **Fee & Timeline summary cards.**
- **Right Column (Process):**
    *   **Step-by-Step roadmap:** Shows numbered steps describing the application sequence.
    *   **Important Warnings:** Displays warning boxes about deadlines or penalties.
    *   **Primary CTA Button:** Centered at the bottom right. Green or Ashoka Blue depending on the mock application type.
    *   **Trust Badge:** Detailed safety notice confirming the domain address of the official redirection endpoint.

---

## 7. Eligibility Verification Flow (SCR-07)

```
                  ┌──────────────────────────────┐
                  │ User clicks:                 │
                  │ "Verify Eligibility"         │
                  └──────────────┬───────────────┘
                                 │
                                 ▼
                  ┌──────────────────────────────┐
                  │   Eligibility Check          │
                  │  Displays Yes/No questions   │
                  │  for rules in database       │
                  └──────────────┬───────────────┘
                                 │
                                 ▼
            ┌────────────────────┴────────────────────┐
            ▼ (Pass)                                  ▼ (Fail)
  ┌───────────────────────────┐             ┌───────────────────────────┐
  │ "You qualify" (Green)     │             │ "Not Eligible" (Red)      │
  │ Enables "Start Application"│             │ Disables CTA & suggests   │
  │ CTA button                │             │ corrective options        │
  └───────────────────────────┘             └───────────────────────────┘
```

- **Inputs:** Simple radio buttons (Yes / No).
- **Validation:** Clicking the verify button checks the inputs. If all conditions are met, it renders a green confirmation card: *"You are eligible to apply."*
- **Fail Mitigation:** If verification fails, it shows a red warning card: *"Eligibility issue found. You must be older than 18 to apply for this document."* It disables the primary CTA and suggests alternative services.

---

## 8. Authentication Flow (SCR-09)

GovOne uses a secure **DigiLocker OAuth mockup** to pre-fill application details.

```
┌────────────────────────────────────────────────────────┐
│                        GovOne                          │
│                                                        │
│  Prefill using DigiLocker                              │
│  Fetch your verified address and Aadhaar details       │
│  instantly to avoid manual typing.                     │
│                                                        │
│  [ Link DigiLocker Profile ]                           │
└────────────────────────────────────────────────────────┘
```
```
                         (User clicks Link)
                                 │
                                 ▼
┌────────────────────────────────────────────────────────┐
│               DigiLocker Secure Portal                 │
│                                                        │
│  Select Verified Profile:                              │
│  (•) Ramesh Kumar (Aadhaar: XXXX-XXXX-9931)            │
│  ( ) Savitri Devi (Aadhaar: XXXX-XXXX-9923)            │
│                                                        │
│  [ Authorize & Share Details ]                         │
└────────────────────────────────────────────────────────┘
```
```
                       (User authorizes)
                                 │
                                 ▼
┌────────────────────────────────────────────────────────┐
│                        GovOne                          │
│                                                        │
│  Profile linked successfully.                          │
│  Name: Ramesh Kumar | Aadhaar: XXXX-XXXX-9931          │
│  Fields prefilled. Complete the remaining steps below.  │
└────────────────────────────────────────────────────────┘
```

---

## 9. Payment Mock Flow (SCR-10)

For services requiring fees, GovOne simulates payments using a QR code checkout modal.

```
┌────────────────────────────────────────────────────────┐
│                Confirm Fee Payment                     │
├────────────────────────────────────────────────────────┤
│  Service: File RTI Application                         │
│  Filing Fee: ₹10.00                                    │
│                                                        │
│                     [ QR CODE ]                        │
│                                                        │
│  Scan this QR with any UPI app (BHIM, GPay, PhonePe)   │
│  or click "Mock Pay Success" to bypass.                │
├────────────────────────────────────────────────────────┤
│  [ Cancel ]                        [ Mock Pay Success ]│
└────────────────────────────────────────────────────────┘
```

1.  **Form Submission:** User clicks submit on the application form.
2.  **Payment Modal pops up:** Shows amount, billing item, and a mock QR code image.
3.  **Simulated scan:** The user can click *"Mock Pay Success"* to proceed.
4.  **Loading transition:** Shows a spinner for 2 seconds: *"Processing payment..."*
5.  **Submission Success:** Renders the receipt screen showing transaction code, reference ID, and print commands.

---

## 10. External Redirect Flow (SCR-08)

For services completed on external sites, GovOne displays a secure transition warning to reassure citizens.

```
┌────────────────────────────────────────────────────────┐
│             Leaving GovOne Secure Gateway              │
├────────────────────────────────────────────────────────┤
│  You are now leaving GovOne for the official portal:   │
│                                                        │
│  [ morth.sarathi.gov.in/sarathiservice ]               │
│                                                        │
│  This domain is verified by GovOne Security.           │
│  Redirecting in 5 seconds...                           │
├────────────────────────────────────────────────────────┤
│  [ Cancel & Stay ]                            [ Go Now ]│
└────────────────────────────────────────────────────────┘
```

- **Trigger:** Clicking *"Proceed to Official Website"*.
- **Countdown:** 5-second automatic countdown redirect.
- **Security Check:** Displays a verified domain badge: *"Verified Department Endpoint: parivahan.gov.in"*.
- **Emergency Action:** The user can click *"Cancel"* at any time to abort the redirect and return to GovOne.

---

## 11. Application Tracking (SCR-12)

The tracking page tracks the roadmap progress for submitted reference IDs.

```
┌────────────────────────────────────────────────────────┐
│               Track Application Status                 │
├────────────────────────────────────────────────────────┤
│  Reference ID: [ DLN-1402-2026                 ] [Track]│
├────────────────────────────────────────────────────────┤
│  Status: Document Verification | Applicant: Ramesh Kumar│
│                                                        │
│  - Submitted (Aug 25) -------------------------------✓ │
│  - Document Verification (Aug 27) -------------------* │
│    In Progress - Verification at local RTO desk        │
│  - Field Audit --------------------------------------o │
│  - Approved & Dispatched ----------------------------o │
└────────────────────────────────────────────────────────┘
```

- **Query match:** Matches reference IDs stored in local storage or the pre-seeded mock database.
- **Seeded Test IDs Panel:** Helpful shortcuts are provided at the bottom of the page (`DLN-1402-2026`, `EPF-9923-2026`, `ECI-6421-2026`) to let evaluators test different roadmap states instantly.

---

## 12. Dashboard (SCR-13)

The dashboard organizes citizen details and bookmarked services.

```
┌────────────────────────────────────────────────────────┐
│  Welcome, Ramesh Kumar  [ Linked to DigiLocker ]       │
├───────────────────────────┬────────────────────────────┤
│ ACTIVE APPLICATIONS       │ BOOKMARKED SERVICES        │
│                           │                            │
│ - Renew Driving Licence   │ - Search Traffic Challan   │
│   Ref: DLN-1402-2026      │   Check vehicle fine lists │
│   [ Dispatched - Timely ] │                            │
│                           │ - Apply Voter ID Card      │
│ - File RTI Application    │   Register in polls        │
│   Ref: RTI-4911-2026      │                            │
│   [ Submitted - 30 days ] │                            │
└───────────────────────────┴────────────────────────────┘
```

- **Verified Identity Panel:** Displays linked profile status with disconnect controls.
- **Active Tracker list:** Dynamic lists updated from active local storage submissions.
- **Bookmarked items:** Short cards showing saved services with quick delete options.

---

## 13. Accessibility

GovOne includes accessibility features as core layout controls:

- **Keyboard Focus Indicators:** Every input, radio choice, and button displays a 2px blue/accent focus ring on key navigation.
- **High Contrast Toggle:** Applies the `.high-contrast` style sheet to replace primary canvas backgrounds with high-contrast elements.
- **Font Scaling:** A client-side state scaling font size multipliers (Normal: 100%, Large: 115%, Extra Large: 130%) to help visually impaired users read comfortably.
- **Tabular Data Layouts:** Uses `font-variant-numeric: tabular-nums` for fee lists and receipt numbers.
- **HTML Form Labels:** Wraps form inputs in clickable tags, ensuring clicking the label selects the checkbox.

---

## 14. Responsive Behaviour

```
┌────────────────────────────────────────────────────────────────────────┐
│                         RESPONSIVE BREAKPOINTS                         │
├───────────────────┬───────────────────┬────────────────────────────────┤
│ Mobile (<768px)   │ Tablet (768-1024) │ Desktop (>1024px)              │
├───────────────────┼───────────────────┼────────────────────────────────┤
│ • Vertical Stack  │ • Grid layouts    │ • 2-column detail layouts      │
│ • Full-screen Mod │   reorganize      │ • Permanent sidebars           │
│ • Large touch target  • Sidebar flex   │ • Permanent navigations        │
└───────────────────┴───────────────────┴────────────────────────────────┘
```

- **Desktop Layout:** Category index sidebar alongside listings. 2-column layout for service detail views.
- **Mobile Layout:** Collapses to a single-column layout. Sidebars move to top dropdown menus or stack at the bottom. Autocomplete dropdowns scale to fill the full viewport width to prevent zoom bugs on iOS. Touch target sizes scale to a minimum of 48px by 48px.

---

## 15. Design System

We adapt the spacing and structural tokens from [DESIGN.md](file:///c:/Users/Lenovo/Desktop/Build for india/DESIGN.md) but apply the custom GovOne visual elements:

### Palette Definition:
- `primary`: **Ashoka Blue** (`#0C2340`). Evokes administrative weight and official trust.
- `accent`: **Warm Saffron** (`#D97706`). Used for warnings, alert badges, and highlight targets.
- `accent-soft`: **Saffron Sand** (`#FEF3C7`). Soft background for warnings.
- `success`: **Forest Green** (`#15803D`). Used for approval steps and receipt states.
- `success-soft`: **Light Green** (`#DCFCE7`). Background for successful completions.
- `canvas`: **Ivory Canvas** (`#FBFBFA`). Warm, anti-glare page background.
- `canvas-soft`: **Soft Sand** (`#F4F4F3`). Separators, tables, and side panels.
- `hairline`: **Divider Grey** (`#E4E4E3`). Card and input borders.
- `body-dark`: **Charcoal** (`#212529`). Main font color for body copy.
- `body-muted`: **Medium Grey** (`#575756`). Subtitle text.

### Headings Style:
- Serif headings (**Merriweather** or standard serif stack). Evokes official documents. No negative letter-spacing to ensure readability.

### Cards & Insets:
- Border radius of `rounded-sm` (6px) for form inputs and `rounded-md` (8px) for cards. High-elevation stacked shadows (Level 4/5) are reserved for modals, while content cards use Level 1 inset hairline borders.

---

## 16. Component Inventory

The GovOne MVP uses 14 core components:

1.  **Navbar:** Accessibility settings, logo, language selector, navigation links.
2.  **Footer:** Direct category directories, National Portal links, disclaimer banners.
3.  **SearchBar:** Integrated state selector, input field, clear button.
4.  **AutocompleteList:** Dropped dropdown containing autocomplete suggestions.
5.  **ServiceCard:** Search results item showing fees, duration, and matching reasons.
6.  **CategoryCard:** Homepage directory blocks showing counts.
7.  **DocumentChecklist:** Checkbox list allowing users to track prepared files.
8.  **EligibilityWizard:** Questionnaire displaying interactive radios and results cards.
9.  **RedirectModal:** Interstitial screen showing domain safety checks and countdown timers.
10. **DigiLockerModal:** Simulated profile selector to pre-fill forms.
11. **PaymentModal:** QR code checkout interface with success controls.
12. **StatusStepper:** Roadmap tracker showing step states (pending, current, completed).
13. **AccessibilityControls:** Panel managing contrast toggles and text scale buttons.
14. **ReceiptCard:** Printable transaction sheet showing tracking IDs.

---

## 17. Microcopy

GovOne replaces complex bureaucratic language with clear, helpful copy:

```
┌──────────────────────────────────────┬─────────────────────────────────┐
│ Bureaucratic Draft                   │ GovOne Plain Language (Approved) │
├──────────────────────────────────────┼─────────────────────────────────┤
│ Vehicle Offence Retrieval            │ Check your vehicle challan      │
│ Submission of Form 6 Registration    │ Register as a new voter         │
│ Verify Pension Scheme Eligibility    │ Check if you qualify for housing│
│ Retrieve Verified Identity Doc       │ Prefill with DigiLocker         │
│ PIO Information Query Request        │ File an RTI request             │
│ Post-Verification Document Dispatch  │ Document sent via Speed Post    │
└──────────────────────────────────────┴─────────────────────────────────┘
```

---

## 18. Complete MVP User Flows

### Flow 1: Search → Challan Search → Mock Result → Mock Payment → Receipt
1.  **Search Input:** User types *"meri gaadi ka challan check"* in the search bar.
2.  **Select result:** Clicks *"Search & Pay Traffic Challan"*.
3.  **Check Details:** Reads requirements (needs RC book and plate number) and clicks *"Start Mock Application"*.
4.  **Enter Plate No:** Input plate number (e.g. `DL3CAN5524`) and clicks search.
5.  **Inspect Fines:** Renders 2 mock challan fines. Clicks *"Pay Fine"* on a ₹1000 fine.
6.  **Scan QR Code:** UPI payment modal opens. Clicks *"Mock Pay Success"*.
7.  **Review Receipt:** Renders success screen showing tracking ID `CHL-XXXX-2026`.

### Flow 2: Search → DL Renewal → State selection → Official redirect
1.  **Search Input:** User searches *"renew driver license"*.
2.  **Select result:** Clicks *"Renew Driving Licence (DL)"*.
3.  **Check Prerequisites:**Ticks DL, Aadhaar, and Medical Form 1A off in the checklist.
4.  **Verify Eligibility:** Answers Yes/No questions and clicks verify.
5.  **Official Redirection:** Clicks *"Proceed to Official Website"*.
6.  **Interstitial Modal:** Displays countdown with verified RTO link: `sarathi.parivahan.gov.in`.
7.  **Exit:** Redirect opens in a new tab.

### Flow 3: Search → Income Tax → Requirements → Official redirect
1.  **Search Input:** User searches *"income tax filing"*.
2.  **Select result:** Clicks *"Income Tax Return (ITR) Filing"*.
3.  **Prerequisite Check:** Ticks PAN, Form 16, and bank accounts off in the checklist.
4.  **Select State:** Selects Delhi as state.
5.  **Official Redirection:** Clicks *"Proceed to Official Website"*.
6.  **Interstitial Warning:** Interstitial modal counts down to: `eportal.incometax.gov.in`.
7.  **Exit:** Opens e-Filing portal.

### Flow 4: Search → Passport → Eligibility → Documents → Official redirect
1.  **Search Input:** User searches *"apply passport"*.
2.  **Select result:** Clicks *"Apply for Fresh / Reissue Passport"*.
3.  **Check Eligibility:** Fills eligibility check questionnaire (e.g. Non-ECR status check).
4.  **Confirm Documents:** Checks off Address Proof, Date of Birth proof.
5.  **Redirection:** Clicks *"Proceed to Official Website"*. Interstitial displays redirect warning for `passportindia.gov.in`.

### Flow 5: Search → Cyber Crime → Emergency guidance → Mock reporting flow
1.  **Search Input:** User searches *"scammed online money stolen"*.
2.  **Select result:** Matches *"Report Cyber Crime"*.
3.  **Emergency Callout:** Displays red warning alert: *"Immediate Action: Call 1930 within 24 hours to freeze transaction."*
4.  **Click Apply:** Clicks *"Start Mock Application"*.
5.  **Link DigiLocker:** Prefills details by selecting Ramesh Kumar's profile.
6.  **Enter Details:** Inputs incident details and uploads mock screenshots.
7.  **Submit:** Click submit. Returns receipt ID `CYB-XXXX-2026` for tracking.

### Flow 6: Application Tracking → Enter reference number → Status timeline
1.  **Access Tracker:** Clicks *"Track Status"* in the navigation bar.
2.  **Shortcut select:** Selects pre-seeded test ID `DLN-1402-2026`.
3.  **Inspect Timeline:** The page renders the 5-step status road map showing step 5 `Dispatched` is active.
4.  **Check Details:** Reads tracking info showing Speed Post ID: `EM992384110IN`.

---

## 19. UX Edge States

We define the design system responses for edge case scenarios:

- **Downstream Site Offline:** If a department site is down, the redirect interstitial displays: *"Verified site is down. You can check alternative offline steps below or try again later."*
- **Empty List State:** If bookmarks or dashboard files are empty, show illustrative folders and search shortcuts rather than a blank card.
- **Incorrect Input Cues:** If UAN or plate numbers are entered in a wrong format, show inline red alerts below the field (e.g. *"Enter a valid 12-digit UAN"*).
- **Session Timeout Warnings:** Warn the user with a modal 60 seconds before session expiration: *"For your security, your session will expire in 1 minute. Click 'Extend' to continue."*

---

## PHASE 2 IMPLEMENTATION CHECKLIST

Phase 3 must build and verify the following components:

- [ ] **1. Scaffolding & Configs:** Verify Next.js layout structures and compile settings.
- [ ] **2. Nav & Footer:** Build the accessible headers and footers with language/contrast selectors.
- [ ] **3. Search Engine Page:** Implement in-place query parsing and Hinglish translations.
- [ ] **4. Details template:** Render checklists, eligibility radio cards, and transition modals.
- [ ] **5. Mock Forms:** Build simulated DigiLocker and QR payment forms.
- [ ] **6. Status Roadmap:** Build the tracking stepper and pre-seeded test ID panel.
- [ ] **7. Dashboard:** Display saved bookmarks and linked identity summaries.
- [ ] **8. Accessibility Audit:** Check keyboard focus rings, semantic tags, and contrast mode.
