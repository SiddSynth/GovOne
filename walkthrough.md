# GOVONE PROTOTYPE WALKTHROUGH

We have successfully completed the implementation of the **GovOne** intent-first citizen services gateway prototype. The codebase has been fully verified and builds with zero errors or warnings under Next.js 15 and TypeScript.

---

## 1. Visual Verification & Project Layout

The repository has been structured as a standard Next.js App Router project:

- [package.json](file:///c:/Users/Lenovo/Desktop/Build%20for%20india/package.json): Installed Next.js 15, React 19, Tailwind CSS v4, Lucide React, and TypeScript.
- [tsconfig.json](file:///c:/Users/Lenovo/Desktop/Build%20for%20india/tsconfig.json): Configured with bundler module resolution and `@/*` path mapping to `./src/*`.
- [postcss.config.mjs](file:///c:/Users/Lenovo/Desktop/Build%20for%20india/postcss.config.mjs): Added Tailwind CSS v4 PostCSS compiler plugin support.

### Component Folders
- [src/data/servicesRegistry.ts](file:///c:/Users/Lenovo/Desktop/Build%20for%20india/src/data/servicesRegistry.ts): The seeded registry containing metadata for our 12 MVP services (Central & State).
- [src/utils/searchEngine.ts](file:///c:/Users/Lenovo/Desktop/Build%20for%20india/src/utils/searchEngine.ts): NLP intent translation, Hinglish dictionary matching, and confidence score scoring logic.
- [src/context/AccessibilityContext.tsx](file:///c:/Users/Lenovo/Desktop/Build%20for%20india/src/context/AccessibilityContext.tsx): Global client-side provider managing high contrast state and font-size scaling.
- [src/components/Navbar.tsx](file:///c:/Users/Lenovo/Desktop/Build%20for%20india/src/components/Navbar.tsx): Head navigation containing the access toolbar, language toggle, and branding links.
- [src/components/Footer.tsx](file:///c:/Users/Lenovo/Desktop/Build%20for%20india/src/components/Footer.tsx): Semantic footer with support links and prototype warnings.

---

## 2. Core Features Demonstrated

### A. Search-First Homepage & Autocomplete
- **No Marketing Clutter:** The homepage is designed solely as a search portal.
- **Phonetic Hinglish Support:** Translates colloquial queries (e.g. *"meri gaadi ka challan check karna"*) into verified tasks (*"Search & Pay Traffic Challan"*).
- **Match-Confidence Cards:** Renders 1–3 highly relevant matching cards outlining Service Name, Description, Department, Fees, Processing Time, and a direct "View Service Requirements" CTA link.
- **Directory Fallback:** A single text link routes users to the full catalog directory page: *"Browse all government services →"*.

### B. Standardized Service Details Page
- Displays timeline, estimated fees, and authority department.
- **Prerequisite Checklist:** Interactive checkboxes allow citizens to check off documents (e.g., Form 1A, original DL) before leaving.
- **Eligibility Check:** Questionnaire using Yes/No prompts assesses qualifying rules in real-time.
- **Official Redirect Interstitial:** If proceeding to an external government website, shows a secure warning modal containing the verified destination domain and confirmation buttons.

### C. Simulated Mock Transactions & DigiLocker Linkage
- **DigiLocker Profile Picker:** Users can click "Link DigiLocker" to instantly load Ramesh Kumar's verified profile details (Aadhaar, PAN, Address), auto-completing form fields.
- **QR Code Payments:** Simulates payment fees with a mock UPI QR dialog and confirmation receipts.
- **Local Application Tracking:** Successful mocks generate unique receipts (e.g. `CHL-3841-2026`) and append them to browser local storage.

### D. Application Tracking & Roadmap Stepper
- [src/app/track/page.tsx](file:///c:/Users/Lenovo/Desktop/Build%20for%20india/src/app/track/page.tsx): Offers search by reference number.
- Displays a 5-step roadmap (`Submitted` → `Document Verification` → `Officer Screening` → `Approved` → `Dispatched`).
- Pre-seeded tracking IDs are provided in a helper panel for instant evaluator check-offs:
  - `DLN-1402-2026`: Renewed Licence (Dispatched)
  - `EPF-9923-2026`: PF Claim Audit (Officer Screening)
  - `ECI-6421-2026`: Voter Card (Document Verification)
  - `CHL-8821-2026`: Traffic Challan (Submitted)

---

## 3. Compliance and Accessibility Auditing

We verified compliance against the **Web Interface Guidelines**:

- **Keyboard Focus States:** Explicit `:focus-visible` ring parameters applied to all interactive links, checkboxes, radio selections, and buttons.
- **Semantic HTML Tags:** Structured with proper elements (`<header>`, `<nav>`, `<aside>`, `<main>`, `<footer>`).
- **High-contrast Mode:** Accessible buttons instantly activate a `.high-contrast` class on the wrapper element, swapping colors to pure high-contrast values to help visually impaired citizens.
- **Text Sizing:** Accessibility controls allow toggling font sizes (Normal → Large → Extra Large) in real-time, matching browser preferences.

---

## 4. How to Run the Prototype

To start the development server locally, execute the following commands in your console:

```powershell
# Install any added node modules (if clean setup)
npm install

# Start Next.js development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser to test the portal.
To build a production bundle, run:
```powershell
npm run build
```
