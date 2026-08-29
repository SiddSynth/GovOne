"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  ArrowRight,
  LogOut,
  UserPlus,
  Info
} from "lucide-react";

interface SavedApp {
  ref: string;
  serviceId: string;
  serviceTitle: string;
  status: string;
  date: string;
  fullName: string;
}

export default function DashboardPage() {
  const [applications, setApplications] = useState<SavedApp[]>([]);
  const [isLinked, setIsLinked] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "Citizen User",
    aadhaarNo: "Not Linked",
    panNo: "Not Linked",
    phoneNo: "Not Linked",
  });

  // Load local applications and linked DigiLocker profile
  useEffect(() => {
    const savedApps = JSON.parse(localStorage.getItem("govone-applications") || "[]");
    setApplications(savedApps);

    // If there's an application submitted, let's assume the profile was linked
    if (savedApps.length > 0) {
      setIsLinked(true);
      setProfile({
        fullName: "Ramesh Kumar",
        aadhaarNo: "4421-5582-9931",
        panNo: "BRVPK8826H",
        phoneNo: "9876543210",
      });
    }
  }, []);

  const simulateLink = () => {
    setIsLinked(true);
    setProfile({
      fullName: "Ramesh Kumar",
      aadhaarNo: "4421-5582-9931",
      panNo: "BRVPK8826H",
      phoneNo: "9876543210",
    });
  };

  const simulateDisconnect = () => {
    setIsLinked(false);
    setProfile({
      fullName: "Citizen User",
      aadhaarNo: "Not Linked",
      panNo: "Not Linked",
      phoneNo: "Not Linked",
    });
  };

  return (
    <>
      <Navbar />
      
      <main id="main-content" className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full text-left">
        {/* Title Panel */}
        <div className="mb-6 border-b border-hairline pb-4">
          <h1 className="text-2xl font-bold text-primary">Citizen Dashboard</h1>
          <p className="text-xs text-body-muted mt-1 leading-relaxed">
            Manage your verified simulation credentials and track active applications filed through this gateway.
          </p>
        </div>

        {/* Persistent Fictional Identity Notice (DESIGN.md Section 6) */}
        <div className="mb-8 bg-canvas-soft border border-hairline p-3.5 rounded-sm flex items-start gap-2.5 text-xs text-body-muted">
          <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-primary">Simulated Environment Notice:</strong> This dashboard displays prototype credentials and mock databases using fictional dummy data (e.g. Ramesh Kumar). No real citizen identity documents are collected or processed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Profile Credential card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-hairline p-6 rounded-sm">
              <h2 className="font-bold text-xs text-primary uppercase font-mono tracking-wider mb-4 border-b border-hairline pb-2">
                Identity Profile
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 bg-canvas-soft border border-hairline flex items-center justify-center font-bold text-primary text-xs shrink-0 rounded-sm font-mono">
                    {profile.fullName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-primary">{profile.fullName}</h3>
                    <p className="text-[10px] text-body-muted">{isLinked ? "Verified Simulation Profile" : "Unlinked Session"}</p>
                  </div>
                </div>

                <div className="space-y-2 border-t border-hairline pt-4 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-body-muted">Aadhaar:</span>
                    <span className="font-semibold text-primary">{profile.aadhaarNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-body-muted">PAN:</span>
                    <span className="font-semibold text-primary">{profile.panNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-body-muted">Mobile:</span>
                    <span className="font-semibold text-primary">{profile.phoneNo}</span>
                  </div>
                </div>

                <div className="pt-2">
                  {isLinked ? (
                    <button
                      onClick={simulateDisconnect}
                      className="w-full text-center py-2 border border-hairline text-primary hover:bg-canvas-soft text-xs font-bold rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Disconnect DigiLocker</span>
                    </button>
                  ) : (
                    <button
                      onClick={simulateLink}
                      className="w-full text-center py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <UserPlus className="w-3.5 h-3.5 text-accent" />
                      <span>Connect via DigiLocker</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Quick trust metrics panel */}
            <div className="border border-hairline p-5 rounded-sm bg-canvas-soft">
              <h3 className="font-bold text-xs uppercase font-mono text-primary mb-2">Redirection Notice</h3>
              <p className="text-[11px] text-body-muted leading-relaxed">
                Linking your credentials allows GovOne to pre-fill standard application fields, minimizing manual entry before redirecting to official state databases.
              </p>
            </div>
          </div>

          {/* Right Column: Applications status and saved services */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Active Applications list */}
            <div className="bg-white border border-hairline p-6 rounded-sm">
              <h2 className="font-bold text-xs text-primary uppercase font-mono tracking-wider mb-4 border-b border-hairline pb-2">
                Active Applications ({applications.length})
              </h2>

              {applications.length > 0 ? (
                <div className="divide-y divide-hairline">
                  {applications.map((app) => (
                    <div key={app.ref} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-canvas-soft px-4 rounded-sm mb-2 border border-hairline">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-primary">{app.serviceTitle}</span>
                          <span className="text-[9px] font-bold border border-hairline px-2 py-0.5 rounded-sm uppercase bg-white font-mono text-primary">
                            {app.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-body-muted mt-1 font-mono">
                          <span>Ref: {app.ref}</span>
                          <span>|</span>
                          <span>Date: {app.date}</span>
                        </div>
                      </div>
                      <Link
                        href={`/track?ref=${app.ref}`}
                        className="text-xs font-bold text-primary hover:text-accent flex items-center gap-1 self-end sm:self-center focus-visible:ring-2 focus-visible:ring-accent focus:outline-none p-1 rounded-sm"
                      >
                        <span>Track Status</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-body-muted text-xs">
                  <p>No active applications logged from this browser session.</p>
                </div>
              )}
            </div>

            {/* Saved Services Section */}
            <div className="bg-white border border-hairline p-6 rounded-sm">
              <h2 className="font-bold text-xs text-primary uppercase font-mono tracking-wider mb-4 border-b border-hairline pb-2">
                Saved Service Bookmarks
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-hairline p-5 rounded-sm hover:border-primary transition-colors flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-xs text-primary mb-1">Search & Pay Traffic Challan</h3>
                    <p className="text-[11px] text-body-muted leading-relaxed">Settle traffic penalties online by vehicle license plate number.</p>
                  </div>
                  <Link 
                    href="/services/vehicle-challan-pay" 
                    className="text-xs font-bold text-primary hover:text-accent mt-4 flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-accent focus:outline-none p-0.5 rounded-sm"
                  >
                    <span>Open Service</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                
                <div className="border border-hairline p-5 rounded-sm hover:border-primary transition-colors flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-xs text-primary mb-1">New Voter Registration (Form 6)</h3>
                    <p className="text-[11px] text-body-muted leading-relaxed">Submit enrollment applications to receive an EPIC card.</p>
                  </div>
                  <Link 
                    href="/services/voter-registration" 
                    className="text-xs font-bold text-primary hover:text-accent mt-4 flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-accent focus:outline-none p-0.5 rounded-sm"
                  >
                    <span>Open Service</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
