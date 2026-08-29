export interface GovernmentOrganisation {
  code: string;
  name: string;
  level: "central" | "state";
}

export interface Department {
  id: string;
  name: string;
  orgCode: string;
  officialUrl: string;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string; // Matches Lucide icon names
}

export interface ServiceRequirement {
  type: "document" | "eligibility_rule" | "fee_detail";
  description: string;
  isMandatory: boolean;
}

export interface ServiceStep {
  number: number;
  title: string;
  instructions: string;
}

export interface Service {
  id: string;
  categoryId: string;
  deptId: string;
  title: string;
  description: string;
  averageProcessingTime: string;
  estimatedFees: string;
  officialDeepLink: string;
  isStateSpecific: boolean;
  tags: string[];
  requirements: ServiceRequirement[];
  steps: ServiceStep[];
  hasMockForm?: boolean;
  hasMockPayment?: boolean;
  hasMockEligibility?: boolean;
  hasMockTracking?: boolean;
  mockTrackingPrefix?: string;
}

// 1. Organisations Seed
export const organisations: GovernmentOrganisation[] = [
  { code: "MoRTH", name: "Ministry of Road Transport and Highways", level: "central" },
  { code: "EPFO", name: "Employees' Provident Fund Organisation", level: "central" },
  { code: "ECI", name: "Election Commission of India", level: "central" },
  { code: "MoF", name: "Ministry of Finance - Income Tax Department", level: "central" },
  { code: "MEA", name: "Ministry of External Affairs", level: "central" },
  { code: "MeitY", name: "Ministry of Electronics and Information Technology", level: "central" },
  { code: "MoHUA", name: "Ministry of Housing and Urban Affairs", level: "central" },
  { code: "MHA", name: "Ministry of Home Affairs - Cyber Crime Coordination", level: "central" },
  { code: "CIC", name: "Central Information Commission", level: "central" },
  { code: "UIDAI", name: "Unique Identification Authority of India", level: "central" },
];

// 2. Departments Seed
export const departments: Department[] = [
  { id: "morth-vahan", name: "Vahan Vehicle Services", orgCode: "MoRTH", officialUrl: "https://vahan.parivahan.gov.in" },
  { id: "morth-sarathi", name: "Sarathi License Services", orgCode: "MoRTH", officialUrl: "https://sarathi.parivahan.gov.in" },
  { id: "epfo-portal", name: "EPFO Unified Member Portal", orgCode: "EPFO", officialUrl: "https://unifiedportal-mem.epfindia.gov.in" },
  { id: "eci-voter", name: "National Voters' Service Portal (NVSP)", orgCode: "ECI", officialUrl: "https://voters.eci.gov.in" },
  { id: "mof-incometax", name: "e-Filing Portal Income Tax", orgCode: "MoF", officialUrl: "https://eportal.incometax.gov.in" },
  { id: "mea-passport", name: "Passport Seva Project", orgCode: "MEA", officialUrl: "https://passportindia.gov.in" },
  { id: "meity-digilocker", name: "DigiLocker Service Gateway", orgCode: "MeitY", officialUrl: "https://digilocker.gov.in" },
  { id: "mohua-pmay", name: "PMAY Urban Portal", orgCode: "MoHUA", officialUrl: "https://pmaymis.gov.in" },
  { id: "mha-cyber", name: "National Cyber Crime Reporting Portal", orgCode: "MHA", officialUrl: "https://cybercrime.gov.in" },
  { id: "cic-rti", name: "RTI Online System", orgCode: "CIC", officialUrl: "https://rtionline.gov.in" },
  { id: "uidai-portal", name: "UIDAI MyAadhaar Portal", orgCode: "UIDAI", officialUrl: "https://myaadhaar.uidai.gov.in" },
];

