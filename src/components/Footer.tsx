import React from "react";
import Link from "next/link";
import { Landmark, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-canvas-soft border-t border-hairline mt-auto text-body-muted text-xs">
      <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
        {/* Portal Branding */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <div className="p-0.5 shrink-0">
              <svg className="w-5.5 h-5.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 21V9C4 4.58172 7.58172 1 12 1C16.4183 1 20 4.58172 20 9V21" stroke="#0C2340" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M8 21V12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12V21" stroke="#0C2340" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="1" r="1.5" fill="#D97706" />
                <line x1="2" y1="21" x2="22" y2="21" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-bold text-sm text-primary tracking-tight font-sans">GovOne</span>
          </div>
          <p className="text-[11px] leading-relaxed text-body-muted">
            India's unified gateway to public services. Simplifying administrative tasks for citizens, businesses, and communities.
          </p>
        </div>

        {/* Categories Link Columns */}
        <div>
          <h2 className="font-bold text-primary mb-2 text-xs tracking-wider uppercase font-mono">Popular Categories</h2>
          <ul className="space-y-1.5">
            <li>
              <Link href="/services?category=transport" className="hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-accent focus:outline-none rounded-sm">
                Transport & Driving
              </Link>
            </li>
            <li>
              <Link href="/services?category=taxation" className="hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-accent focus:outline-none rounded-sm">
                Taxation & Revenue
              </Link>
            </li>
            <li>
              <Link href="/services?category=identity" className="hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-accent focus:outline-none rounded-sm">
                Identity & Certificates
              </Link>
            </li>
            <li>
              <Link href="/services?category=welfare" className="hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-accent focus:outline-none rounded-sm">
                Social Welfare & Schemes
              </Link>
            </li>
          </ul>
        </div>

        {/* Essential Links */}
        <div>
          <h2 className="font-bold text-primary mb-2 text-xs tracking-wider uppercase font-mono">Support & Grievances</h2>
          <ul className="space-y-1.5">
            <li>
              <Link href="/track" className="hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-accent focus:outline-none rounded-sm">
                Track Application
              </Link>
            </li>
            <li>
              <Link href="/grievances" className="hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-accent focus:outline-none rounded-sm">
                Register a Grievance
              </Link>
            </li>
            <li>
              <Link href="/help" className="hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-accent focus:outline-none rounded-sm">
                Help & FAQs
              </Link>
            </li>
            <li>
              <a href="https://pgportal.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-accent focus:outline-none rounded-sm">
                <span>CPGRAMS Portal</span>
                <ExternalLink className="w-2.5 h-2.5 text-body-muted" />
              </a>
            </li>
          </ul>
        </div>

        {/* Official Disclaimers */}
        <div>
          <h2 className="font-bold text-primary mb-2 text-xs tracking-wider uppercase font-mono">Official Resources</h2>
          <ul className="space-y-1.5">
            <li>
              <a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-accent focus:outline-none rounded-sm">
                <span>National Portal of India</span>
                <ExternalLink className="w-2.5 h-2.5 text-body-muted" />
              </a>
            </li>
            <li>
              <a href="https://www.digilocker.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-accent focus:outline-none rounded-sm">
                <span>DigiLocker India</span>
                <ExternalLink className="w-2.5 h-2.5 text-body-muted" />
              </a>
            </li>
            <li>
              <a href="https://apisetu.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-accent focus:outline-none rounded-sm">
                <span>API Setu Portal</span>
                <ExternalLink className="w-2.5 h-2.5 text-body-muted" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Legal Bar */}
      <div className="w-full bg-primary text-canvas-soft text-[11px] py-4 border-t border-primary-light">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left leading-relaxed">
            <p className="font-semibold text-white">Disclaimer for Prototype Evaluation:</p>
            <p className="max-w-3xl text-[10px] text-canvas-soft/80 mt-0.5">
              This application is an educational prototype and a proof-of-concept for the &quot;Build for India&quot; initiative. It is NOT an official government website, nor does it write data to official government portals. Sensitive details and payments represented here are strictly mocked.
            </p>
          </div>
          <div className="text-center md:text-right shrink-0 text-[10px]">
            <p>&copy; {new Date().getFullYear()} GovOne. All Rights Reserved.</p>
            <p className="text-canvas-soft/75 mt-0.5">Built with Digital Public Infrastructure Design Guidelines.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
