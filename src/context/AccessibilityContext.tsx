"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type FontSize = "normal" | "large" | "extra-large";

interface AccessibilityContextType {
  highContrast: boolean;
  fontSize: FontSize;
  toggleHighContrast: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<FontSize>("normal");

  // Load accessibility settings from local storage
  useEffect(() => {
    const savedContrast = localStorage.getItem("govone-contrast") === "true";
    const savedSize = localStorage.getItem("govone-fontsize") as FontSize;
    if (savedContrast) setHighContrast(savedContrast);
    if (savedSize) setFontSize(savedSize);
  }, []);

  const toggleHighContrast = () => {
    setHighContrast((prev) => {
      const newVal = !prev;
      localStorage.setItem("govone-contrast", String(newVal));
      return newVal;
    });
  };

  const increaseFontSize = () => {
    setFontSize((prev) => {
      let next: FontSize = "normal";
      if (prev === "normal") next = "large";
      else if (prev === "large") next = "extra-large";
      else next = "extra-large";
      localStorage.setItem("govone-fontsize", next);
      return next;
    });
  };

  const decreaseFontSize = () => {
    setFontSize((prev) => {
      let next: FontSize = "normal";
      if (prev === "extra-large") next = "large";
      else if (prev === "large") next = "normal";
      else next = "normal";
      localStorage.setItem("govone-fontsize", next);
      return next;
    });
  };

  const resetFontSize = () => {
    setFontSize("normal");
    localStorage.setItem("govone-fontsize", "normal");
  };

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        fontSize,
        toggleHighContrast,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
      }}
    >
      <div
        className={`min-h-screen flex flex-col ${highContrast ? "high-contrast" : ""} ${
          fontSize === "large" ? "text-lg" : fontSize === "extra-large" ? "text-xl" : "text-base"
        }`}
      >
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
}
