"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "@/lib/types";
import { mockStudent, mockTeacher } from "@/lib/mockData";

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
  toggleRole: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(mockStudent);

  const toggleRole = () => {
    const newUser = user.role === "student" ? mockTeacher : mockStudent;
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, setUser, toggleRole }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
