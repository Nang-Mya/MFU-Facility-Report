import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Issue, MOCK_ISSUES, assignDorm, IssueStatus } from "@/data/mockData";

export type UserRole = "student" | "admin";

export interface Student {
  studentId: string;
  building: string;
}

interface AppContextType {
  user: Student | null;
  role: UserRole | null;
  issues: Issue[];
  loginAsStudent: (studentId: string, password: string) => void;
  loginAsAdmin: () => void;
  logout: () => void;
  addIssue: (issue: Issue) => void;
  updateIssueStatus: (id: string, status: IssueStatus) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Student | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [issues, setIssues] = useState<Issue[]>(MOCK_ISSUES);
  const [currentView, setCurrentView] = useState("login");

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedRole = localStorage.getItem("role");
    
    if (savedUser && savedRole) {
      try {
        setUser(JSON.parse(savedUser));
        setRole(savedRole as UserRole);
        setCurrentView(savedRole === "admin" ? "admin" : "home");
      } catch (e) {
        console.error("Failed to load user from localStorage:", e);
      }
    }
  }, []);

  const loginAsStudent = useCallback((studentId: string) => {
    // (Deprecated) legacy call without password — do nothing
    console.warn("loginAsStudent called without password — use login with password");
  }, []);

  // Default demo/test students (keep for convenience)
  const DEFAULT_TEST_STUDENTS: Record<string, string> = {
    "6730123456": "student123",
    "6510987654": "student123",
  };

  const loginAsStudentWithPassword = useCallback((studentId: string, password: string) => {
    // Load saved accounts
    const saved = localStorage.getItem("students");
    const accounts: Record<string, string> = saved ? JSON.parse(saved) : {};

    const expected = accounts[studentId] || DEFAULT_TEST_STUDENTS[studentId];
    if (!expected || expected !== password) {
      throw new Error("Invalid credentials");
    }

    // Check if student has a registered dorm preference
    const studentPrefs = localStorage.getItem(`student_${studentId}_dorm`);
    const building = studentPrefs || assignDorm(studentId);

    const newUser = { studentId, building };
    setUser(newUser);
    setRole("student");
    setCurrentView("home");

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("role", "student");
  }, []);

  const loginAsAdmin = useCallback(() => {
    setUser(null);
    setRole("admin");
    setCurrentView("admin");
    
    // Save to localStorage
    localStorage.setItem("role", "admin");
    localStorage.removeItem("user");
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setRole(null);
    setCurrentView("login");
    
    // Clear localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  }, []);

  const addIssue = useCallback((issue: Issue) => {
    setIssues((prev) => [issue, ...prev]);
  }, []);

  const updateIssueStatus = useCallback((id: string, status: IssueStatus) => {
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === id
          ? { ...issue, status, updatedAt: new Date() }
          : issue
      )
    );
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        role,
        issues,
        loginAsStudent: loginAsStudentWithPassword,
        loginAsAdmin,
        logout,
        addIssue,
        updateIssueStatus,
        currentView,
        setCurrentView,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
