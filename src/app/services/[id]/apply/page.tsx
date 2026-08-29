"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { services, departments } from "@/data/servicesRegistry";
import { 
  ArrowLeft, 
  ArrowRight,
  UserCheck, 
  CheckCircle,
  Upload,
  QrCode,
  ShieldCheck,
  Check,
  RefreshCw,
  Search,
  X,
  Info
} from "lucide-react";

export default function ApplyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const service = services.find((s) => s.id === id);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    aadhaarNo: "",
    panNo: "",
    phoneNo: "",
    email: "",
    state: "Delhi",
    address: "",
    extraInfo: "",
    vehicleNo: "",
    challanNo: "",
    uanNo: "",
    uanPassword: "",
    complaintText: "",
    anonymous: false,
  });

  // Mocks states
  const [showDigiLocker, setShowDigiLocker] = useState(false);
  const [isPrefilled, setIsPrefilled] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [receiptNo, setReceiptNo] = useState("");
  
  // Custom mock variables for specific flows
  const [challanList, setChallanList] = useState<{ id: string; amount: number; reason: string; date: string }[]>([]);
  const [challanSearchDone, setChallanSearchDone] = useState(false);
  const [selectedChallan, setSelectedChallan] = useState<string | null>(null);
  const [pfBalance, setPfBalance] = useState<number | null>(null);

  if (!service) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center flex-1">
          <h1 className="text-2xl font-bold text-primary mb-2">Service Not Found</h1>
          <Link href="/" className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-sm">
            Go Back Home
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  // Pre-fill profile using DigiLocker Mock
  const prefillWithDigiLocker = () => {
    setShowDigiLocker(true);
  };

  const selectMockProfile = () => {
    setFormData((prev) => ({
      ...prev,
      fullName: "Ramesh Kumar",
      aadhaarNo: "4421-5582-9931",
      panNo: "BRVPK8826H",
      phoneNo: "9876543210",
      email: "ramesh.kumar@example.com",
      address: "H.No. 402, Sector 12, Dwarka, New Delhi - 110075",
    }));
    setIsPrefilled(true);
    setShowDigiLocker(false);
  };

  // Search challans mock
  const searchMockChallans = () => {
    if (!formData.vehicleNo.trim()) return;
    setChallanList([
      { id: "CHL-992-012", amount: 1000, reason: "Red light violation", date: "2026-08-15" },
      { id: "CHL-883-911", amount: 2000, reason: "Over-speeding violation", date: "2026-08-22" },
    ]);
    setChallanSearchDone(true);
  };

  // Login PF member mock
  const loginPfMember = () => {
    if (!formData.uanNo || !formData.uanPassword) return;
    setPfBalance(42890.50);
    setStep(2);
  };

  // Generate Reference Receipt number
  const generateReceipt = () => {
    const prefix = service.mockTrackingPrefix || "SEV";
    const random = Math.floor(1000 + Math.random() * 9000);
    const year = new Date().getFullYear();
    const ref = `${prefix}-${random}-${year}`;
    setReceiptNo(ref);

    // Save mock application state in localStorage so the track page can read it!
    const savedApps = JSON.parse(localStorage.getItem("govone-applications") || "[]");
    savedApps.push({
      ref,
      serviceId: service.id,
      serviceTitle: service.title,
      status: "Submitted",
      date: new Date().toLocaleDateString(),
      fullName: formData.fullName || "Citizen Anonymous",
      vehicleNo: formData.vehicleNo || undefined,
    });
    localStorage.setItem("govone-applications", JSON.stringify(savedApps));
  };

  // Process Mock Payment
  const processMockPayment = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setShowPayment(false);
      generateReceipt();
      setStep(4); // Success step
    }, 1500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (service.hasMockPayment) {
      setShowPayment(true);
    } else {
      generateReceipt();
      setStep(3); // Success step for non-payment items
    }
  };

  return (
    <>
      <Navbar />
      
      <main id="main-content" className="max-w-3xl mx-auto px-4 py-8 flex-1 w-full text-left">
        {/* Back navigation */}
        <div className="mb-6">
          <Link
            href={`/services/${service.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-body-muted hover:text-primary focus-visible:ring-2 focus-visible:ring-accent focus:outline-none p-1 rounded-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Service Details</span>
          </Link>
        </div>

        {/* Persistent Fictional Identity Notice (DESIGN.md Section 6) */}
        <div className="mb-6 bg-canvas-soft border border-hairline p-3.5 rounded-sm flex items-start gap-2.5 text-xs text-body-muted">
          <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-primary">Prototype Notice:</strong> This application wizard is a simulation. It uses fictional test data (such as Ramesh Kumar&apos;s demo profile) and does not submit data to live government databases or collect real personal records.
          </p>
        </div>

        {/* Dynamic Forms Container */}
        <div className="bg-white border border-hairline rounded-sm overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-white p-6 border-b border-primary-light">
            <h1 className="text-xl font-bold text-white mb-1">{service.title}</h1>
            <p className="text-xs text-canvas-soft/80">Simulated Application Gateway</p>
          </div>

          <div className="p-6 md:p-8">
            
            {/* FLOW 1: VEHICLE CHALLAN PAYMENT FLOW */}
            {service.id === "vehicle-challan-pay" && (
              <div className="space-y-6">
                {step === 1 && (
                  <div className="space-y-4">
                    <h2 className="text-xs font-bold uppercase font-mono text-primary border-b border-hairline pb-2">
                      Search Vehicle Challans
                    </h2>
                    <div className="space-y-2">
                      <label htmlFor="vehicle-no" className="block text-xs font-bold text-body-dark">
                        Vehicle Registration Number
                      </label>
                      <div className="flex gap-2">
                        <input
                          id="vehicle-no"
                          type="text"
                          value={formData.vehicleNo}
                          onChange={(e) => setFormData({ ...formData, vehicleNo: e.target.value.toUpperCase() })}
                          placeholder="e.g., DL3CAN5524"
                          className="flex-1 bg-white border border-hairline rounded-sm px-3 py-2 text-xs text-body-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-accent font-mono"
                          autoComplete="off"
                        />
                        <button
                          onClick={searchMockChallans}
                          disabled={!formData.vehicleNo}
                          className="px-4 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                        >
                          <Search className="w-3.5 h-3.5" />
                          <span>Search Fines</span>
                        </button>
                      </div>
                    </div>

                    {challanSearchDone && (
                      <div className="mt-6 space-y-4">
                        <h3 className="text-xs font-bold text-primary font-mono uppercase">
                          Pending Challans Found ({challanList.length})
                        </h3>
                        
                        <div className="divide-y divide-hairline border border-hairline rounded-sm">
                          {challanList.map((ch) => (
                            <div key={ch.id} className="p-4 flex items-center justify-between gap-4 bg-canvas-soft">
                              <div>
                                <p className="text-xs font-bold text-primary font-mono">{ch.id}</p>
                                <p className="text-[11px] text-body-muted mt-0.5">{ch.reason} | {ch.date}</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-xs font-mono font-bold text-error">₹{ch.amount}</span>
                                <button
                                  onClick={() => {
                                    setSelectedChallan(ch.id);
                                    setShowPayment(true);
                                  }}
                                  className="px-3.5 py-1.5 bg-primary text-white text-xs font-bold rounded-sm hover:bg-primary-light transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
                                >
                                  Pay Fine
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* FLOW 2: EPFO PF MEMBER LOGIN & WITHDRAW FLOW */}
            {service.id === "epf-balance-status" && (
              <div className="space-y-6">
                {step === 1 && (
                  <div className="space-y-4 max-w-sm mx-auto">
                    <h2 className="text-xs font-bold uppercase font-mono text-primary text-center">
                      PF Member Unified Login
                    </h2>
                    
                    <div className="space-y-3">
                      <div>
                        <label htmlFor="uan-no" className="block text-xs font-bold text-body-dark mb-1">
                          Universal Account Number (UAN)
                        </label>
                        <input
                          id="uan-no"
                          type="text"
                          value={formData.uanNo}
                          onChange={(e) => setFormData({ ...formData, uanNo: e.target.value })}
                          placeholder="Enter 12-digit UAN"
                          className="w-full bg-white border border-hairline rounded-sm px-3 py-2 text-xs text-body-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-accent font-mono"
                          autoComplete="off"
                        />
                      </div>
                      <div>
                        <label htmlFor="uan-pass" className="block text-xs font-bold text-body-dark mb-1">
                          Member Password
                        </label>
                        <input
                          id="uan-pass"
                          type="password"
                          value={formData.uanPassword}
                          onChange={(e) => setFormData({ ...formData, uanPassword: e.target.value })}
                          placeholder="Password"
                          className="w-full bg-white border border-hairline rounded-sm px-3 py-2 text-xs text-body-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        />
                      </div>
                      <button
                        onClick={loginPfMember}
                        disabled={!formData.uanNo || !formData.uanPassword}
                        className="w-full py-2.5 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 cursor-pointer"
                      >
                        Authenticate Member Portal
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="bg-success-soft border border-success/30 p-4 rounded-sm flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-body-muted uppercase font-bold tracking-wider font-mono">UAN Authenticated</p>
                        <p className="text-xs font-bold text-primary mt-0.5">Welcome, Member ({formData.uanNo})</p>
                      </div>
                      <span className="h-2.5 w-2.5 rounded-sm bg-success"></span>
                    </div>

                    <div className="bg-white border border-hairline p-6 rounded-sm text-center">
                      <p className="text-xs text-body-muted">Active Member Passbook Balance</p>
                      <h3 className="text-3xl font-bold text-primary font-mono mt-1">₹{pfBalance?.toLocaleString()}</h3>
                      <p className="text-[11px] text-success font-semibold mt-1">✓ Verified record</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => {
                          generateReceipt();
                          setStep(3);
                        }}
                        className="flex-1 text-center py-2.5 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors cursor-pointer"
                      >
                        File Withdrawal Claim
                      </button>
                      <button
                        onClick={() => setStep(1)}
                        className="px-4 py-2.5 border border-hairline hover:bg-canvas-soft text-xs font-semibold rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* FLOW 3: GENERIC FORM WIZARD (Voter, ITR, Passport, Cybercrime, etc) */}
            {service.id !== "vehicle-challan-pay" && service.id !== "epf-balance-status" && (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-6">
                    {/* DigiLocker Prefill Callout */}
                    <div className="bg-canvas-soft border border-hairline p-4 rounded-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h2 className="text-xs font-bold text-primary flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-success" />
                          <span>Prefill using DigiLocker</span>
                        </h2>
                        <p className="text-[11px] text-body-muted mt-1 leading-relaxed">
                          Link demo profile to fetch simulated Aadhaar, name, and address data instantly.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={prefillWithDigiLocker}
                        className="px-3.5 py-2 bg-primary text-white text-xs font-bold rounded-sm hover:bg-primary-light flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors shrink-0 cursor-pointer"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Link DigiLocker</span>
                      </button>
                    </div>

                    {isPrefilled && (
                      <div className="bg-success-soft border border-success/30 px-3.5 py-2 rounded-sm text-xs text-success font-semibold flex items-center gap-1.5">
                        <Check className="w-4 h-4" />
                        <span>Profile details loaded from DigiLocker (Simulated UIDAI record)</span>
                      </div>
                    )}

                    <div className="space-y-4">
                      <h3 className="text-xs font-bold uppercase font-mono text-primary border-b border-hairline pb-2">
                        Personal & Identity Details
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="full-name" className="block text-xs font-bold text-body-dark mb-1">
                            Full Name (as in Aadhaar)
                          </label>
                          <input
                            id="full-name"
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full bg-white border border-hairline rounded-sm px-3 py-2 text-xs text-body-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="phone-no" className="block text-xs font-bold text-body-dark mb-1">
                            Aadhaar Linked Mobile Number
                          </label>
                          <input
                            id="phone-no"
                            type="text"
                            value={formData.phoneNo}
                            onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
                            className="w-full bg-white border border-hairline rounded-sm px-3 py-2 text-xs text-body-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-accent font-mono"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="aadhaar-no" className="block text-xs font-bold text-body-dark mb-1">
                            Aadhaar Card Number
                          </label>
                          <input
                            id="aadhaar-no"
                            type="text"
                            value={formData.aadhaarNo}
                            onChange={(e) => setFormData({ ...formData, aadhaarNo: e.target.value })}
                            placeholder="e.g., 4421-5582-9931"
                            className="w-full bg-white border border-hairline rounded-sm px-3 py-2 text-xs text-body-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-accent font-mono"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="pan-no" className="block text-xs font-bold text-body-dark mb-1">
                            PAN Card Number
                          </label>
                          <input
                            id="pan-no"
                            type="text"
                            value={formData.panNo}
                            onChange={(e) => setFormData({ ...formData, panNo: e.target.value })}
                            placeholder="e.g., BRVPK8826H"
                            className="w-full bg-white border border-hairline rounded-sm px-3 py-2 text-xs text-body-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-accent font-mono"
                          />
                        </div>
                      </div>

                      {/* Custom flows details */}
                      {service.id === "cybercrime-report" && (
                        <div className="space-y-4 pt-2">
                          <h3 className="text-xs font-bold uppercase font-mono text-primary border-b border-hairline pb-2">
                            Complaint Information
                          </h3>
                          <div>
                            <label className="flex items-center gap-1.5 text-xs text-body-dark font-bold cursor-pointer mb-2">
                              <input
                                type="checkbox"
                                checked={formData.anonymous}
                                onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                                className="rounded-sm border-hairline text-primary focus:ring-accent accent-primary"
                              />
                              <span>File Complaint Anonymously</span>
                            </label>
                          </div>
                          <div>
                            <label htmlFor="complaint-desc" className="block text-xs font-bold text-body-dark mb-1">
                              Brief description of Incident
                            </label>
                            <textarea
                              id="complaint-desc"
                              value={formData.complaintText}
                              onChange={(e) => setFormData({ ...formData, complaintText: e.target.value })}
                              placeholder="Include transaction references, date/time, message content or fraud links..."
                              rows={4}
                              className="w-full bg-white border border-hairline rounded-sm px-3 py-2 text-xs text-body-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-body-dark mb-1">
                              Upload Proof Documents (Receipts, Screenshots)
                            </label>
                            <div className="border border-dashed border-hairline rounded-sm p-4 text-center bg-canvas-soft hover:bg-canvas transition-colors cursor-pointer">
                              <Upload className="w-5 h-5 text-body-muted mx-auto mb-2" />
                              <span className="text-xs text-body-muted">Click to select files or drag screenshots here.</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Ordinary residential address details */}
                      {service.id !== "cybercrime-report" && (
                        <div className="space-y-3 pt-2">
                          <h3 className="text-xs font-bold uppercase font-mono text-primary border-b border-hairline pb-2">
                            Residential Address
                          </h3>
                          <div>
                            <label htmlFor="address-text" className="block text-xs font-bold text-body-dark mb-1">
                              Full Address
                            </label>
                            <textarea
                              id="address-text"
                              value={formData.address}
                              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                              rows={3}
                              className="w-full bg-white border border-hairline rounded-sm px-3 py-2 text-xs text-body-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                              required
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-primary hover:bg-primary-light text-white font-bold text-xs rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Proceed to Submit</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </form>
            )}

            {/* SUCCESS STEPS */}
            {(step === 3 || step === 4) && (
              <div className="space-y-6 text-center max-w-xl mx-auto py-4">
                <div className="p-3 bg-success-soft text-success rounded-sm w-fit mx-auto border border-success/30">
                  <CheckCircle className="w-10 h-10" />
                </div>
                
                <div>
                  <h2 className="text-xl font-bold text-primary">
                    Application Submitted Successfully
                  </h2>
                  <p className="text-xs text-body-muted mt-1.5 leading-relaxed">
                    Your application for <strong>{service.title}</strong> has been registered on the GovOne simulation gateway.
                  </p>
                </div>

                {/* Receipt Details Box */}
                <div className="bg-canvas-soft border border-hairline rounded-sm p-6 text-left space-y-3">
                  <div className="flex justify-between items-center border-b border-hairline pb-2.5">
                    <span className="text-[10px] text-body-muted font-bold tracking-wider uppercase font-mono">Reference ID</span>
                    <strong className="text-xs text-primary font-mono select-all bg-white px-2 py-0.5 border border-hairline rounded-sm">
                      {receiptNo}
                    </strong>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 text-xs">
                    <span className="text-body-muted">Applicant:</span>
                    <span className="font-semibold text-primary text-right">{formData.fullName || "Citizen Anonymous"}</span>

                    <span className="text-body-muted">Authority:</span>
                    <span className="font-semibold text-primary text-right">{departments.find(d => d.id === service.deptId)?.name}</span>

                    <span className="text-body-muted">Submission Date:</span>
                    <span className="font-semibold text-primary text-right">{new Date().toLocaleDateString()}</span>
                    
                    {service.hasMockPayment && (
                      <>
                        <span className="text-body-muted">Payment Status:</span>
                        <span className="font-semibold text-success text-right flex items-center justify-end gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>Paid</span>
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="p-3.5 bg-success-soft border border-success/30 rounded-sm text-xs text-success leading-relaxed flex items-start gap-2 text-left">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-success mt-0.5" />
                  <p>
                    <strong>Keep your Reference ID handy.</strong> You can track this application in the <strong>Track Status</strong> section using the code <span className="font-mono font-bold">{receiptNo}</span>.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href={`/track?ref=${receiptNo}`}
                    className="flex-1 text-center py-2.5 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-sm transition-colors focus-visible:ring-2 focus-visible:ring-accent focus:outline-none"
                  >
                    Track Status Roadmap
                  </Link>
                  <Link
                    href="/"
                    className="px-6 py-2.5 border border-hairline hover:bg-canvas-soft text-xs font-semibold rounded-sm transition-colors focus-visible:ring-2 focus-visible:ring-accent focus:outline-none"
                  >
                    Go Back to Home
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      {/* DigiLocker Profile Selector Modal */}
      {showDigiLocker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/70">
          <div className="bg-white max-w-sm w-full border border-hairline rounded-sm overflow-hidden text-left">
            <div className="bg-primary text-white p-4 flex items-center justify-between border-b border-primary-light">
              <span className="font-bold text-xs tracking-wider uppercase font-mono">DigiLocker Identity Gateway</span>
              <button 
                onClick={() => setShowDigiLocker(false)}
                className="text-white/80 hover:text-white p-1 rounded-sm focus-visible:ring-2 focus-visible:ring-accent focus:outline-none cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <p className="text-xs text-body-muted leading-relaxed">
                Choose a verified digital profile to link to the application form.
              </p>

              <div 
                className="border border-hairline rounded-sm p-4 bg-canvas-soft hover:border-primary cursor-pointer transition-colors" 
                onClick={selectMockProfile}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-xs text-primary">Ramesh Kumar</h4>
                  <span className="text-[9px] bg-success-soft text-success border border-success/30 px-1.5 py-0.5 rounded-sm font-bold uppercase">UIDAI Verified</span>
                </div>
                <div className="space-y-1 text-xs text-body-muted font-mono">
                  <p>Aadhaar: <span className="font-semibold text-body-dark">XXXX-XXXX-9931</span></p>
                  <p>PAN Card: <span className="font-semibold text-body-dark">BRVPK8826H</span></p>
                  <p>Mobile: <span className="text-body-dark">9876543210</span></p>
                </div>
                <button className="mt-3 w-full text-center py-2 bg-primary text-white font-bold text-xs rounded-sm hover:bg-primary-light transition-colors">
                  Select & Pre-fill Form
                </button>
              </div>

              <div className="p-3 bg-canvas-soft rounded-sm text-[11px] text-body-muted leading-relaxed border border-hairline flex items-start gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-success mt-0.5" />
                <p>Digital profiles are securely encrypted for this simulation session.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Gateway Modal */}
      {showPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/70">
          <div className="bg-white max-w-sm w-full border border-hairline rounded-sm p-6 text-center space-y-6 text-left">
            <div className="text-center">
              <h3 className="text-base font-bold text-primary mb-1">
                Bharat Payment Gateway
              </h3>
              <p className="text-xs text-body-muted">
                Transaction Amount: <span className="font-bold text-primary font-mono">₹{selectedChallan ? "1000.00" : "10.00"}</span>
              </p>
            </div>

            {/* UPI QR Code box */}
            <div className="bg-canvas-soft border border-hairline p-4 rounded-sm w-fit mx-auto">
              <QrCode className="w-32 h-32 text-primary mx-auto" />
              <p className="text-[10px] text-body-muted font-mono font-semibold mt-2 text-center uppercase tracking-wider">Bharat UPI QR</p>
            </div>

            <p className="text-xs text-body-muted leading-relaxed text-center">
              Scan this QR code with any UPI app or click &quot;Mock Pay Success&quot; below to simulate completed transaction.
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowPayment(false)}
                className="px-4 py-2 border border-hairline hover:bg-canvas-soft rounded-sm text-xs font-semibold focus-visible:ring-2 focus-visible:ring-accent focus:outline-none cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={processMockPayment}
                disabled={isPaying}
                className="px-5 py-2 bg-primary text-white hover:bg-primary-light rounded-sm text-xs font-bold flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-accent focus:outline-none cursor-pointer transition-colors"
              >
                {isPaying ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Mock Pay Success</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
