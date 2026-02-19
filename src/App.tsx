import { AppProvider, useApp } from "@/context/AppContext";
import { LoginPage } from "@/pages/LoginPage";
import { SignupPage } from "@/pages/SignupPage";
import { StudentHome } from "@/pages/StudentHome";
import { ReportIssuePage } from "@/pages/ReportIssuePage";
import { MyIssuesPage } from "@/pages/MyIssuesPage";
import { AdminDashboard } from "@/pages/AdminDashboard";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";

function AppContent() {
  const { role, currentView } = useApp();

  if (!role) {
    if (currentView === "signup") {
      return <SignupPage />;
    }
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      {role === "student" && currentView === "home" && <StudentHome />}
      {role === "student" && currentView === "report" && <ReportIssuePage />}
      {role === "student" && currentView === "myissues" && <MyIssuesPage />}
      {role === "admin" && <AdminDashboard />}
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
