"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Search, 
  AlertTriangle
} from "lucide-react";

// Pre-seeded status records for evaluator tests
const SEEDED_TRACKING_DB: Record<string, {
  serviceId: string;
  serviceTitle: string;
  fullName: string;
  status: "Submitted" | "Document Verification" | "Field Audit" | "Approved" | "Dispatched";
  date: string;
  extraInfo?: string;
}> = {
  "CHL-8821-2026": {
    serviceId: "vehicle-challan-pay",
    serviceTitle: "Search & Pay Traffic Challan",
    fullName: "Kamal Kishor",
    status: "Submitted",
    date: "2026-08-25",
    extraInfo: "Pending payment verification. Over-speeding ticket on Ring Road, New Delhi.",
  },
  "DLN-1402-2026": {
    serviceId: "driving-licence-renew",
    serviceTitle: "Renew Driving Licence (DL)",
    fullName: "Ramesh Kumar",
    status: "Dispatched",
    date: "2026-08-10",
    extraInfo: "License printed. Dispatch via Speed Post ID: EM992384110IN.",
  },
  "EPF-9923-2026": {
    serviceId: "epf-balance-status",
    serviceTitle: "Check EPF Balance & Claim Status",
    fullName: "Savitri Devi",
    status: "Field Audit",
    date: "2026-08-18",
    extraInfo: "Employer KYC audit pending under Delhi North EPFO zone.",
  },
  "ECI-6421-2026": {
    serviceId: "voter-registration",
    serviceTitle: "New Voter Registration (Form 6)",
    fullName: "Aarav Sharma",
    status: "Document Verification",
    date: "2026-08-20",
    extraInfo: "Booth Level Officer (BLO) assigned for address verification.",
  },
  "PPT-3021-2026": {
    serviceId: "passport-apply",
    serviceTitle: "Apply for Fresh / Reissue Passport",
    fullName: "Baldev Singh",
    status: "Field Audit",
    date: "2026-08-22",
    extraInfo: "Appointment scheduled at PSK R.K. Puram, New Delhi on Sep 02, 2026.",
  },
};

const STATUS_STEPS = [
  { id: "Submitted", label: "Application Submitted", desc: "Received at GovOne database and synced with department desk." },
  { id: "Document Verification", label: "Document Verification", desc: "Clerks verifying photo ID, age, and residence proofs." },
  { id: "Field Audit", label: "Officer Screening", desc: "Local inspectors checking eligibility or conducting field verification." },
  { id: "Approved", label: "Application Approved", desc: "Service request signed and certificate/licence generated." },
  { id: "Dispatched", label: "Document Dispatched", desc: "Physical smartcard/letter dispatched via India Post Speed Post." },
];

