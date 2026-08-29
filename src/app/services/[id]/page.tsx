"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { services, categories, departments } from "@/data/servicesRegistry";
import { 
  MapPin, 
  Clock, 
  CreditCard, 
  FileText, 
  CheckSquare, 
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  BadgeCheck,
  CheckCircle,
  HelpCircle,
  ChevronRight
} from "lucide-react";

export default function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const service = services.find((s) => s.id === id);
  
  // State for document check-offs
  const [checkedDocs, setCheckedDocs] = useState<Record<number, boolean>>({});
  
  // State for eligibility questionnaire
  const [eligibilityAnswers, setEligibilityAnswers] = useState<Record<number, boolean>>({});
  const [showEligibilityResult, setShowEligibilityResult] = useState(false);
  const [isEligible, setIsEligible] = useState(true);

  // State for interstitial redirect warning
  const [showRedirectWarning, setShowRedirectWarning] = useState(false);

  if (!service) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center flex-1">
          <h1 className="text-2xl font-bold text-primary mb-2">Service Not Found</h1>
          <p className="text-sm text-body-muted mb-6">The requested government service could not be located in our registry.</p>
          <Link href="/" className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-sm">
            Go Back Home
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const category = categories.find((c) => c.id === service.categoryId);
  const department = departments.find((d) => d.id === service.deptId);

  // Toggle document checklist
  const toggleDoc = (index: number) => {
    setCheckedDocs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // Eligibility questionnaire check
  const handleEligibilityChange = (index: number, answer: boolean) => {
    setEligibilityAnswers((prev) => ({ ...prev, [index]: answer }));
    setShowEligibilityResult(false);
  };

  const verifyEligibility = () => {
    const rules = service.requirements.filter(r => r.type === "eligibility_rule");
    let eligible = true;
    for (let i = 0; i < rules.length; i++) {
      if (eligibilityAnswers[i] !== true) {
        eligible = false;
        break;
      }
    }
    setIsEligible(eligible);
    setShowEligibilityResult(true);
  };

  // Interstitial redirect warning trigger
  const triggerRedirect = () => {
    setShowRedirectWarning(true);
  };

  const cancelRedirect = () => {
    setShowRedirectWarning(false);
  };

  const eligibilityRules = service.requirements.filter((r) => r.type === "eligibility_rule");
  const documentsList = service.requirements.filter((r) => r.type === "document");

  return (
    <>
      <Navbar />
      
      <main id="main-content" className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full text-left">
        {/* Standardized Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-body-muted">
          <Link href="/" className="hover:text-primary focus-visible:ring-2 focus-visible:ring-accent focus:outline-none p-0.5 rounded-sm">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-body-muted" />
          <Link href="/services" className="hover:text-primary focus-visible:ring-2 focus-visible:ring-accent focus:outline-none p-0.5 rounded-sm">
            Services
          </Link>
          <ChevronRight className="w-3 h-3 text-body-muted" />
          <span className="font-semibold text-primary truncate max-w-xs sm:max-w-md">
            {service.title}
          </span>
        </nav>

        {/* Hero Service Header Panel */}
        <section className="bg-white border border-hairline p-6 md:p-8 rounded-sm mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[10px] bg-canvas-soft border border-hairline px-2.5 py-0.5 rounded-sm font-bold uppercase text-body-muted font-mono">
              {category?.title}
            </span>
            {service.isStateSpecific && (
              <span className="text-[10px] bg-accent-soft text-accent border border-accent/30 px-2.5 py-0.5 rounded-sm font-semibold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-accent" />
                <span>State specific service</span>
              </span>
            )}
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-3 tracking-tight">
            {service.title}
          </h1>
          
          <p className="text-sm md:text-base text-body-muted leading-relaxed max-w-4xl mb-6">
            {service.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-hairline pt-6 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-canvas-soft border border-hairline rounded-sm shrink-0">
                <Clock className="w-4 h-4 text-accent" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-body-muted font-bold tracking-wider uppercase font-mono">Processing Time</span>
                <span className="text-xs font-bold text-primary font-mono">{service.averageProcessingTime}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-canvas-soft border border-hairline rounded-sm shrink-0">
                <CreditCard className="w-4 h-4 text-accent" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-body-muted font-bold tracking-wider uppercase font-mono">Statutory Fees</span>
                <span className="text-xs font-bold text-primary font-mono">{service.estimatedFees}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-canvas-soft border border-hairline rounded-sm shrink-0">
                <BadgeCheck className="w-4 h-4 text-success" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-body-muted font-bold tracking-wider uppercase font-mono">Official Authority</span>
                <span className="text-xs font-bold text-primary">{department?.name}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Split Columns: Requirements vs. Process Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Requirements & Eligibility */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Prerequisite Document Checklist */}
            <div className="bg-white border border-hairline p-6 rounded-sm">
              <h2 className="font-bold text-xs text-primary uppercase font-mono tracking-wider mb-4 border-b border-hairline pb-2 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-accent" />
                <span>Documents Checklist</span>
              </h2>
              <p className="text-xs text-body-muted leading-relaxed mb-4">
                Gather and check off these documents before starting your application to prevent delay or rejection.
              </p>
              
              <ul className="space-y-2">
                {documentsList.map((doc, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => toggleDoc(idx)}
                      className="w-full text-left flex items-start gap-3 p-2 hover:bg-canvas-soft rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={!!checkedDocs[idx]}
                        readOnly
                        className="mt-0.5 h-4 w-4 text-primary border-hairline focus:ring-accent rounded-sm pointer-events-none accent-primary"
                      />
                      <span className={`text-xs sm:text-sm leading-snug ${checkedDocs[idx] ? "line-through text-body-muted" : "text-body-dark font-medium"}`}>
                        {doc.description}
                        {doc.isMandatory && <span className="text-error ml-1 font-bold" title="Mandatory">*</span>}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dynamic Eligibility Check questionnaire */}
            {eligibilityRules.length > 0 && (
              <div className="bg-white border border-hairline p-6 rounded-sm">
                <h2 className="font-bold text-xs text-primary uppercase font-mono tracking-wider mb-4 border-b border-hairline pb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-accent" />
                  <span>Eligibility Check</span>
                </h2>
                
                <div className="space-y-4">
                  {eligibilityRules.map((rule, idx) => (
                    <div key={idx} className="space-y-2">
                      <p className="text-xs sm:text-sm font-semibold text-body-dark leading-relaxed">
                        {rule.description}
                      </p>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-1.5 text-xs text-body-muted cursor-pointer font-medium">
                          <input
                            type="radio"
                            name={`eligibility-${idx}`}
                            checked={eligibilityAnswers[idx] === true}
                            onChange={() => handleEligibilityChange(idx, true)}
                            className="text-primary border-hairline focus:ring-accent accent-primary"
                          />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center gap-1.5 text-xs text-body-muted cursor-pointer font-medium">
                          <input
                            type="radio"
                            name={`eligibility-${idx}`}
                            checked={eligibilityAnswers[idx] === false}
                            onChange={() => handleEligibilityChange(idx, false)}
                            className="text-primary border-hairline focus:ring-accent accent-primary"
                          />
                          <span>No</span>
                        </label>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={verifyEligibility}
                    className="w-full text-center px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-white text-xs font-bold rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
                  >
                    Check Eligibility
                  </button>

                  {showEligibilityResult && (
                    <div className={`p-4 rounded-sm border ${
                      isEligible 
                        ? "bg-success-soft border-success/30 text-success" 
                        : "bg-error-soft border-error/30 text-error"
                    }`}>
                      <div className="flex items-start gap-2.5">
                        {isEligible ? (
                          <CheckCircle className="w-5 h-5 shrink-0 text-success mt-0.5" />
                        ) : (
                          <ShieldAlert className="w-5 h-5 shrink-0 text-error mt-0.5" />
                        )}
                        <div className="text-xs leading-relaxed">
                          <p className="font-bold">
                            {isEligible ? "You meet the standard eligibility criteria" : "Eligibility constraints identified"}
                          </p>
                          <p className="mt-1">
                            {isEligible 
                              ? "Based on your self-declaration, you meet the requirements. You may proceed to the application."
                              : "You indicated that you do not satisfy one or more requirements. Double-check your details before filing."}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Process Steps & Actions */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step-by-Step guide */}
            <div className="bg-white border border-hairline p-6 rounded-sm">
              <h2 className="font-bold text-xs text-primary uppercase font-mono tracking-wider mb-4 border-b border-hairline pb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-accent" />
                <span>Process Steps</span>
              </h2>

              <ol className="relative border-l border-hairline pl-5 ml-2.5 space-y-6 text-xs">
                {service.steps.map((step) => (
                  <li key={step.number} className="relative">
                    {/* Step indicator node */}
                    <span className="absolute -left-[28px] top-0 flex h-4 w-4 items-center justify-center rounded-sm bg-primary text-[10px] font-bold text-white font-mono">
                      {step.number}
                    </span>
                    <h3 className="font-bold text-primary text-xs mb-1">
                      {step.title}
                    </h3>
                    <p className="text-body-muted leading-relaxed">
                      {step.instructions}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Action CTA & Interstitials */}
            <div className="bg-white border border-hairline p-6 rounded-sm space-y-4">
              <h2 className="font-bold text-xs uppercase font-mono text-primary tracking-wider">
                Start Service Application
              </h2>
              
              <p className="text-xs text-body-muted leading-relaxed">
                Choose how you want to proceed. For the evaluation prototype, you can experience our simulated online application or visit the verified official portal.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                {service.hasMockForm ? (
                  <Link
                    href={`/services/${service.id}/apply`}
                    className="flex-1 text-center py-3 bg-primary hover:bg-primary-light text-white font-bold text-xs sm:text-sm rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent flex items-center justify-center gap-1.5"
                  >
                    <span>Start Mock Application (Simulated)</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <button
                    onClick={triggerRedirect}
                    className="flex-1 text-center py-3 bg-primary hover:bg-primary-light text-white font-bold text-xs sm:text-sm rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Proceed to Official Website</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Safety banner */}
              <div className="p-3 bg-canvas-soft rounded-sm border border-hairline text-[11px] text-body-muted flex items-start gap-2">
                <p className="leading-relaxed">
                  <strong className="text-primary">Secure Navigation:</strong> GovOne only connects to verified official government domains (ending in <code className="font-mono bg-white px-1 py-0.5 border border-hairline rounded-sm text-primary">.gov.in</code> or <code className="font-mono bg-white px-1 py-0.5 border border-hairline rounded-sm text-primary">.nic.in</code>). We will never ask for bank PINs or passwords.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Redirect Warning Interstitial Modal */}
      {showRedirectWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/70">
          <div className="bg-white max-w-md w-full border border-hairline rounded-sm p-6 space-y-6 text-left">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-accent-soft border border-accent/30 text-accent rounded-sm shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="w-full min-w-0">
                <h3 className="text-base font-bold text-primary mb-1">
                  You are leaving GovOne
                </h3>
                <p className="text-xs text-body-muted leading-relaxed">
                  You are being redirected to the verified official government domain:
                </p>
                <div className="bg-canvas-soft p-2.5 rounded-sm border border-hairline font-mono text-xs text-primary truncate mt-2 font-medium">
                  {new URL(service.officialDeepLink).hostname}
                </div>
              </div>
            </div>

            <div className="p-3 bg-accent-soft/40 rounded-sm text-[11px] text-body-dark leading-relaxed border border-accent/20">
              <strong className="text-primary">Please Note:</strong> Make sure you have completed the prerequisite document checklist and met the eligibility rules before submitting your application.
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-hairline">
              <button
                onClick={cancelRedirect}
                className="px-4 py-2 border border-hairline hover:bg-canvas-soft rounded-sm text-xs font-semibold cursor-pointer text-body-dark focus-visible:ring-2 focus-visible:ring-accent focus:outline-none"
              >
                Cancel & Return
              </button>
              <a
                href={service.officialDeepLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowRedirectWarning(false)}
                className="px-4 py-2 bg-primary text-white hover:bg-primary-light rounded-sm text-xs font-bold flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus:outline-none"
              >
                <span>Continue to Official Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
