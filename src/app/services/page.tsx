"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories, services, Service } from "@/data/servicesRegistry";
import { ArrowLeft, ArrowRight, MapPin, Search } from "lucide-react";

function ServicesContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("category") || "";

  const [activeCategory, setActiveCategory] = useState(catParam);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);

  // Update category when param changes
  useEffect(() => {
    setActiveCategory(catParam);
  }, [catParam]);

  // Handle filtering
  useEffect(() => {
    let list = services;
    if (activeCategory) {
      list = list.filter((s) => s.categoryId === activeCategory);
    }
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.tags.some((t) => t.includes(q))
      );
    }
    setFilteredServices(list);
  }, [activeCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full text-left">
      {/* Breadcrumb / Back button */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-body-muted hover:text-primary focus-visible:ring-2 focus-visible:ring-accent focus:outline-none p-1 rounded-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar categories filter */}
        <aside className="w-full lg:w-64 shrink-0 space-y-4">
          <div className="bg-white border border-hairline p-4 rounded-sm">
            <h2 className="font-bold text-xs text-primary uppercase font-mono tracking-wider mb-4 border-b border-hairline pb-2">
              Categories
            </h2>
            <nav className="flex flex-col gap-1" aria-label="Categories sidebar">
              <button
                onClick={() => setActiveCategory("")}
                className={`w-full text-left px-3 py-2 text-xs font-bold rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  activeCategory === ""
                    ? "bg-primary text-white"
                    : "hover:bg-canvas-soft text-body-dark"
                }`}
              >
                All Categories ({services.length})
              </button>
              {categories.map((cat) => {
                const count = services.filter((s) => s.categoryId === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      activeCategory === cat.id
                        ? "bg-primary text-white font-bold"
                        : "hover:bg-canvas-soft text-body-dark"
                    }`}
                  >
                    <span>{cat.title}</span>
                    <span className="ml-1 text-[10px] opacity-75">({count})</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Services Listings */}
        <section className="flex-1 space-y-6">
          {/* Section Heading & Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white border border-hairline p-4 rounded-sm">
            <div>
              <h1 className="text-xl font-bold text-primary">
                {activeCategory 
                  ? categories.find(c => c.id === activeCategory)?.title 
                  : "All Government Services"}
              </h1>
              <p className="text-xs text-body-muted mt-1">
                Showing {filteredServices.length} of {services.length} services
              </p>
            </div>
            
            {/* Direct list search */}
            <div className="relative w-full md:w-72 bg-canvas border border-hairline rounded-sm px-3 py-1.5 flex items-center">
              <Search className="w-4 h-4 text-body-muted mr-2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter services in-list..."
                className="w-full text-xs text-body-dark bg-transparent focus:outline-none"
                aria-label="Filter services in list"
              />
            </div>
          </div>

          {/* List items */}
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white border border-hairline rounded-sm p-6 flex flex-col justify-between hover:border-primary transition-colors"
                >
                  <div>
                    <div className="flex justify-between items-center gap-2 mb-2">
                      <span className="text-[10px] text-body-muted font-bold tracking-wider uppercase font-mono">
                        {categories.find((c) => c.id === service.categoryId)?.title}
                      </span>
                      {service.isStateSpecific && (
                        <span className="inline-flex items-center gap-1 text-[9px] bg-amber-50 text-amber-800 px-2 py-0.5 rounded-sm font-semibold border border-amber-200">
                          <MapPin className="w-2.5 h-2.5" />
                          <span>State Specific</span>
                        </span>
                      )}
                    </div>
                    
                    <h2 className="text-lg font-bold text-primary mb-2">
                      {service.title}
                    </h2>
                    
                    <p className="text-sm text-body-muted leading-relaxed line-clamp-3 mb-4">
                      {service.description}
                    </p>
                  </div>

                  <div className="border-t border-hairline pt-4 flex items-center justify-between gap-4 mt-auto">
                    <div className="flex flex-col text-[11px] text-body-muted">
                      <span>Timeline: <strong className="text-primary font-mono">{service.averageProcessingTime}</strong></span>
                      <span>Est. Fees: <strong className="text-primary font-mono">{service.estimatedFees}</strong></span>
                    </div>
                    
                    <Link
                      href={`/services/${service.id}`}
                      className="text-xs font-bold text-primary hover:text-accent flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-accent focus:outline-none p-1 rounded-sm"
                    >
                      <span>Check Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-hairline p-8 text-center rounded-sm">
              <p className="text-sm text-body-muted">
                No services found matching your filters. Try selecting a different category or clearing the search query.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <div className="text-center py-20 flex-1">
          <div className="inline-block h-8 w-8 border-2 border-primary border-t-transparent animate-spin rounded-full mb-2"></div>
          <p className="text-sm text-body-muted font-mono">Loading services catalog…</p>
        </div>
      }>
        <ServicesContent />
      </Suspense>
      <Footer />
    </>
  );
}
