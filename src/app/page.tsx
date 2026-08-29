"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { processSearch, SearchResult, getQuerySuggestions } from "@/utils/searchEngine";
import { departments, organisations } from "@/data/servicesRegistry";
import { 
  Search, 
  ArrowRight, 
  MapPin, 
  AlertCircle,
  X,
  ArrowUpRight
} from "lucide-react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All India");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  // States list for filtering
  const indianStates = [
    "All India", "Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", 
    "Uttar Pradesh", "West Bengal", "Gujarat", "Telangana", "Kerala"
  ];

  // Run search when query or state changes
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        const results = processSearch(searchQuery, selectedState);
        setSearchResults(results);
        setIsSearching(false);
      }, 150); // Fast debounce
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery, selectedState]);

  // Click outside suggestions list to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update autocomplete suggestions
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim().length > 0) {
      setSuggestions(getQuerySuggestions(val));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (sug: string) => {
    setSearchQuery(sug);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowSuggestions(false);
  };

  const handleShortcutClick = (task: string) => {
    setSearchQuery(task);
    setShowSuggestions(false);
  };

  return (
    <>
      <Navbar />
      
      <main id="main-content" className="flex-1 w-full max-w-3xl mx-auto px-4 pt-8 pb-4 md:pt-14 md:pb-6 flex flex-col justify-start text-left focus:outline-none">
        
        {/* Proposition Header */}
        <div className="space-y-1.5 mb-5">
          <p className="text-xs font-bold text-accent uppercase tracking-wider font-mono border-l-2 border-accent pl-2">
            Government services, all in one place.
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary leading-tight">
            What do you need to get done?
          </h1>
          <p className="text-sm text-body-muted leading-relaxed font-sans mt-1.5">
            Find the right government service without knowing which department handles it.
          </p>
        </div>

        {/* Signature Bordered Search Bar */}
        <div 
          ref={autocompleteRef} 
          className="relative w-full bg-white border-2 border-primary rounded-none p-1 flex flex-col sm:flex-row gap-2 text-left mb-4 shadow-sm hover:border-primary-light transition-colors"
        >
          
          {/* State Filter Selector */}
          <div className="flex items-center gap-1.5 px-3 border-b sm:border-b-0 sm:border-r border-hairline pb-2.5 sm:pb-0 shrink-0 select-none bg-canvas-soft/30">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <label htmlFor="state-select" className="sr-only">Select State</label>
            <select
              id="state-select"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-transparent text-xs sm:text-sm font-bold text-primary focus:outline-none cursor-pointer py-1.5"
            >
              {indianStates.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Natural Language Query Input */}
          <div className="relative flex-1 flex items-center min-w-0">
            <Search className="absolute left-2.5 w-4 h-4 text-body-muted pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleQueryChange}
              placeholder="Tell us what you need..."
              className="w-full pl-9 pr-8 py-2.5 text-sm md:text-base text-body-dark bg-transparent focus:outline-none placeholder:text-body-muted/70 font-sans"
              aria-label="Search government services"
              autoComplete="off"
              spellCheck={false}
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-2 p-1 text-body-muted hover:text-primary focus:outline-none rounded-none"
                aria-label="Clear search input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <button className="bg-primary hover:bg-primary-light text-white text-sm sm:text-base font-bold px-6 py-2.5 rounded-none transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent shrink-0 cursor-pointer font-sans">
            Search
          </button>

          {/* Auto-suggestions panel */}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 top-full mt-1 bg-white border border-hairline rounded-none z-50 text-left overflow-hidden text-sm divide-y divide-hairline shadow-md">
              {suggestions.map((sug, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => selectSuggestion(sug)}
                    className="w-full text-left px-4 py-2.5 hover:bg-canvas-soft flex items-center gap-2 focus:outline-none focus:bg-canvas-soft cursor-pointer text-sm font-semibold text-body-dark font-sans"
                  >
                    <Search className="w-4 h-4 text-body-muted shrink-0" />
                    <span>{sug}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Quick Intent Shortcuts */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs text-body-muted select-none mb-4 font-sans">
          <span className="font-semibold text-body-dark">Try:</span>
          {[
            { label: "Challan", query: "Pay Traffic Challan" },
            { label: "Passport", query: "Apply for Fresh / Reissue Passport" },
            { label: "PAN", query: "Apply for Fresh / Reissue of PAN Card" },
            { label: "Tax", query: "Income Tax Return Filing" },
            { label: "PF", query: "EPFO Member Services Portfolio" }
          ].map((item, idx, arr) => (
            <React.Fragment key={idx}>
              <button
                onClick={() => handleShortcutClick(item.query)}
                className="text-primary hover:text-accent font-bold hover:underline focus:outline-none cursor-pointer transition-colors"
              >
                {item.label}
              </button>
              {idx < arr.length - 1 && <span className="text-slate-300 select-none">•</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Institutional Information Strip */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[9px] sm:text-[10px] text-body-muted font-bold font-mono tracking-widest uppercase mb-6 border-t border-b border-hairline/80 py-3 select-none">
          <span>Central & State Services</span>
          <span className="text-slate-300">|</span>
          <span>Verified Official Links</span>
          <span className="text-slate-300">|</span>
          <span>One Place to Start</span>
        </div>

        {/* Results Area (Revealed ONLY after searching) */}
        {searchQuery.trim().length > 0 ? (
          <section className="space-y-4 pt-6 border-t border-hairline w-full text-left animate-fade-in font-sans">
            <div className="flex justify-between items-center border-b border-hairline pb-2">
              <h2 className="text-xs font-bold font-mono text-primary uppercase tracking-wider">
                Matching Tasks ({searchResults.length})
              </h2>
              <span className="text-[11px] text-body-muted font-bold font-mono bg-canvas-soft px-2 py-0.5 border border-hairline">
                State: {selectedState}
              </span>
            </div>

            {isSearching ? (
              <div className="text-center py-12 bg-white border border-hairline p-8">
                <div className="inline-block h-5 w-5 border-2 border-primary border-t-transparent animate-spin rounded-full mb-2"></div>
                <p className="text-xs text-body-muted font-mono">Resolving search intent…</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map(({ service, confidence, matchedReason }) => (
                  <div 
                    key={service.id} 
                    className="bg-white border border-hairline rounded-none p-5 space-y-4 hover:border-primary transition-colors text-left"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <h3 className="text-base font-bold text-primary font-sans">
                          {service.title}
                        </h3>
                        <p className="text-[10px] text-body-muted font-mono uppercase tracking-wider mt-0.5">
                          {organisations.find(o => o.code === departments.find(d => d.id === service.deptId)?.orgCode)?.name || "Government"} • {departments.find(d => d.id === service.deptId)?.name || ""}
                        </p>
                      </div>
                      <span className="text-xs font-mono text-body-muted font-bold bg-canvas-soft border border-hairline px-2 py-0.5 rounded-none shrink-0">
                        {service.averageProcessingTime}
                      </span>
                    </div>

                    <p className="text-sm text-body-dark leading-relaxed font-sans">
                      {service.description}
                    </p>

                    <div className="text-xs text-body-muted font-mono space-y-1 bg-canvas-soft p-3 border border-hairline rounded-none">
                      <div>
                        <span className="font-bold text-primary">Required Documents:</span> {service.requirements.map(r => r.description).join(", ") || "None"}
                      </div>
                      <div>
                        <span className="font-bold text-primary">Statutory Fees:</span> {service.estimatedFees}
                      </div>
                    </div>

                    <div className="flex justify-between items-center border-t border-hairline pt-3">
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                        [{confidence} Match]
                      </span>
                      <Link 
                        href={`/services/${service.id}`}
                        className="text-xs font-bold text-primary hover:text-accent flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-accent focus:outline-none p-1 rounded-none cursor-pointer font-sans"
                      >
                        <span>View Service Requirements</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Zero Results Fallback State */
              <div className="bg-white border border-hairline rounded-none p-6 text-center max-w-xl mx-auto space-y-4">
                <AlertCircle className="w-8 h-8 text-accent mx-auto" />
                <div>
                  <h3 className="text-sm font-bold text-primary mb-1">
                    No matching services found
                  </h3>
                  <p className="text-xs text-body-muted leading-relaxed">
                    We couldn&apos;t match your query <strong>&quot;{searchQuery}&quot;</strong> to a registered citizen service. Try typing simple keywords like <em>&quot;licence&quot;</em>, <em>&quot;tax&quot;</em>, or <em>&quot;challan&quot;</em>.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2 font-sans">
                  <button 
                    onClick={clearSearch} 
                    className="text-xs px-3.5 py-2 border border-hairline hover:bg-canvas-soft rounded-none font-semibold cursor-pointer"
                  >
                    Clear Search
                  </button>
                  <a 
                    href="https://pgportal.gov.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs px-3.5 py-2 bg-primary hover:bg-primary-light text-white rounded-none font-semibold flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>File Grievance on CPGRAMS</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </section>
        ) : (
          /* Before Search State: Simple links and Quiet trust */
          <div className="w-full space-y-6 pt-6 border-t border-hairline font-sans">
            <div>
              <Link 
                href="/services"
                className="text-sm font-bold text-primary hover:text-accent flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-accent focus:outline-none w-fit cursor-pointer transition-colors"
              >
                <span>Browse all government services →</span>
              </Link>
            </div>

            <div className="text-xs text-body-muted leading-relaxed max-w-xl">
              GovOne helps you find the right government service and routes you to the official department portal.
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