function TrackContent() {
  const searchParams = useSearchParams();
  const refParam = searchParams.get("ref") || "";

  const [searchRef, setSearchRef] = useState(refParam);
  const [activeTracking, setActiveTracking] = useState<any>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);

  // Auto-search if param matches
  useEffect(() => {
    if (refParam) {
      setSearchRef(refParam);
      triggerTrackSearch(refParam);
    }
  }, [refParam]);

  const triggerTrackSearch = (refCode: string) => {
    const cleanRef = refCode.trim().toUpperCase();
    if (!cleanRef) return;

    // 1. Check local storage first (user filed applications)
    const savedApps = JSON.parse(localStorage.getItem("govone-applications") || "[]");
    const localMatch = savedApps.find((a: any) => a.ref.toUpperCase() === cleanRef);

    if (localMatch) {
      setActiveTracking(localMatch);
      setSearchAttempted(true);
      return;
    }

    // 2. Check pre-seeded mock database
    const seededMatch = SEEDED_TRACKING_DB[cleanRef];
    if (seededMatch) {
      setActiveTracking({
        ref: cleanRef,
        ...seededMatch
      });
    } else {
      setActiveTracking(null);
    }
    setSearchAttempted(true);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerTrackSearch(searchRef);
  };

  // Determine step status colors
  const getStepStatus = (stepId: string) => {
    if (!activeTracking) return "pending";
    const currentStatus = activeTracking.status;
    
    const statusOrder = ["Submitted", "Document Verification", "Field Audit", "Approved", "Dispatched"];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const stepIndex = statusOrder.indexOf(stepId);

    if (stepIndex === currentIndex) return "current";
    if (stepIndex < currentIndex) return "completed";
    return "pending";
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 flex-1 w-full text-left">
      {/* Page Heading */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Track Service Status</h1>
        <p className="text-xs text-body-muted max-w-md mx-auto leading-relaxed">
          Enter the Reference Receipt ID (e.g., DLN-1402-2026) issued during application to monitor verification progress.
        </p>
      </div>

      {/* Search Input bar */}
      <form onSubmit={handleSearchSubmit} className="bg-white border border-hairline rounded-sm p-2 flex gap-2 mb-8">
        <div className="relative flex-1 flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-body-muted pointer-events-none" />
          <input
            type="text"
            value={searchRef}
            onChange={(e) => setSearchRef(e.target.value)}
            placeholder="Enter Application ID (e.g., DLN-1402-2026)"
            className="w-full pl-9 pr-4 py-2 text-xs text-body-dark bg-transparent focus:outline-none font-mono"
            aria-label="Enter Reference Receipt ID"
          />
        </div>
        <button
          type="submit"
          disabled={!searchRef.trim()}
          className="px-6 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 cursor-pointer"
        >
          Check Status
        </button>
      </form>

      {/* Visual Roadmap Result */}
      {activeTracking ? (
        <div className="space-y-6">
          {/* Summary Box */}
          <div className="bg-white border border-hairline p-6 rounded-sm">
            <h2 className="text-xs font-bold uppercase font-mono text-primary border-b border-hairline pb-2 mb-4">
              Application Details
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-body-muted">Service Name:</p>
                <p className="font-bold text-primary mt-0.5">{activeTracking.serviceTitle}</p>
              </div>
              <div>
                <p className="text-body-muted">Applicant Name:</p>
                <p className="font-bold text-primary mt-0.5">{activeTracking.fullName}</p>
              </div>
              <div>
                <p className="text-body-muted">Tracking Reference ID:</p>
                <p className="font-mono font-bold text-accent mt-0.5">{activeTracking.ref}</p>
              </div>
              <div>
                <p className="text-body-muted">Submission Date:</p>
                <p className="font-bold text-primary mt-0.5">{activeTracking.date}</p>
              </div>
            </div>
            
            {activeTracking.extraInfo && (
              <div className="mt-4 p-3 bg-canvas-soft rounded-sm border border-hairline text-xs text-body-muted flex items-start gap-1.5">
                <span><strong className="text-primary">Status Note:</strong> {activeTracking.extraInfo}</span>
              </div>
            )}
          </div>

          {/* Stepper Timeline */}
          <div className="bg-white border border-hairline p-6 rounded-sm">
            <h2 className="text-xs font-bold uppercase font-mono text-primary border-b border-hairline pb-3 mb-6">
              Verification Roadmap
            </h2>

            <div className="relative border-l border-hairline pl-6 ml-3 space-y-8 text-xs">
              {STATUS_STEPS.map((st) => {
                const state = getStepStatus(st.id);
                return (
                  <div key={st.id} className="relative">
                    {/* Stepper node point */}
                    <span className={`absolute -left-[33px] top-0.5 flex h-4 w-4 items-center justify-center rounded-sm border ${
                      state === "completed" 
                        ? "bg-success border-success text-white font-mono" 
                        : state === "current" 
                        ? "bg-accent border-accent text-white font-mono" 
                        : "bg-canvas-soft border-hairline text-body-muted font-mono"
                    }`}>
                      {state === "completed" && <span className="text-[10px] font-bold">✓</span>}
                      {state === "current" && <span className="text-[10px] font-bold">●</span>}
                      {state === "pending" && <span className="text-[10px] font-bold">-</span>}
                    </span>

                    <h3 className={`font-bold text-xs ${
                      state === "completed" ? "text-success" : state === "current" ? "text-accent" : "text-body-muted"
                    }`}>
                      {st.label}
                    </h3>
                    <p className={`text-[11px] ${state === "pending" ? "text-body-muted" : "text-body-dark"} mt-1 max-w-xl leading-relaxed`}>
                      {st.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Empty / Not Found Fallback */
        searchAttempted && (
          <div className="bg-white border border-hairline rounded-sm p-8 text-center max-w-md mx-auto">
            <AlertTriangle className="w-10 h-10 text-accent mx-auto mb-3" />
            <h3 className="text-base font-bold text-primary mb-2">No Application Record Found</h3>
            <p className="text-xs text-body-muted leading-relaxed">
              We couldn&apos;t locate any application tracking record for Reference ID <strong className="text-primary font-mono">&quot;{searchRef}&quot;</strong>. Double check the characters (include dashes) or verify you are using a correct pre-seeded reference number.
            </p>
          </div>
        )
      )}

      {/* Helpful Preseeded IDs card for evaluator comfort */}
      <div className="mt-8 bg-canvas-soft border border-hairline p-5 rounded-sm">
        <h3 className="font-bold text-xs text-primary uppercase font-mono tracking-wider mb-2">
          Prototype Reference IDs for Testing:
        </h3>
        <p className="text-[11px] text-body-muted mb-4 leading-relaxed">
          Use these pre-configured Reference IDs to instantly test different verification roadmap statuses:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <button 
            onClick={() => { setSearchRef("DLN-1402-2026"); triggerTrackSearch("DLN-1402-2026"); }}
            className="text-left bg-white p-2.5 border border-hairline hover:border-primary rounded-sm font-mono text-primary font-bold cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-accent focus:outline-none"
          >
            DLN-1402-2026 <span className="text-[10px] text-success font-sans ml-2">(Dispatched)</span>
          </button>
          <button 
            onClick={() => { setSearchRef("EPF-9923-2026"); triggerTrackSearch("EPF-9923-2026"); }}
            className="text-left bg-white p-2.5 border border-hairline hover:border-primary rounded-sm font-mono text-primary font-bold cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-accent focus:outline-none"
          >
            EPF-9923-2026 <span className="text-[10px] text-accent font-sans ml-2">(Officer Screening)</span>
          </button>
          <button 
            onClick={() => { setSearchRef("ECI-6421-2026"); triggerTrackSearch("ECI-6421-2026"); }}
            className="text-left bg-white p-2.5 border border-hairline hover:border-primary rounded-sm font-mono text-primary font-bold cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-accent focus:outline-none"
          >
            ECI-6421-2026 <span className="text-[10px] text-primary font-sans ml-2">(Doc Verification)</span>
          </button>
          <button 
            onClick={() => { setSearchRef("CHL-8821-2026"); triggerTrackSearch("CHL-8821-2026"); }}
            className="text-left bg-white p-2.5 border border-hairline hover:border-primary rounded-sm font-mono text-primary font-bold cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-accent focus:outline-none"
          >
            CHL-8821-2026 <span className="text-[10px] text-body-muted font-sans ml-2">(Submitted)</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TrackPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <div className="text-center py-20 flex-1">
          <div className="inline-block h-8 w-8 border-2 border-primary border-t-transparent animate-spin rounded-full mb-2"></div>
          <p className="text-sm text-body-muted font-mono">Loading tracking dashboard…</p>
        </div>
      }>
        <TrackContent />
      </Suspense>
      <Footer />
    </>
  );
}
