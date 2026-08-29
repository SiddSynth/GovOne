# GovOne: Unified Indian Citizen-Services Gateway

GovOne is a functional citizen-services portal prototype designed to simplify how users interact with central and state government services in India. Instead of navigating separate agency sites or directories, citizens describe their task in plain language (English, Hindi, or Hinglish) and get routed directly to verified checklists, eligibility requirements, and secure official portal links.

The guiding philosophy of GovOne design is:
**"Simple enough for everyone. Trustworthy enough for government."**

---

## Key Features

1. **Intent-First Search Console:** Translates colloquial descriptions (e.g. *"license renew karwana hai"*, *"meri gaadi ka challan check karna"*) into registered services using a custom phonetic transliteration dictionary.
2. **Accessible, Calm Design:** Clean Noto Sans typography, structured rectangular layout boundaries, and visual elements optimized for readability and keyboard navigation.
3. **Simulated DigiLocker Profile Prefill:** Automatically populates online application forms using mock profile e-KYC integration (demo credentials for Ramesh Kumar).
4. **Mock Payment & Status Tracking:** Generates unique reference receipt IDs upon simulated QR code payments and monitors verification steps (`Submitted` → `Document Verification` → `Officer Screening` → `Approved` → `Dispatched`).
5. **Verified Redirection Interstitial:** Safely alerts citizens before transferring them to external government portals, confirming verified `.gov.in` and `.nic.in` domains.

---

## Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Library:** React 19
- **Styles:** Tailwind CSS v4 (configured with Noto Sans & institutional color palettes)
- **Icons:** Lucide React
- **Language:** TypeScript

---

## Seeded MVP Services (12 Services)

1. **Driving Licence Renewal** (Ministry of Road Transport and Highways)
2. **Search & Pay Traffic Challan** (State Police Departments / Parivahan)
3. **Apply for Fresh/Reissue Passport** (Ministry of External Affairs)
4. **Apply for Fresh/Reissue of PAN Card** (Income Tax Department / NSDL)
5. **Income Tax Return (ITR) Filing** (Income Tax Department)
6. **EPFO Member Services Portfolio** (Employees' Provident Fund Organisation)
7. **New Voter Registration (Form 6)** (Election Commission of India)
8. **Pradhan Mantri Awas Yojana (PMAY) Housing Application** (Ministry of Housing and Urban Affairs)
9. **National Pension System (NPS) Enrollment** (PFRDA)
10. **Register a Cyber Crime Complaint** (Ministry of Home Affairs)
11. **Pradhan Mantri Jan Dhan Yojana (PMJDY) Account opening** (Department of Financial Services)
12. **Book an Aadhaar Enrollment Appointment** (UIDAI)

---

## Getting Started

Follow these steps to run the GovOne prototype locally:

### 1. Prerequisites
Make sure you have Node.js installed (v18.x or higher recommended).

### 2. Installation
Clone the repository, navigate to the project directory, and install dependencies:
```bash
npm install
```

### 3. Start Development Server
Start the local Next.js server:
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser to view the application.

### 4. Build Production Bundle
To compile and optimize the build:
```bash
npm run build
npm run start
```

---

## Accessibility and Standards Compliance

GovOne targets **WCAG AAA** guidelines where practical, with **WCAG AA** as the minimum baseline:
- Full keyboard focus rings (`focus-visible:ring-2 focus-visible:ring-accent`) on interactive elements.
- Accessible Contrast Toolbar (toggle Contrast Mode).
- Dynamic Text scaling (Normal, Large, and Extra Large scaling factors).
- Proper semantic HTML structure.

---

## Disclaimer

**Educational Prototype Only:** This application is built as a proof-of-concept for the *"Build for India"* initiative. It is NOT an official government portal, and does NOT connect to active government databases or process real financial transactions. No personal data (including Aadhaar or PAN) is collected or stored.
