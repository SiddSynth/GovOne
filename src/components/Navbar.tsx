"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAccessibility } from "@/context/AccessibilityContext";
import { Eye, Sun, Landmark, Globe, Check } from "lucide-react";

export default function Navbar() {
  const {
    highContrast,
    toggleHighContrast,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
  } = useAccessibility();

  const [currentLang, setCurrentLang] = useState<"en" | "hi">("en");
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const handleLangChange = (lang: "en" | "hi") => {
    setCurrentLang(lang);
    setShowLangDropdown(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-t-3 border-accent border-b border-hairline bg-canvas">
      {/* Top Accessibility Bar */}
      <div className="w-full bg-primary text-white py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-canvas-soft">GOVERNMENT OF INDIA PROTOTYPE | </span>
            <span className="font-semibold text-accent">GovOne Gateway</span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Screen Reader Skip Link */}
            <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only focus:absolute focus:top-1 focus:left-1 bg-accent text-white p-2 rounded-sm font-semibold z-50 focus-visible:ring-2 focus-visible:ring-white"
            >
              Skip to Main Content
            </a>

            {/* Accessibility Controls */}
            <div className="flex items-center gap-2 border-r border-primary-light pr-4">
              <span className="text-canvas-soft mr-1 hidden md:inline text-[11px]">Accessibility:</span>
              
              {/* High Contrast Toggle */}
              <button
                onClick={toggleHighContrast}
                className="p-1 hover:text-accent rounded-sm focus-visible:ring-2 focus-visible:ring-accent focus:outline-none flex items-center gap-1 min-h-[28px]"
                aria-label={highContrast ? "Switch to standard contrast mode" : "Switch to high contrast mode"}
                title="Contrast Mode"
              >
                {highContrast ? <Sun className="w-3.5 h-3.5 text-accent" /> : <Eye className="w-3.5 h-3.5" />}
                <span className="sr-only sm:not-sr-only text-[10px]">Contrast</span>
              </button>

              {/* Font Size controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={decreaseFontSize}
                  className="px-2 py-0.5 hover:text-accent bg-primary-light text-white rounded-sm focus-visible:ring-2 focus-visible:ring-accent focus:outline-none font-mono text-[11px] min-h-[28px]"
                  aria-label="Decrease text size"
                  title="Text Size -"
                >
                  A-
                </button>
                <button
                  onClick={resetFontSize}
                  className="px-2 py-0.5 hover:text-accent bg-primary-light text-white rounded-sm focus-visible:ring-2 focus-visible:ring-accent focus:outline-none font-mono font-semibold text-[11px] min-h-[28px]"
                  aria-label="Reset text size"
                  title="Reset Text Size"
                >
                  A
                </button>
                <button
                  onClick={increaseFontSize}
                  className="px-2 py-0.5 hover:text-accent bg-primary-light text-white rounded-sm focus-visible:ring-2 focus-visible:ring-accent focus:outline-none font-mono font-bold text-[11px] min-h-[28px]"
                  aria-label="Increase text size"
                  title="Text Size +"
                >
                  A+
                </button>
              </div>
            </div>

            {/* Language Selection */}
            <div className="relative">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center gap-1 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus:outline-none py-1 px-2 rounded-sm min-h-[28px]"
                aria-haspopup="listbox"
                aria-expanded={showLangDropdown}
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="text-[11px]">{currentLang === "en" ? "English" : "हिन्दी"}</span>
              </button>
              {showLangDropdown && (
                <div
                  className="absolute right-0 mt-1 w-28 rounded-sm bg-white text-body-dark z-50 text-xs border border-hairline"
                  role="listbox"
                >
                  <button
                    onClick={() => handleLangChange("en")}
                    className="w-full text-left px-3 py-2 hover:bg-canvas-soft flex items-center justify-between focus:outline-none focus:bg-canvas-soft"
                    role="option"
                    aria-selected={currentLang === "en"}
                  >
                    <span>English</span>
                    {currentLang === "en" && <Check className="w-3.5 h-3.5 text-success" />}
                  </button>
                  <button
                    onClick={() => handleLangChange("hi")}
                    className="w-full text-left px-3 py-2 hover:bg-canvas-soft flex items-center justify-between focus:outline-none focus:bg-canvas-soft"
                    role="option"
                    aria-selected={currentLang === "hi"}
                  >
                    <span>हिन्दी</span>
                    {currentLang === "hi" && <Check className="w-3.5 h-3.5 text-success" />}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-accent focus:outline-none p-1 rounded-sm"
        >
          <div className="p-1 shrink-0">
            <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 21V9C4 4.58172 7.58172 1 12 1C16.4183 1 20 4.58172 20 9V21" stroke="#0C2340" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M8 21V12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12V21" stroke="#0C2340" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="1" r="1.5" fill="#D97706" />
              <line x1="2" y1="21" x2="22" y2="21" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-lg text-primary tracking-tight leading-none font-sans">GovOne</span>
            <span className="text-[10px] text-body-muted font-semibold tracking-wider uppercase mt-0.5 font-sans">Unified Gateway</span>
          </div>
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6">
          <Link 
            href="/" 
            className="text-sm font-semibold text-body-dark hover:text-primary focus-visible:ring-2 focus-visible:ring-accent focus:outline-none py-1 px-1.5 rounded-sm"
          >
            Home
          </Link>
          <Link 
            href="/services" 
            className="text-sm font-semibold text-body-dark hover:text-primary focus-visible:ring-2 focus-visible:ring-accent focus:outline-none py-1 px-1.5 rounded-sm"
          >
            All Services
          </Link>
          <Link 
            href="/track" 
            className="text-sm font-semibold text-body-dark hover:text-primary focus-visible:ring-2 focus-visible:ring-accent focus:outline-none py-1 px-1.5 rounded-sm"
          >
            Track Status
          </Link>
          
          <Link 
            href="/dashboard" 
            className="text-xs font-bold px-3.5 py-2 bg-primary text-white hover:bg-primary-light rounded-sm focus-visible:ring-2 focus-visible:ring-accent focus:outline-none transition-colors"
          >
            My Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