// 3. Categories Seed
export const categories: Category[] = [
  { id: "transport", title: "Transport & Vehicles", slug: "transport", description: "Driving Licence, Vehicle Challans, RC book and permits", icon: "Car" },
  { id: "taxation", title: "Taxes & Finance", slug: "taxation", description: "Income Tax Returns, PAN Card services, and GST filings", icon: "DollarSign" },
  { id: "identity", title: "Identity & Documents", slug: "identity", description: "Aadhaar Services, DigiLocker docs, and Voter cards", icon: "FileText" },
  { id: "welfare", title: "Social Welfare & Schemes", slug: "welfare", description: "Housing schemes, pensions, benefits, and grants", icon: "Heart" },
  { id: "security", title: "Security & Crime Reporting", slug: "security", description: "Cybercrime complaints, public warnings, and safety reporting", icon: "Shield" },
  { id: "governance", title: "Governance & Grievance", slug: "governance", description: "Right to Information (RTI) filing and public grievances", icon: "Scale" },
];

// 4. Services Seed
export const services: Service[] = [
  {
    id: "vehicle-challan-pay",
    categoryId: "transport",
    deptId: "morth-vahan",
    title: "Search & Pay Traffic Challan",
    description: "Check and settle pending traffic fines/challans associated with your vehicle registration or driving licence number.",
    averageProcessingTime: "Instant (Real-time updates)",
    estimatedFees: "Varies depending on offence (No portal surcharge)",
    officialDeepLink: "https://echallan.parivahan.gov.in/index/accused-challan",
    isStateSpecific: true,
    tags: ["challan", "fine", "traffic", "car fine", "gaadi fine", "police fine", "vahan", "morth", "pay challan"],
    requirements: [
      { type: "document", description: "Vehicle Registration Number (RC) or Challan Number", isMandatory: true },
      { type: "document", description: "Engine Number & Chassis Number (last 5 characters) for security validation", isMandatory: true },
      { type: "fee_detail", description: "Fines can be paid online via NetBanking, UPI, or Debit/Credit card", isMandatory: false },
    ],
    steps: [
      { number: 1, title: "Enter Vehicle details", instructions: "Input your license plate number or specific challan ID received via SMS." },
      { number: 2, title: "Review Offence details", instructions: "Examine the photo evidence, date, time, and location of the violation." },
      { number: 3, title: "Proceed to Payment Gateway", instructions: "Choose a secure payment mode and finalize the payment. A transaction receipt will be generated." },
    ],
    hasMockForm: true,
    hasMockPayment: true,
    hasMockTracking: true,
    mockTrackingPrefix: "CHL",
  },
  {
    id: "driving-licence-renew",
    categoryId: "transport",
    deptId: "morth-sarathi",
    title: "Renew Driving Licence (DL)",
    description: "Submit an application to renew an expired or expiring Driving Licence online, avoiding the need for brokers or RTO visits.",
    averageProcessingTime: "15 to 30 Days",
    estimatedFees: "₹200 (Renewal fee) + ₹200 (Smart Card fee if applicable)",
    officialDeepLink: "https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do",
    isStateSpecific: true,
    tags: ["license", "licence", "driving licence", "dl", "renew dl", "license expire", "rto", "parivahan"],
    requirements: [
      { type: "document", description: "Original physical Driving Licence (DL) number", isMandatory: true },
      { type: "document", description: "Proof of Address (Aadhaar Card, Passport, or Utility Bill)", isMandatory: true },
      { type: "document", description: "Medical Certificate Form 1A (Mandatory if applicant is older than 40 years or renewing transport licence)", isMandatory: false },
      { type: "eligibility_rule", description: "Must apply within 1 year before expiry or up to 1 year after expiry (post 1 year requires a driving re-test)", isMandatory: true },
    ],
    steps: [
      { number: 1, title: "Select State & Enter DL Details", instructions: "Select the state where your RTO is located and input your DL number." },
      { number: 2, title: "Upload Supporting Documents", instructions: "Upload scanned copies of address proof, original DL, and Medical Certificate Form 1A if required." },
      { number: 3, title: "Pay RTO Fees", instructions: "Settle RTO application fees online and print the fee acknowledgment receipt." },
      { number: 4, title: "RTO Verification", instructions: "RTO officer will verify documents. The renewed license card is sent via Speed Post." },
    ],
    hasMockEligibility: true,
    hasMockForm: true,
    hasMockTracking: true,
    mockTrackingPrefix: "DLN",
  },
  {
    id: "epf-balance-status",
    categoryId: "taxation",
    deptId: "epfo-portal",
    title: "Check EPF Balance & Claim Status",
    description: "Verify your Employees' Provident Fund (EPF) account balance, view member passbooks, and check withdrawal claim settlement status.",
    averageProcessingTime: "Instant (Balance check) | 7-10 Days (Withdrawal claims)",
    estimatedFees: "Free of cost",
    officialDeepLink: "https://passbook.epfindia.gov.in/MemberPassBook/Login",
    isStateSpecific: false,
    tags: ["pf", "epf", "provident fund", "pf balance", "uan", "pf claim", "pf withdrawal", "epfo", "retire pension"],
    requirements: [
      { type: "document", description: "Active Universal Account Number (UAN)", isMandatory: true },
      { type: "eligibility_rule", description: "UAN must be activated on the Member Portal, and linked to your active mobile number", isMandatory: true },
      { type: "eligibility_rule", description: "Aadhaar authentication status must be verified and seeded in member records", isMandatory: true },
    ],
    steps: [
      { number: 1, title: "Login with UAN & Password", instructions: "Log in using your 12-digit UAN on the official EPFO Member Passbook website." },
      { number: 2, title: "Select Member ID", instructions: "Select the specific employer Member ID associated with the account you want to inspect." },
      { number: 3, title: "View Passbook or Claim Status", instructions: "Inspect the details of employer/employee monthly deposits, interest earned, or click 'Track Claim' to follow withdrawals." },
    ],
    hasMockForm: true,
    hasMockTracking: true,
    mockTrackingPrefix: "EPF",
  },
  {
    id: "voter-registration",
    categoryId: "identity",
    deptId: "eci-voter",
    title: "New Voter Registration (Form 6)",
    description: "Register as a voter in the Electoral Roll to obtain a Voter ID Card (EPIC) for the upcoming general or assembly elections.",
    averageProcessingTime: "30 to 45 Days",
    estimatedFees: "Free of cost",
    officialDeepLink: "https://voters.eci.gov.in",
    isStateSpecific: false,
    tags: ["voter ID", "voter card", "apply voter", "epic card", "elections", "vote register", "form 6", "eci"],
    requirements: [
      { type: "document", description: "Passport Size Photograph (Recent, clear face)", isMandatory: true },
      { type: "document", description: "Proof of Age (Aadhaar Card, Birth Certificate, PAN Card, or 10th Class Certificate)", isMandatory: true },
      { type: "document", description: "Proof of Ordinary Residence (Aadhaar, Passport, Utility bill, or Bank passbook)", isMandatory: true },
      { type: "eligibility_rule", description: "Must be a citizen of India and have completed 18 years of age as of the qualifying date", isMandatory: true },
    ],
    steps: [
      { number: 1, title: "Fill Online Form 6", instructions: "Register an account on voters.eci.gov.in and fill in details such as name, age, address, and constituency." },
      { number: 2, title: "Upload Photograph & Proof Docs", instructions: "Upload scanned copies of photo, residence proof, and age proof." },
      { number: 3, title: "Submit & Track Application", instructions: "Review and submit the details. Keep the Application Reference Number to track Booth Level Officer (BLO) field verification." },
      { number: 4, title: "Voter Card Delivery", instructions: "After successful BLO verification, your name is entered in the electoral roll and EPIC card is delivered via post." },
    ],
    hasMockForm: true,
    hasMockTracking: true,
    mockTrackingPrefix: "ECI",
  },
  {
    id: "itr-filing",
    categoryId: "taxation",
    deptId: "mof-incometax",
    title: "Income Tax Return (ITR) Filing",
    description: "File your annual Income Tax Return (ITR-1 or ITR-2) online to declare income, claim tax deductions, and receive refunds.",
    averageProcessingTime: "15 to 45 Days (For processing & refund)",
    estimatedFees: "Free on government portal (Commercial charges if using private aggregators)",
    officialDeepLink: "https://eportal.incometax.gov.in/iec/foservices/#/login",
    isStateSpecific: false,
    tags: ["tax", "income tax", "itr", "itr filing", "tax refund", "pan", "form 16", "tds", "pay tax"],
    requirements: [
      { type: "document", description: "PAN Card (seeded with Aadhaar)", isMandatory: true },
      { type: "document", description: "Form 16 (Salary Certificate issued by employer) or Form 26AS (tax credit statement)", isMandatory: true },
      { type: "document", description: "Bank Account details (linked to Aadhaar for receiving refund)", isMandatory: true },
      { type: "document", description: "Interest certificates from banks, investment proofs (80C, 80D, etc.) if filing under old tax regime", isMandatory: false },
    ],
    steps: [
      { number: 1, title: "Pre-fill Data check", instructions: "Log in and verify pre-filled details fetched from Form 26AS/AIS (Annual Information Statement)." },
      { number: 2, title: "Verify Income & Deductions", instructions: "Review salary, interest, house property income, and fill in eligible tax-saving deductions." },
      { number: 3, title: "Compute & Pay Balance Tax", instructions: "If additional tax is due, pay it online. If tax was overpaid, the system will compute the refund amount." },
      { number: 4, title: "e-Verify Return", instructions: "Sign and e-verify your return using Aadhaar OTP or EVC (Electronic Verification Code) within 30 days of submission." },
    ],
    hasMockEligibility: true,
    hasMockForm: true,
    hasMockTracking: true,
    mockTrackingPrefix: "ITR",
  },
  {
    id: "passport-apply",
    categoryId: "identity",
    deptId: "mea-passport",
    title: "Apply for Fresh / Reissue Passport",
    description: "Submit an application to obtain a new Indian Passport or request a reissue due to expiration, page exhaustion, or personal detail changes.",
    averageProcessingTime: "10 to 15 Days (Normal) | 3-5 Days (Tatkaal)",
    estimatedFees: "₹1,500 (Normal - 36 pages) | ₹3,500 (Tatkaal - 36 pages)",
    officialDeepLink: "https://portal2.passportindia.gov.in/AppOnlineProject/welcomeLink",
    isStateSpecific: false,
    tags: ["passport", "fresh passport", "reissue passport", "tatkaal passport", "mea", "passport seva", "visa doc", "travel document"],
    requirements: [
      { type: "document", description: "Proof of Address (Aadhaar Card, Water/Electricity Bill, Rent Agreement)", isMandatory: true },
      { type: "document", description: "Proof of Date of Birth (Birth Certificate, PAN Card, or school leaving certificate)", isMandatory: true },
      { type: "document", description: "Non-ECR Proof (Matriculation/10th class passing certificate)", isMandatory: false },
    ],
    steps: [
      { number: 1, title: "Fill Online Form", instructions: "Register and complete the online application detailing personal, family, and address information." },
      { number: 2, title: "Pay Fee & Schedule Appointment", instructions: "Pay the passport fee online and book a physical slot at your nearest Passport Seva Kendra (PSK)." },
      { number: 3, title: "PSK Physical Verification", instructions: "Visit the PSK at the scheduled time with original documents for biometrics, photography, and document screening." },
      { number: 4, title: "Police Verification & Dispatch", instructions: "Local police officials will conduct address and background verification, after which the passport is dispatched via speed post." },
    ],
    hasMockForm: true,
    hasMockTracking: true,
    mockTrackingPrefix: "PPT",
  },
  {
    id: "digilocker-docs",
    categoryId: "identity",
    deptId: "meity-digilocker",
    title: "Retrieve Documents via DigiLocker",
    description: "Access and share authentic digital documents—such as Aadhaar, PAN card, driving licence, and academic marksheets—directly from original issuers.",
    averageProcessingTime: "Instant (Real-time issuance)",
    estimatedFees: "Free of cost",
    officialDeepLink: "https://www.digilocker.gov.in",
    isStateSpecific: false,
    tags: ["digilocker", "digital documents", "aadhaar pdf", "pan card download", "marksheets online", "verified docs", "meity"],
    requirements: [
      { type: "document", description: "Aadhaar Card Number linked to your active mobile phone", isMandatory: true },
      { type: "eligibility_rule", description: "Requires successful OTP authentication sent to the mobile number registered with UIDAI", isMandatory: true },
    ],
    steps: [
      { number: 1, title: "Authenticate with Aadhaar/Mobile", instructions: "Log in using your registered mobile number/Aadhaar and verify with OTP." },
      { number: 2, title: "Search Document Issuer", instructions: "Search for the document issuer (e.g., Central Board of Secondary Education, Income Tax Department, RTO)." },
      { number: 3, title: "Fetch and Download Doc", instructions: "Enter document details (such as roll number or registration ID) to fetch and pin the document in your Issued section." },
    ],
    hasMockForm: true,
  },
  {
    id: "pmay-housing",
    categoryId: "welfare",
    deptId: "mohua-pmay",
    title: "Pradhan Mantri Awas Yojana (PMAY) Eligibility",
    description: "Check eligibility and search schemes for affordable urban/rural housing assistance under the government's flagship welfare housing program.",
    averageProcessingTime: "30 to 60 Days (For verification & subsidy approval)",
    estimatedFees: "Free of cost",
    officialDeepLink: "https://pmaymis.gov.in",
    isStateSpecific: false,
    tags: ["housing scheme", "pmay", "awas yojana", "home loan subsidy", "affordable house", "poor housing", "mohua", "welfare house"],
    requirements: [
      { type: "document", description: "Aadhaar card details of all family members", isMandatory: true },
      { type: "document", description: "Income Certificate or self-declared affidavit of annual income", isMandatory: true },
      { type: "document", description: "Bank Account passbook / details", isMandatory: true },
      { type: "eligibility_rule", description: "The beneficiary family must not own a pucca (permanent) house in any part of India in their name", isMandatory: true },
      { type: "eligibility_rule", description: "Annual household income must be within specified bracket: EWS (up to ₹3 Lakh), LIG (₹3-6 Lakh), MIG-I (₹6-12 Lakh), or MIG-II (₹12-18 Lakh)", isMandatory: true },
    ],
    steps: [
      { number: 1, title: "Assess Eligibility Tier", instructions: "Submit household size and annual income to determine if you qualify under EWS, LIG, or MIG categories." },
      { number: 2, title: "Complete Application Form", instructions: "Provide detailed mapping of current accommodation, family Aadhaar numbers, and bank credentials." },
      { number: 3, title: "Local Verification Check", instructions: "Municipal officers or local authorities will conduct a survey to verify the residential and ownership status." },
    ],
    hasMockEligibility: true,
    hasMockForm: true,
    hasMockTracking: true,
    mockTrackingPrefix: "PMA",
  },
  {
    id: "cybercrime-report",
    categoryId: "security",
    deptId: "mha-cyber",
    title: "Report Cyber Crime (Phishing/Fraud)",
    description: "Lodge a complaint regarding cyber frauds, identity thefts, hacking, social media abuses, or online financial scams to law enforcement authorities.",
    averageProcessingTime: "48 to 72 Hours (For preliminary action/FIR initiation)",
    estimatedFees: "Free of cost",
    officialDeepLink: "https://cybercrime.gov.in",
    isStateSpecific: false,
    tags: ["cyber crime", "police complaint", "fir cyber", "stolen money", "phishing", "online scam", "fraud transaction", "hack account", "mha"],
    requirements: [
      { type: "document", description: "Bank statement, SMS alerts, or transaction slip showing the fraudulent transfer", isMandatory: true },
      { type: "document", description: "Screenshots of the fraudulent website, message, link, or email received", isMandatory: true },
      { type: "document", description: "Government-issued Identity Proof of the victim", isMandatory: true },
    ],
    steps: [
      { number: 1, title: "Report immediately (within 24 Hours)", instructions: "Initiate reporting to trigger standard bank transaction freezing. Call the national hotline 1930." },
      { number: 2, title: "Fill Details of Fraud", instructions: "Specify transaction IDs, dates, target accounts, and upload screenshot logs of the incident." },
      { number: 3, title: "Download Complaint Summary", instructions: "Review and submit. A PDF copy of the complaint is generated. Local cyber cell police will contact you for verification." },
    ],
    hasMockForm: true,
    hasMockTracking: true,
    mockTrackingPrefix: "CYB",
  },
  {
    id: "rti-submit",
    categoryId: "governance",
    deptId: "cic-rti",
    title: "File Right to Information (RTI) Request",
    description: "Submit an online request under the RTI Act, 2005 to seek official information, records, or answers from central or state public authorities.",
    averageProcessingTime: "Mandatory response within 30 Days",
    estimatedFees: "₹10 (Statutory filing fee) + nominal copying charges if requested",
    officialDeepLink: "https://rtionline.gov.in",
    isStateSpecific: false,
    tags: ["rti", "right to information", "gov info", "ask questions rti", "public record", "file rti", "cic", "bureaucracy check"],
    requirements: [
      { type: "document", description: "Details of the specific public authority (Ministry/Department) from which information is sought", isMandatory: true },
      { type: "document", description: "Precise description of the information requested (constrained to 3,000 characters)", isMandatory: true },
      { type: "eligibility_rule", description: "The applicant must be a citizen of India", isMandatory: true },
      { type: "eligibility_rule", description: "No fee is charged if the applicant belongs to Below Poverty Line (BPL) category (requires uploading a valid BPL card)", isMandatory: true },
    ],
    steps: [
      { number: 1, title: "Search Public Authority", instructions: "Select the appropriate Ministry and Public Authority (e.g., Department of Higher Education)." },
      { number: 2, title: "Draft RTI Query text", instructions: "Draft your queries clearly. Use simple language and list individual points. Do not upload lengthy PDFs unless necessary." },
      { number: 3, title: "Pay Statutory Fee", instructions: "Complete the statutory ₹10 fee payment. BPL applicants are exempt but must upload their card." },
      { number: 4, title: "Receive Registration Details", instructions: "Record your unique RTI registration number to track the Public Information Officer (PIO) response." },
    ],
    hasMockForm: true,
    hasMockPayment: true,
    hasMockTracking: true,
    mockTrackingPrefix: "RTI",
  },
  {
    id: "pan-correction",
    categoryId: "taxation",
    deptId: "mof-incometax",
    title: "Request PAN Card Details Correction",
    description: "Submit a request to correct or update your name, photo, date of birth, or signature in the Permanent Account Number (PAN) records.",
    averageProcessingTime: "7 to 15 Days",
    estimatedFees: "₹110 (For domestic physical delivery) | ₹72 (For paperless e-PAN only)",
    officialDeepLink: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html",
    isStateSpecific: false,
    tags: ["pan card", "correct pan", "pan update", "change name pan", "update birthdate pan", "incometax docs", "nsdl pan"],
    requirements: [
      { type: "document", description: "Existing PAN card number", isMandatory: true },
      { type: "document", description: "Proof of Identity showing the CORRECT details (Aadhaar Card, Passport)", isMandatory: true },
      { type: "document", description: "Proof of Date of Birth (Birth Certificate, Matriculation Certificate)", isMandatory: true },
      { type: "document", description: "Supporting marriage certificate or gazette notification if request is due to legal name change", isMandatory: false },
    ],
    steps: [
      { number: 1, title: "Submit Correction Form", instructions: "Specify your 10-digit PAN and check the specific box adjacent to fields requiring correction." },
      { number: 2, title: "Aadhaar e-KYC validation", instructions: "Authenticate details using Aadhaar e-KYC. This syncs your updated photo and address instantly." },
      { number: 3, title: "Complete Fee Payment", instructions: "Pay NSDL/UTIITSL processing fees online." },
    ],
    hasMockForm: true,
  },
  {
    id: "aadhaar-locator",
    categoryId: "identity",
    deptId: "uidai-portal",
    title: "Locate Aadhaar Enrolment / Update Center",
    description: "Find certified Aadhaar Seva Kendras, banks, and post offices nearby to enrol for Aadhaar or update biometric and demographic records in person.",
    averageProcessingTime: "Instant search (Centers updated weekly)",
    estimatedFees: "Free search (₹50/₹100 updates at physical centers)",
    officialDeepLink: "https://appointments.uidai.gov.in/easearch.aspx",
    isStateSpecific: false,
    tags: ["aadhaar center", "enrollment center", "update aadhaar biometric", "uidai office", "find aadhaar post office", "aadhaar near me"],
    requirements: [
      { type: "eligibility_rule", description: "Search can be executed by Pincode, State & District, or City name", isMandatory: true },
    ],
    steps: [
      { number: 1, title: "Enter Pincode or Location", instructions: "Input your 6-digit postal code to see centers in your immediate locality." },
      { number: 2, title: "Filter Active Centers", instructions: "Filter results to only display centers that have completed enrolments/updates in the last 30 days." },
      { number: 3, title: "Book Appointment (Optional)", instructions: "Select a center and click to book a time slot to avoid queues." },
    ],
    hasMockForm: true,
  },
];
