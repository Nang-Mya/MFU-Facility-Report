import { LogOut, Shield, Bell } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { ThemeToggle } from "./ThemeToggle";

export function AppHeader() {
  const { user, role, logout, currentView } = useApp();

  const title =
    currentView === "admin"
      ? "Admin Dashboard"
      : currentView === "myissues"
      ? "My Issues"
      : currentView === "report"
      ? "Report Issue"
      : "MFU Facility Report";

  return (
    <div className="header-gradient text-primary-foreground px-4 md:px-8 pt-12 md:pt-16 pb-4 md:pb-6 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <p className="text-xs md:text-sm font-medium opacity-75">Mae Fah Luang University</p>
          <h1 className="text-lg md:text-2xl font-bold">{title}</h1>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          {role === "admin" && (
            <div className="flex items-center gap-1 bg-gold rounded-full px-2.5 md:px-3.5 py-1 md:py-1.5">
              <Shield className="h-3 w-3 md:h-4 md:w-4 text-gold-foreground" />
              <span className="text-xs md:text-sm font-semibold text-gold-foreground">Admin</span>
            </div>
          )}
          {role === "student" && user && (
            <div className="text-right">
              <p className="text-xs opacity-75">Building</p>
              <p className="text-sm md:text-base font-semibold">{user.building}</p>
            </div>
          )}
          <ThemeToggle />
          <button
            onClick={logout}
            className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors"
          >
            <LogOut className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
