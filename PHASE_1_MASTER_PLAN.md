# PHASE 1 MASTER PLAN: SEVASETU
## Unified Citizen Services Orchestration Portal

---

## 1. Executive Summary

**SevaSetu** is a prototype for a unified Indian citizen-services portal. It acts as an intelligent gateway and orchestration layer over India's digital public infrastructure (DPI). The platform resolves a fundamental friction in Indian governance: **citizens should not need to understand the organizational chart of the government to access public services.**

Instead of navigating dozens of siloed websites (e.g., Income Tax, Vahan, Sarathi, EPFO, ECI, Passport Seva), a citizen interacts with a single, trusted gateway. By expressing their intent in natural language (including Hinglish and regional syntax), the platform:
1. Identifies the correct service.
2. Explains eligibility, fees, timeline, and document requirements.
3. Guides the citizen through the workflow.
4. Securely routes them to the final official transaction point, keeping track of their application status locally.

### Key Recommendations
- **Avoid Cloning GOV.UK Visually:** While GOV.UK is a masterclass in information design, SevaSetu should feel distinctly Indian, warm, and authoritative.
- **Pivot Design System:** Critique the Vercel-like developer style in [DESIGN.md](file:///c:/Users/Lenovo/Desktop/Build%20for%20india/DESIGN.md). Propose a secure, high-contrast, accessible system utilizing **Ashoka Blue** (authority), **Ivory Canvas** (readability), and **Warm Saffron** (deliberate accenting), dropping all decorative SaaS mesh gradients.
- **Orchestration Layer Model:** The platform does not host the final transactions for sensitive services (like issuing passports or processing tax payments) but aggregates the prerequisites, checks eligibility, and manages the redirection or adapter APIs, safeguarding user trust and data.
- **MVP Scope:** A selected set of 12 high-impact services across central and state departments demonstrating API-based, redirect-based, and mock-based workflows.

---

## 2. Problem Definition

India's digital governance ecosystem is vast but highly fragmented. A citizen seeking to complete a task faces several layers of friction:

```
[Citizen Goal] 
      │
      ▼
┌──────────────┐
│ Discover?    │ ──► Which of the 100+ ministries/departments handles this?
└──────────────┘
      │
      ▼
┌──────────────┐
│ Terminology? │ ──► What is a "Challan", "EPF UAN", "EPIC Number", or "Form 16"?
└──────────────┘
      │
      ▼
┌──────────────┐
│ Redirection? │ ──► Redirected to a broken state-specific link without context.
└──────────────┘
      │
      ▼
┌──────────────┐
│ Tracking?    │ ──► No single place to see what applications are pending where.
└──────────────┘
```

1. **The Discovery Barrier:** Citizens must know *which* agency owns their problem. A voter correction is ECI; a vehicle tax is state-specific MoRTH; a PF query is EPFO. 
2. **Language and Literacy Gap:** Official portals are heavily textual, written in bureaucratic English, and assume high digital and legal literacy.
3. **Cascading Failure & Fragility:** Current aggregators (like UMANG) frequently break down when downstream APIs fail. Because they try to pull all transaction steps inside their interface, when one subsystem goes offline, the whole user flow crashes.
4. **Mobile & OTP Lock-in:** Heavy reliance on Aadhaar-linked OTPs is secure but causes a total blocker if the citizen's mobile number is outdated or if SMS gateways delay delivery.

---

## 3. Product Vision

SevaSetu is designed as an **Orchestration Layer** rather than an all-in-one replacement. 

### One-Line Value Proposition
> "Access any Indian government service in seconds, without needing to know which department handles it."

### The Core Promise
> "Citizens shouldn't have to know how the government is organized in order to use government services."

```
┌────────────────────────────────────────────────────────┐
│                      SEVASETU                          │
│   (Unified Natural Language / Multi-lingual Search)    │
└───────────────────────────┬────────────────────────────┘
                            │ (Intent & Context Resolved)
                            ▼
     ┌──────────────────────┼──────────────────────┐
     │                      │                      │
     ▼                      ▼                      ▼
┌──────────┐           ┌──────────┐           ┌──────────┐
│ Central  │           │  State   │           │ Schemes  │
│ Services │           │ Services │           │ Database │
└──────────┘           └──────────┘           └──────────┘
```

SevaSetu does the "hard work to make it simple" by mapping the bureaucratic maze behind a single search input. It provides a reliable prep-screen before routing the user to external systems, ensuring the user has the required documents, eligibility, and steps ready.

---

## 4. Target Users

SevaSetu's design must accommodate the vast diversity of the Indian population:

| Persona | Characteristics | Core Pain Point | SevaSetu Solution |
| :--- | :--- | :--- | :--- |
| **Aarav (24, Urban Graduate)** | Digitally native, mobile-first, expects speed. | Frustrated by slow, archaic government UIs and fragmented tracking. | Fast search, central status dashboard, modern visual experience. |
| **Savitri (52, Rural Farmer)** | Low digital literacy, uses Hinglish/Hindi, operates on low-end smartphone. | Cannot read complex English instructions; doesn't know what schemes exist. | Voice search, simple local-language summaries, step-by-step checklists. |
| **Baldev (68, Retired Clerk)** | Uses desktop, relies on screen magnification, needs assistance. | Small text, low contrast, complex navigation, keyboard-unfriendly forms. | WCAG-compliant high contrast, keyboard accessibility, screen-reader text. |
| **Common Service Center (CSC) Agent** | Uses portals on behalf of citizens in rural areas. | Managing credentials and links across dozens of different department sites. | Single service registry, quick links, copy-pasteable document checklists. |

---

## 5. Product Principles

1. **Service-First (Not Agency-First):** Focus on the user's task (e.g., "Renew License"), not the organization that provides it.
2. **Indianized Simplicity:** Design for the Indian context—supporting multilingual inputs, transliterated queries (Hinglish), and clear, accessible summaries.
3. **Extreme Accessibility:** Comply with web design guidelines and WCAG. Accessible UI is not a feature; it is the core architecture.
4. **Data Minimization & Privacy:** Respect the citizen's privacy. Do not store sensitive details (Aadhaar, PAN, financial values) unless explicitly required for active tracking.
5. **Robust Resilience (Fail-Safe Navigation):** If a government API is offline, gracefully degrade. Inform the user and guide them with offline steps rather than showing a broken white screen.

---

## 6. Competitive/Ecosystem Analysis

To design SevaSetu, we analyze existing benchmarks:

### 1. GOV.UK
- **Strengths:** Exceptional textual clarity, stark focus on user tasks, absolute standardization, no clutter.
- **Friction/Gaps:** Does not handle complex federal/state divisions (UK is unified), lacks multilingual support on a scale like India's, and assumes a very high baseline digital literacy.
- **Key Takeaway:** The "step-by-step" navigation pattern and clear prerequisite checklists are excellent patterns to adapt.

### 2. India.gov.in (National Portal of India)
- **Strengths:** Massive directory of links.
- **Friction/Gaps:** It is a static link directory. Clicking a service simply redirects you to an external home page (not the specific service page), leaving the user lost.
- **Key Takeaway:** SevaSetu must redirect to *deep links* and provide a "bridge screen" explaining what to do next.

### 3. UMANG
- **Strengths:** Highly integrated. Allows transactions directly inside the app.
- **Friction/Gaps:** Extremely department-centric (you must open the "EPFO department applet" to do anything). High technical fragility—if an API is slow, the whole app times out. Recent security issues exposed data.
- **Key Takeaway:** SevaSetu should remain an orchestration/gateway layer. It should pull data only via secure adapters and gracefully redirect for complex steps.

### 4. myScheme
- **Strengths:** Excellent eligibility wizard. Translates government schemes into a simple QA checklist.
- **Friction/Gaps:** Limited strictly to welfare schemes, not transactional services (like paying bills, renewal of licenses, etc.).
- **Key Takeaway:** The eligibility questionnaire pattern should be integrated directly into SevaSetu's service description pages.

---

## 7. Differentiation

SevaSetu differentiates itself from existing solutions by establishing a distinct service model:

```
┌─────────────────┬───────────────────────────────┬──────────────────────────────┐
│ Dimension       │ UMANG / India.gov.in          │ SevaSetu (Our Portal)        │
├─────────────────┼───────────────────────────────┼──────────────────────────────┤
│ Entry Point     │ Department Icons (Siloed)     │ Intent-Based Search (NLP)    │
│ State Federal   │ User must select State first  │ Auto-detected / Filtered     │
│ Security        │ Proxies/Stores sensitive data │ Pass-through & Purge Model   │
│ Outage Behavior │ Blank screen / crash error    │ Graceful fallback & offline  │
│ UX Paradigm     │ Complex forms inside applet   │ Preparation guide + Deep Link│
└─────────────────┴───────────────────────────────┴──────────────────────────────┘
```

---

## 8. User Journeys

Here we map the step-by-step experience for the major citizen pathways.

### Journey D: The User who does NOT know which department handles their problem
*Scenario: A citizen wants to get compensation for a delayed flight or report a cyber fraud.*

1. **User Goal:** File a complaint about a cyber phishing attack where money was stolen from their bank.
2. **User Action:** Types "cyber crime money stolen" in the search box.
3. **System Response:** 
   - Recognizes the intent `financial_cyber_crime`.
   - Maps it to the **National Cyber Crime Reporting Portal** (Ministry of Home Affairs).
4. **Information Shown:** 
   - A unified service card for "Report Cyber Crime".
   - Clear banner: *“First 24 Hours are Critical. Report immediately to freeze fraud accounts.”*
   - Documents required: Bank statement showing the transaction, screenshot of fraudulent message, ID proof.
   - Expected time to file: 15 minutes.
5. **Trust Considerations:** Security badge stating this data goes directly to the Ministry of Home Affairs. Prompt to write down a hotline number (`1930`) immediately in case the internet connection drops.
6. **Exit Point:** Click "Start Reporting" which opens the secure, deep-linked official page.

---

### Journey E: The User who searches using Hinglish
*Scenario: A driver wants to check their vehicle fines.*

1. **User Goal:** Check if there are traffic fines on their vehicle.
2. **User Action:** Types *"meri gaadi ka challan check karna hai"* or *"car fine search"*.
3. **System Response:** 
   - Parses `meri gaadi` -> Vehicle, `challan` -> Challan/Fine, `check karna hai` -> Query Status.
   - Matches with **E-Challan (MoRTH / State Traffic Police)**.
4. **Information Shown:**
   - Input field: "Enter Vehicle Number (e.g., DL1CA1234)" or "Challan Number".
   - Simple guide: How to locate vehicle chassis number if required.
5. **Errors Handling:** If the vehicle number is entered in a wrong format (e.g., missing digits), show an inline error: *"Format should be DL-1C-A-1234. Please check your RC card."*
6. **Exit Point:** View challan list (via mock API) and redirect to the payment gateway.

---

### Journey H: User reaches an official external government service
*Scenario: The user is leaving SevaSetu to complete a payment on a state portal.*

1. **User Goal:** Transition securely to the state tax portal without feeling like they fell into a phishing trap.
2. **User Action:** Clicks "Proceed to Pay Tax on Official Portal".
3. **System Response:** Displays a clear, accessible interstitial transition screen.
4. **Information Shown:**
   - Interstitial Banner: *“You are now leaving SevaSetu for the official Income Tax Department portal (incometax.gov.in).”*
   - Safety checklist: *"SevaSetu will never ask for your PIN, passwords, or credit card details on our site. Check for the padlock icon in the browser address bar."*
   - Automatic redirect countdown (5 seconds) with a manual "Go Now" button.
5. **Trust Considerations:** Avoid abrupt popups. Use the official government color scheme on the transition screen so it feels like a continuous, authorized journey.

---

## 9. Information Architecture

We classify the portal's information architecture based on its criticality for a highly functional prototype:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        INFORMATION ARCHITECTURE                        │
├───────────────────┬───────────────────┬────────────────┬───────────────┤
│ MUST HAVE (MVP)   │ SHOULD HAVE       │ NICE TO HAVE   │ FUTURE        │
├───────────────────┼───────────────────┼────────────────┼───────────────┤
│ • Homepage        │ • User Dashboard  │ • Feedback Hub │ • Voice Search│
│ • NLP Search      │ • State Selection │ • Saved        │ • Offline CSC │
│ • Service Details │ • SMS Alerts      │   Services     │   Kiosk Mode  │
│ • Eligibility QA  │                   │ • Multi-lang   │ • Automated   │
│ • Official Linkout│                   │   UI Toggle    │   DigiLocker  │
│ • Tracking Mock   │                   │                │   Data Pull   │
└───────────────────┴───────────────────┴────────────────┴───────────────┘
```

### Detailed IA Component Breakdown

- **Homepage [MUST HAVE]:** Minimalist search bar, list of 6 major categories, "Trending Services" grid, and a trust banner explaining what SevaSetu is.
- **Search & Search Results [MUST HAVE]:** A smart results page displaying matching services, matching schemes, and a clarifying panel if the query is ambiguous.
- **Service Detail Page [MUST HAVE]:** Standardized guidance containing title, short description, documents checklist, fees, timelines, step-by-step process flow, and the "Start Service" CTA.
- **Application Tracking Page [MUST HAVE]:** A simple screen where users paste their receipt/acknowledgment number to fetch a status roadmap (mocked for the prototype).
- **User Dashboard [SHOULD HAVE]:** Secure login area showing "Saved Services" and a timeline of "My Active Applications" with current statuses.
- **Accessibility Settings Panel [MUST HAVE]:** Toggle for contrast mode, font size adjustment, and a simple screen-reader audio guide helper.

---

## 10. The Search Experience

The search bar is the heart of SevaSetu. It must act as a translator.

```
                  ┌──────────────────────────────┐
                  │ User Types:                  │
                  │ "driving licence renew kaise │
                  │  karein, DL expired"         │
                  └──────────────┬───────────────┘
                                 │
                                 ▼
                  ┌──────────────────────────────┐
                  │    NLP / Parsing Engine      │
                  │  • Synonyms (DL = License)   │
                  │  • Intent (renew)            │
                  │  • Entity (Driving Licence)  │
                  └──────────────┬───────────────┘
                                 │
                                 ▼
                  ┌──────────────────────────────┐
                  │       Orchestrated Result    │
                  │  Surface: Driving Licence   │
                  │  Renewal Page with State      │
                  │  Selector                    │
                  └──────────────────────────────┘
```

### Core Architecture of the Search Engine

1. **Tokenization & Transliteration:** Clean the input. Map common Hinglish terms to English metadata tags:
   - *kaise karein, banana hai* -> `apply` / `create`
   - *gadi, gaadi, motor* -> `vehicle`
   - *fine, chalan, challan* -> `challan`
   - *naukri, sarkari naukri* -> `jobs`
   - *ghar, makan* -> `housing`
2. **Intent Matching:** Classify queries into intents: `query_status`, `apply_new`, `renew_document`, `make_payment`, `file_complaint`.
3. **Ambiguity Resolution:**
   - *Query:* "Apply for Pension"
   - *System:* Displays a prompt asking: *"Are you applying as a retired government employee, senior citizen, or widow?"* to narrow down to the correct central or state scheme.
4. **Zero-Result Handling:** Never display just "0 results found."
   - Provide alternative categories.
   - Show a public feedback box: *"What were you trying to accomplish today? We will add guidance for this soon."*
   - Display a direct link to the central public grievance system (CPGRAMS) in case the user wants to lodge a complaint.

---

## 11. Service Experience

Every service details page follows a strict layout, ensuring the citizen is fully prepared before navigating away:

```
┌─────────────────────────────────────────────────────────────┐
│  Category > Subcategory                                    │
│  <h1>Renew Driving Licence</h1>                             │
│  <p class="summary">Extend validity of a driving licence...</p>│
├─────────────────────────────────────────────────────────────┤
│  ⏱️ Time: 15-30 days   |  💰 Fees: ₹200 + state charges       │
├─────────────────────────────────────────────────────────────┤
│  📋 WHAT YOU WILL NEED                                      │
│  • Old physical Driving Licence                             │
│  • Form 1A (Medical Certificate - if age > 40)              │
│  • Address Proof (Aadhaar, Passport, Utility bill)          │
├─────────────────────────────────────────────────────────────┤
│  ⚡ ELIGIBILITY CHECK                                       │
│  [ Questionnaire: Are you older than 18? (Yes/No) ]         │
├─────────────────────────────────────────────────────────────┤
│  🗺️ STEP-BY-STEP PROCESS                                    │
│  1. Check eligibility and gather documents.                 │
│  2. Authenticate on Sarathi portal.                         │
│  3. Upload documents & pay fees.                            │
│  4. Book slot for test (if expired > 1 year).               │
├─────────────────────────────────────────────────────────────┤
│  [ Proceed to Official Portal (sarathi.parivahan.gov.in) ]  │
└─────────────────────────────────────────────────────────────┘
```

---

## 12. MVP Scope

We recommend **12 services** to demonstrate different types of workflows. 

### Selected MVP Services Table

| Service Name | Category | Scope | Demonstration Type | Technical Value |
| :--- | :--- | :--- | :--- | :--- |
| **1. Vehicle Challan Search & Pay** | Transport | State/Central | **Adapter API + Mock Pay** | Demonstrates database search (by Plate No) + transactional payment. |
| **2. Driving Licence Renewal** | Transport | State-specific | **Dynamic Redirect** | Demonstrates routing based on user state selection. |
| **3. EPF Balance & Claim Status** | Finance | Central | **Mock API Portal** | Demonstrates UAN status checking and timelines. |
| **4. Voter Registration (Form 6)** | Elections | Central | **Interactive Guide** | Demonstrates document preparation wizard. |
| **5. Income Tax filing (ITR-1/2)** | Taxation | Central | **Checklist + Redirect** | Demonstrates navigation of complex fiscal requirements. |
| **6. Passport Application** | MEA | Central | **Step-by-Step Flow** | Demonstrates physical slot booking mock interaction. |
| **7. DigiLocker Document Pull** | MeitY | Central | **Mock OAuth Integration** | Demonstrates secure third-party document fetching. |
| **8. PMAY Housing Scheme** | Welfare | Central/State | **Eligibility QA Wizard** | Demonstrates dynamic questionnaire logic. |
| **9. Cyber Crime Reporting** | Security | Central | **Mock Reporting Form** | Demonstrates file upload and anonymous submission flow. |
| **10. RTI Application Submission** | Governance | Central | **Form Wizard + Mock Pay** | Demonstrates form submission and grievance filing. |
| **11. PAN Card Correction** | Taxation | Central | **Prerequisite Checker** | Demonstrates document checking for ID correction. |
| **12. Aadhaar Enrolment Locator** | UIDAI | Central | **Geo-Locator Map Mock** | Demonstrates locating physical government help desks. |

### Out of Scope for MVP (Explicitly Excluded)
- **Real Financial Settlements:** No actual money will change hands (payments will use a sandbox simulator).
- **Direct Database Writing to Government Servers:** We will not attempt to write data to official government servers (which would be illegal/impossible without official authorization).
- **Real Aadhaar biometrics:** No biometric integrations.

---

## 13. Future Scope

Post-MVP features to turn the prototype into a national production deployment:
1. **Unified State Adapters:** Deep integrations with state-level administrative APIs.
2. **e-Sign & Digital Signature Integration:** Seamless document signing using Aadhaar e-Sign or PAN-based digital signatures.
3. **Voice Command Orchestration:** Allowing citizens to speak in their local dialect (Kannada, Tamil, Bengali, Marathi, etc.) to trigger services.
4. **Common Service Center (CSC) Kiosk Interface:** A lightweight, high-performance offline version optimized for broadband connections in rural villages.
5. **Automated Document Pre-Fill:** Integrated with DigiLocker to auto-fill registration forms directly from verified documents.

---

## 14. Security Requirements

Because SevaSetu handles citizen queries, it must implement strict security principles.

### 1. Data Minimization & Purging
The portal operates on a **pass-through** model. It does not store user documents or sensitive numbers (like Aadhaar/PAN) in its database. Once a transaction is completed or the session expires, user documents are purged from the memory cache.

### 2. Secure Interstitials for Redirections
Every external redirect must be verified. When a user clicks an external link:
- SevaSetu checks the destination URL against an **Official Domain Allowlist** (e.g., must end in `.gov.in` or `.nic.in`).
- If it does, show the trust banner.
- If it does not, block the redirect and warn the user of a potential phishing attempt.

### 3. Session Security
- SSL/TLS 1.3 enforced for all connections.
- Sessions automatically expire after 15 minutes of inactivity.
- Authentication tokens stored in `HttpOnly`, `Secure` cookies.

---

## 15. Accessibility Requirements

To make the platform inclusive, we integrate the strict guidelines from our web design rules:

- **Semantic HTML First:** Use `<button>`, `<a>`, `<label>`, and `<table>` tags directly. Do not build custom interactive controls with `<div>` or `<span>` unless absolutely necessary, and only with appropriate ARIA roles.
- **Focus States:** Every interactive element must display a visible, high-contrast focus ring (`focus-visible:ring-2 focus-visible:ring-indigo-600`). Never use `outline-none` without an explicit focus replacement.
- **Clickable Form Elements:** Text labels and checkboxes/radio buttons must share a single, generous hit target. No dead zones.
- **Tabular Data:** Use `font-variant-numeric: tabular-nums` for columns comparing prices, fees, or timelines to ensure aligned digits.
- **Spellcheck Disabling:** Disable spellchecking on field inputs for codes, registration numbers, emails, and usernames (`spellCheck={false}`).
- **Prevent Layout Shifts:** All image tags must have explicit `width` and `height` properties to prevent Content Layout Shift (CLS) on slow connections.
- **Reduced Motion:** Respect the user's browser settings. Disable transition animations if the user has `prefers-reduced-motion` enabled.

---

## 16. Design System Direction

### Critique of [DESIGN.md](file:///c:/Users/Lenovo/Desktop/Build%20for%20india/DESIGN.md)
The Vercel-inspired design token set in `DESIGN.md` uses a high-contrast developer theme (stark black/ink, monospaced fonts, and a mesh gradient of cyan, blue, magenta, and amber). This works well for a technical audience but is unsuitable for a citizen portal:
- It looks like a commercial SaaS startup, which reduces civic trust.
- Monospaced fonts for labels are hard for non-tech users to read.
- Colorful, glowing mesh gradients degrade contrast and make text layout unstable.
- Aggressive negative letter-spacing on display fonts makes Hindi and regional characters render incorrectly.

### Proposed Visual System (The Pivot)

We retain the layout, card structure, and spacing grid from `DESIGN.md` but replace the visual assets and colors:

```
┌────────────────────────────────────────────────────────────────────────┐
│                              COLOR SYSTEM                              │
├───────────────────┬───────────────────┬────────────────┬───────────────┤
│ Ashoka Blue       │ Warm Saffron      │ Forest Green   │ Ivory Canvas  │
│ `#0C2340`         │ `#D97706`         │ `#15803D`      │ `#FBFBFA`     │
│ (Primary/Trust)   │ (Accent/Alerts)   │ (Success/Live) │ (Page Canvas) │
└───────────────────┴───────────────────┴────────────────┴───────────────┘
```

- **Brand Colors:**
  - **Primary:** **Ashoka Blue** (`#0C2340`). Evokes government authority, stability, and trust.
  - **Secondary/Accent:** **Warm Saffron** (`#D97706` or `#F59E0B`). Used sparingly for alert badges, active steps, and notifications.
  - **Success:** **Forest Green** (`#15803D`). Used for approval states and valid status indicators.
  - **Warning/Error:** **Crimson Red** (`#DC2626`). Used for critical errors or expiration warnings.
  - **Canvas Background:** **Ivory Canvas** (`#FBFBFA`) and **Soft Sand** (`#F4F4F3`). Provides a warm background that reduces eye strain compared to pure white.
- **Typography:**
  - **Headings:** **Merriweather** (or standard serif system stack). Denny's authority, resembling official publications, providing a clear visual hierarchy.
  - **Body Copy:** **Inter** or standard system sans-serif. Highly legible at all sizes.
  - **Code/Ref Numbers:** **JetBrains Mono** or system monospace. Used strictly for alphanumeric tracking IDs and application reference numbers.
- **Shapes & Borders:**
  - Keep the standard border radius of `rounded-md` (8px) for informational cards and `rounded-sm` (6px) for form inputs. Avoid overly rounded pills (`rounded-full`) for CTAs to maintain a professional, administrative appearance.

---

## 17. Technical Architecture

SevaSetu will be implemented as a robust, modern full-stack web application:

```
                      ┌────────────────────────┐
                      │    Next.js Frontend    │
                      │    (Tailwind CSS v4)   │
                      └───────────┬────────────┘
                                  │
                                  ▼
                      ┌────────────────────────┐
                      │ Node.js/Express Backend│
                      │      (API Gateway)     │
                      └──────┬───────────┬─────┘
                             │           │
           ┌─────────────────┘           └─────────────────┐
           ▼                                               ▼
┌───────────────────────┐                       ┌──────────────────────┐
│  Services Registry    │                       │     AI/NLP Layer     │
│  • PostgreSQL DB      │                       │  • Intent Parsing    │
│  • Typesense Search   │                       │  • Lang / Translit   │
└───────────────────────┘                       └──────────────────────┘
```

### Technical Component Specifications

- **Frontend:** **Next.js (React)** with **Tailwind CSS v4**. Responsive, server-side rendered for SEO and fast initial load times on slow mobile networks.
- **Backend API Gateway:** **Node.js** with **Express** or Next.js API routes. Responsible for rate-limiting, request validation, and orchestrating downstream adapters.
- **Service Registry & Database:** **PostgreSQL** to store categories, service descriptions, requirements checklists, and official link metadata.
- **Search Engine:** **Typesense** or **Elasticsearch**. Handles typo tolerance, prefix matching, and keyword queries in parallel with the AI engine.
- **AI/NLP Layer:** A lightweight parsing service (using a local transformer model or an API endpoint) specialized in identifying intent from Hinglish and regional syntax.
- **Caching Layer:** **Redis** for managing session caching and temporary registration data.

---

## 18. Database Model

The conceptual database schema handles service discovery, application tracking, and user saved items:

```
  ┌──────────────────┐               ┌───────────────────┐
  │   Organisation   │ 1           * │    Department     │
  │  (e.g., ECI,     ├───────────────► (e.g., Election   │
  │   Min of Finance)│               │  Commission State)│
  └──────────────────┘               └─────────┬─────────┘
                                               │ 1
                                               ▼ *
  ┌──────────────────┐ *           1 ┌───────────────────┐
  │     Category     │◄──────────────┤      Service      │
  │  (Tax, Transport)│               │ (Apply Voter Card)│
  └──────────────────┘               └─────────┬─────────┘
                                               │ 1
                                               ▼ *
  ┌──────────────────┐ *           1 ┌───────────────────┐
  │   Application    │◄──────────────┤    Requirement    │
  │  (Track receipt) │               │ (Docs, fees, etc.)│
  └──────────────────┘               └───────────────────┘
```

### Entity Schema Definition

#### 1. `GovernmentOrganisation`
- `id` (UUID, PK)
- `name` (VARCHAR, e.g., "Ministry of Road Transport and Highways")
- `code` (VARCHAR, unique, e.g., "MoRTH")
- `level` (ENUM: 'central', 'state')

#### 2. `Department`
- `id` (UUID, PK)
- `name` (VARCHAR, e.g., "Delhi Transport Department")
- `org_id` (UUID, FK -> `GovernmentOrganisation`)
- `official_url` (VARCHAR)

#### 3. `Category`
- `id` (UUID, PK)
- `title` (VARCHAR, e.g., "Transport & Vehicles")
- `slug` (VARCHAR, unique)
- `description` (TEXT)

#### 4. `Service`
- `id` (UUID, PK)
- `category_id` (UUID, FK -> `Category`)
- `dept_id` (UUID, FK -> `Department`)
- `title` (VARCHAR)
- `description` (TEXT)
- `average_processing_time` (VARCHAR, e.g., "15 Days")
- `estimated_fees` (DECIMAL)
- `official_deep_link` (TEXT)
- `is_state_specific` (BOOLEAN)
- `tags` (ARRAY of VARCHAR for search indexing)

#### 5. `ServiceRequirement`
- `id` (UUID, PK)
- `service_id` (UUID, FK -> `Service`)
- `requirement_type` (ENUM: 'document', 'eligibility_rule', 'fee_detail')
- `description` (TEXT)
- `is_mandatory` (BOOLEAN)

#### 6. `ServiceStep`
- `id` (UUID, PK)
- `service_id` (UUID, FK -> `Service`)
- `step_number` (INTEGER)
- `title` (VARCHAR)
- `instructions` (TEXT)

#### 7. `Application`
- `id` (UUID, PK)
- `user_id` (UUID, FK -> `User`, nullable)
- `service_id` (UUID, FK -> `Service`)
- `receipt_number` (VARCHAR, unique)
- `current_status` (VARCHAR)
- `submission_date` (TIMESTAMP)
- `last_updated` (TIMESTAMP)

---

## 19. API Architecture

The backend REST API is divided into clean operational blocks:

### 1. `/api/v1/search`
- **`GET /`**: Executes search queries. Accepts `q` (query string), `state` (filter), and `lang`. Returns prioritized list of matching services and schemes.
- **`GET /suggest`**: Auto-complete and query suggestions.

### 2. `/api/v1/services`
- **`GET /`**: Lists services, filterable by category.
- **`GET /:id`**: Fetches detail page configuration, checklist, eligibility rules, and official links.
- **`GET /:id/eligibility`**: Processes the responses to the questionnaire and returns eligibility assessment.

### 3. `/api/v1/applications`
- **`POST /track`**: Accepts a `receipt_number` and `service_id`. Returns status timeline, current checkpoint, and estimated completion date.
- **`POST /`**: Creates a local application tracking bookmark.

### 4. `/api/v1/auth`
- **`POST /otp/send`**: Sends an OTP to user mobile.
- **`POST /otp/verify`**: Validates OTP and sets a secure cookie.

---

## 20. Government Integration Strategy

A critical distinction must be maintained between real production integrations and our current prototype.

```
┌────────────────────────────────────────────────────────┐
│             REAL PRODUCTION ARCHITECTURE               │
│                                                        │
│  [SevaSetu App] ──► [API Setu] ──► [Gov Department]    │
│  (Auth Token)        (Gateway)      (Real Database)    │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│             SEVASETU PROTOTYPE BOUNDARY               │
│                                                        │
│  [SevaSetu App] ──► [Mock Adapter]                     │
│                      • Returns static responses        │
│                      • Simulates payment success       │
│                      • Simulates receipt generation    │
└────────────────────────────────────────────────────────┘
```

1. **Aadhaar / DigiLocker Verification:**
   - *Real:* Pull files from DigiLocker using government OAuth authorization.
   - *Prototype:* Mock OAuth screen. The user selects a mock profile (e.g., "Ramesh Kumar"), and the system instantly populates the document list with a mock Aadhaar and PAN card.
2. **Payment Processing:**
   - *Real:* Integration with Bharatkosh or UPI payment aggregators.
   - *Prototype:* Simulated payment dialog. A QR code is generated. Clicking "Scan & Pay" mock completes the transaction and generates a receipt number.
3. **Application Tracking:**
   - *Real:* Polling department APIs via API Setu endpoint adapters.
   - *Prototype:* Static database search. When a mock tracking number (e.g., `EPF-9923-2026`) is queried, it returns a 4-step status road map showing progress.

---

## 21. Admin Catalog Management

An administrative dashboard is essential to keep the registry accurate.

### Catalog Editor Interface [FUTURE]
- **Service Registry CRUD:** Add, edit, or disable services. Update deep-linked official URLs when government portals change domain addresses.
- **Prerequisite Checklist Editor:** Update required documents, application fees, or state-level variations.
- **Broken Link Tracker:** Automated daily script checks all official URLs. If a `.gov.in` domain returns a `404` or timeout, it raises a flag to the administrator to review and update the redirect link.
- **Search Failure Analyzer:** Aggregates search terms that returned zero results to help administrators identify missing keywords or newly launched government services.

---

## 22. Analytics

Key metrics to monitor the health and performance of SevaSetu:

- **Search-to-Service Conversion Rate:** The percentage of users who search and proceed to click "Start Service" or view details. Low conversion implies poor search relevance.
- **Zero-Result Queries:** Captures exactly what strings returned nothing, enabling rapid additions to the search synonym dictionary.
- **Hinglish vs. English Ratio:** Tracks the language patterns used to tune the natural language processing dictionary.
- **Redirect Exit Rate:** The rate at which users click through to official portals.
- **Drop-off Checkpoints:** Tracks which steps in the prerequisite checklists cause users to close the page (identifying confusing requirements).

---

## 23. Edge Cases

### Edge Case Matrix

| Failure Scenario | User Experience (UX) Response | Trust Consideration |
| :--- | :--- | :--- |
| **Vague Query** *(e.g., "tax")* | Display a clarifying disambiguation panel: *"Are you paying Income Tax, filing GST, or paying Road/Vehicle Tax?"* | Prevents incorrect routing. |
| **Official Site Down** *(e.g., Sarathi offline)* | Show status badge: *"Official Ministry site is experiencing downtime."* Offer offline instructions and notify when back online. | Positions SevaSetu as an honest, reliable source. |
| **No Search Matches** | Suggest standard categories. Show feedback input box. Redirect to CPGRAMS public grievance. | Avoids dead ends. |
| **Language Transliteration Error** | Suggest: *"Did you mean 'Gadi ka Challan'?"* based on phonetic matching. | Builds confidence for non-English users. |
| **Outdated Info Found** | Every service card displays: *"Last verified on [Date] by SevaSetu Team"* alongside a "Report out-of-date info" flag. | Crowd-sourced validation maintains accuracy. |

---

## 24. Risks & Mitigations

### 1. Risk: Downstream Government Site Changes
*Risk:* Government departments frequently change portal links without warning, breaking our deep links.
*Mitigation:* Build a link-checking worker that scans all official URLs every 24 hours. Auto-flag broken redirects and display an alert to the user: *"Official portal changed. Redirecting to home page."*

### 2. Risk: User Security Mistrust
*Risk:* Citizens might suspect SevaSetu is a phishing portal attempting to harvest Aadhaar/PAN details.
*Mitigation:* Put security messaging on every screen. Never prompt the user to input passwords or secret PINs. Use visual identifiers that match government styling, but state clearly that SevaSetu is a helper platform, not the final authority.

### 3. Risk: High NLP Error Rates for Regional Slang
*Risk:* Natural language parser fails to match regional synonyms or mixed Haryanvi/Bengali/Hindi terms.
*Mitigation:* Combine NLP with standard elastic keyword indexes. Rely on simple fallback categories so users can always navigate manually if search fails.

---

## 25. Recommended Build Order

We propose a structured, step-by-step implementation plan for the development phase:

### Step 1: Project Scaffolding
- Set up Next.js application using Tailwind CSS v4.
- Configure theme variables following the pivoted design language (Ashoka Blue, Ivory Canvas).

### Step 2: Database Schema & Registry
- Set up PostgreSQL database tables.
- Populate the registry with the 12 selected MVP services, including step-by-step checklists and documents.

### Step 3: Search Engine Integration
- Set up local search indexing.
- Implement synonym mapping for Hinglish keywords.

### Step 4: UI Service Detail Templates
- Design the standardized service detail template.
- Implement the accessibility control options.

### Step 5: Mock Integrations (Aadhaar & Payments)
- Implement the profile selection mock to simulate pulling files from DigiLocker.
- Build the payment QR-code gateway simulator.

### Step 6: Verification & Walkthrough
- Verify against web-design-guidelines rules.
- Draft the walkthrough documentation.

---

## 26. Open Questions / Decisions Required

Before we proceed with the prototype implementation, the following design decisions must be locked:

1. **Pivoted Design Colors:** Should we officially adopt the **Ashoka Blue** (`#0C2340`) and **Ivory Canvas** (`#FBFBFA`) colors as the primary system, completely replacing the developer theme in `DESIGN.md`?
2. **Direct Mocks vs. Sandbox APIs:** For services like EPFO or Challan, should we rely purely on local database mock states, or attempt to connect to sandbox digital public infrastructure (DPI) test APIs if available? (Recommended: Pure local mocks to ensure 100% uptime and speed during evaluation).
3. **Multilingual Mocking scope:** Should the MVP translation feature demonstrate fully translated pages for a few selected services, or simply show a toggle that changes the header and description text? (Recommended: Full translation mock for 1-2 services, simple header toggle for others).

---

## PHASE 1 DECISIONS REQUIRED
- [ ] Confirm the pivoted **SevaSetu** product name and value proposition.
- [ ] Approve the design system change (from Vercel-mesh-gradient to Ashoka Blue/Ivory Canvas).
- [ ] Approve the list of 12 selected MVP services.
- [ ] Confirm the local-only database mock strategy for sensitive transactions (payments, Aadhaar).
