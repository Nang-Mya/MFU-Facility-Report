import { Home, FileText, User, LayoutDashboard } from "lucide-react";
import { useApp } from "@/context/AppContext";

export function BottomNav() {
  const { currentView, setCurrentView, role } = useApp();

  if (role === "admin") return null;

  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "myissues", label: "My Issues", icon: FileText },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border safe-area-inset">
      <div className="max-w-md mx-auto flex">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setCurrentView(id)}
            className={`flex-1 flex flex-col items-center justify-center py-3 gap-0.5 transition-colors ${
              currentView === id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon
              className={`h-5 w-5 ${currentView === id ? "stroke-[2.5]" : "stroke-2"}`}
            />
            <span className={`text-[10px] font-medium ${currentView === id ? "text-primary" : ""}`}>
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
