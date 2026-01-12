"use client";

import { createContext, useContext, ReactNode } from "react";
import { School } from "@/lib/types";
import { mockSchool } from "@/lib/mockData";

interface SchoolContextType {
  school: School;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export function SchoolProvider({ children }: { children: ReactNode }) {
  // For now, hardcoded to one school
  // In the future, this could come from:
  // - URL subdomain (abadalisboa.yourdomain.com)
  // - Database lookup based on user
  // - Environment variable
  const school = mockSchool;

  return (
    <SchoolContext.Provider value={{ school }}>
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchool() {
  const context = useContext(SchoolContext);
  if (context === undefined) {
    throw new Error("useSchool must be used within a SchoolProvider");
  }
  return context;
}
