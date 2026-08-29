import { services, Service } from "@/data/servicesRegistry";

// Hinglish & regional term translation mapping dictionary
const HINGLISH_DICTIONARY: Record<string, string[]> = {
  vehicle: ["gadi", "gaadi", "car", "bike", "motorcycle", "scooty", "chassis", "plate", "registration", "rc"],
  challan: ["chalan", "fine", "penalty", "police", "traffic", "over-speeding", "court", "online payment"],
  licence: ["license", "dl", "licence", "expire", "rto", "driver", "renew", "renewal", "driving"],
  epf: ["pf", "provident", "uan", "pension", "salary", "claim", "withdrawal", "balance", "epfo"],
  voter: ["vote", "epic", "election", "poll", "voter id", "voting", "form 6", "card correction"],
  tax: ["itr", "income tax", "tax return", "tax refund", "filing", "pan link", "pan card", "salary tax"],
  passport: ["tatkaal", "visa", "passport", "psk", "travel", "abroad", "foreign"],
  digilocker: ["locker", "documents", "marksheet", "pdf download", "fetch certificate"],
  housing: ["pmay", "awas", "yojana", "home subsidy", "loan subsidy", "garib kalyan", "flat"],
  cyber: ["hacker", "fraud", "stolen", "online scam", "phishing", "scammed", "bank deduct", "cyber crime", "police report"],
  rti: ["right to info", "ask authority", "query portal", "bureaucracy info", "file rti"],
  aadhaar: ["adhar", "aadhar", "uidai", "fingerprint", "biometric", "address change", "otp verify"],
};

export interface SearchResult {
  service: Service;
  score: number;
  confidence: "high" | "medium" | "low";
  matchedReason: string;
}

export function processSearch(query: string, stateFilter?: string): SearchResult[] {
  const cleanQuery = query.toLowerCase().trim();
  if (!cleanQuery) return [];

  // 1. Expand query tokens using the Hinglish dictionary
  const queryWords = cleanQuery.split(/\s+/);
  const expandedQueryTerms = new Set<string>(queryWords);

  for (const word of queryWords) {
    // Find any dictionary matches
    for (const [key, synonyms] of Object.entries(HINGLISH_DICTIONARY)) {
      if (synonyms.some((syn) => word.includes(syn) || syn.includes(word))) {
        expandedQueryTerms.add(key);
        // Also add the key's synonyms to boost matching scope
        synonyms.forEach((s) => expandedQueryTerms.add(s));
      }
    }
  }

  // 2. Score each service based on query overlap
  const results: SearchResult[] = [];

  for (const service of services) {
    let score = 0;
    const matchedTerms: string[] = [];

    // Check match in title (highest weight)
    const titleLower = service.title.toLowerCase();
    expandedQueryTerms.forEach((term) => {
      if (titleLower.includes(term)) {
        score += 15;
        matchedTerms.push(`Title matches "${term}"`);
      }
    });

    // Check match in tags (high weight)
    service.tags.forEach((tag) => {
      expandedQueryTerms.forEach((term) => {
        if (tag.includes(term) || term.includes(tag)) {
          score += 10;
          if (!matchedTerms.includes(`Tag matches "${tag}"`)) {
            matchedTerms.push(`Tag matches "${tag}"`);
          }
        }
      });
    });

    // Check match in description (medium weight)
    const descLower = service.description.toLowerCase();
    expandedQueryTerms.forEach((term) => {
      if (descLower.includes(term)) {
        score += 5;
      }
    });

    // Apply state filter matching if applicable
    if (stateFilter && service.isStateSpecific) {
      score += 2; // slight adjustment for state relevance
    }

    if (score > 0) {
      // Determine confidence level
      let confidence: "high" | "medium" | "low" = "low";
      if (score >= 25) confidence = "high";
      else if (score >= 10) confidence = "medium";

      // Formulate a clean, human-friendly matching explanation
      let matchedReason = "";
      if (confidence === "high") {
        matchedReason = `Direct match for your intent: ${service.title.split(" (")[0]}`;
      } else {
        const topMatches = matchedTerms.slice(0, 2).map((t) => t.split('matches "')[1]?.replace('"', '')).filter(Boolean);
        matchedReason = topMatches.length > 0 
          ? `Matched terms: ${topMatches.join(", ")}` 
          : `Relevance found in service description.`;
      }

      results.push({
        service,
        score,
        confidence,
        matchedReason,
      });
    }
  }

  // 3. Sort results by score (descending)
  return results.sort((a, b) => b.score - a.score);
}

// Generate default query suggestions based on trending items
export function getQuerySuggestions(query: string): string[] {
  const clean = query.toLowerCase().trim();
  if (!clean) return ["Renew Driving Licence", "Check EPF Balance", "Pay Traffic Challan", "Register New Voter ID"];
  
  const suggestions: string[] = [];
  
  // Suggest titles or tags matching input
  for (const s of services) {
    if (s.title.toLowerCase().includes(clean)) {
      suggestions.push(s.title);
    }
    s.tags.forEach((tag) => {
      if (tag.includes(clean) && !suggestions.includes(tag)) {
        suggestions.push(tag.charAt(0).toUpperCase() + tag.slice(1));
      }
    });
    if (suggestions.length >= 5) break;
  }
  
  return [...new Set(suggestions)].slice(0, 5);
}
