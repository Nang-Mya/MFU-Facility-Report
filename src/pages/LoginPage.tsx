import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Shield, GraduationCap, Eye, EyeOff } from "lucide-react";

// Mock student credentials for testing
const MOCK_STUDENTS = {
  "6730123456": "student123",
  "6510987654": "student123",
};

export function LoginPage() {
  const { loginAsStudent, loginAsAdmin, setCurrentView } = useApp();
  const [tab, setTab] = useState<"student" | "admin">("student");
  const [studentId, setStudentId] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [showStudentPass, setShowStudentPass] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleStudentLogin = () => {
    setError("");
    
    // Validate Student ID format
    if (!studentId.trim()) {
      setError("Student ID is required.");
      return;
    }
    if (!/^\d{10}$/.test(studentId)) {
      setError("Student ID must be exactly 10 digits.");
      return;
    }

    // Validate password
    if (!studentPassword.trim()) {
      setError("Password is required.");
      return;
    }

    // Attempt login via AppContext (checks saved accounts and demo accounts)
    try {
      loginAsStudent(studentId, studentPassword);
    } catch (e) {
      setError("Invalid Student ID or password.");
    }
  };

  const handleAdminLogin = () => {
    setError("");
    if (username === "admin" && password === "admin123") {
      loginAsAdmin();
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header Banner */}
      <div className="header-gradient px-6 md:px-8 pt-16 md:pt-24 pb-10 md:pb-16 text-primary-foreground text-center">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-gold rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg">
          <span className="text-2xl md:text-3xl font-bold text-gold-foreground">MFU</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-bold">Facility Report</h1>
        <p className="text-sm md:text-base opacity-75 mt-1 md:mt-2">Mae Fah Luang University</p>
      </div>

      {/* Card */}
      <div className="flex-1 px-4 md:px-8 -mt-4">
        <div className="max-w-sm md:max-w-md mx-auto bg-card card-shadow rounded-2xl overflow-hidden animate-slide-up">
          {/* Tab Switch */}
          <div className="flex border-b border-border">
            <button
              onClick={() => { setTab("student"); setError(""); }}
              className={`flex-1 flex items-center justify-center gap-2 py-4 md:py-5 text-sm md:text-base font-semibold transition-colors ${
                tab === "student"
                  ? "text-primary border-b-2 border-primary bg-secondary/50"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <GraduationCap className="h-4 w-4 md:h-5 md:w-5" />
              Student
            </button>
            <button
              onClick={() => { setTab("admin"); setError(""); }}
              className={`flex-1 flex items-center justify-center gap-2 py-4 md:py-5 text-sm md:text-base font-semibold transition-colors ${
                tab === "admin"
                  ? "text-primary border-b-2 border-primary bg-secondary/50"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Shield className="h-4 w-4 md:h-5 md:w-5" />
              Admin
            </button>
          </div>

          <div className="p-6 md:p-8">
            {tab === "student" ? (
              <div className="space-y-4 md:space-y-5">
                <div>
                  <label className="block text-sm md:text-base font-semibold text-foreground mb-1.5 md:mb-2">
                    Student ID
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="e.g. 6730123456"
                    className="w-full rounded-xl border border-input bg-background px-4 md:px-5 py-3 md:py-4 text-sm md:text-base font-mono focus:outline-none focus:ring-2 focus:ring-ring transition"
                  />
                  <p className="text-xs md:text-sm text-muted-foreground mt-1.5 md:mt-2">Enter your 10-digit student ID</p>
                </div>

                <div>
                  <label className="block text-sm md:text-base font-semibold text-foreground mb-1.5 md:mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showStudentPass ? "text" : "password"}
                      value={studentPassword}
                      onChange={(e) => setStudentPassword(e.target.value)}
                      placeholder="••••••••"
                      onKeyDown={(e) => e.key === "Enter" && handleStudentLogin()}
                      className="w-full rounded-xl border border-input bg-background px-4 md:px-5 py-3 md:py-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-ring transition pr-11"
                    />
                    <button
                      onClick={() => setShowStudentPass(!showStudentPass)}
                      className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showStudentPass ? <EyeOff className="h-4 w-4 md:h-5 md:w-5" /> : <Eye className="h-4 w-4 md:h-5 md:w-5" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="rounded-lg bg-destructive/10 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-destructive font-medium">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleStudentLogin}
                  className="w-full rounded-xl bg-primary text-primary-foreground py-3 md:py-4 text-sm md:text-base font-bold hover:opacity-90 active:scale-[0.98] transition-all"
                >
                  Sign In as Student
                </button>

                <div className="bg-muted rounded-xl p-3 md:p-4 space-y-1 md:space-y-2">
                  <p className="text-xs md:text-sm font-semibold text-muted-foreground">Test Credentials:</p>
                  <div className="space-y-1 md:space-y-1.5 text-xs md:text-sm">
                    <div className="font-mono text-primary">
                      <p>ID: 6730123456</p>
                      <p>PW: student123</p>
                    </div>
                    <div className="font-mono text-primary">
                      <p>ID: 6510987654</p>
                      <p>PW: student123</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 md:space-y-5">
                <div>
                  <label className="block text-sm md:text-base font-semibold text-foreground mb-1.5 md:mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    className="w-full rounded-xl border border-input bg-background px-4 md:px-5 py-3 md:py-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-ring transition"
                  />
                </div>
                <div>
                  <label className="block text-sm md:text-base font-semibold text-foreground mb-1.5 md:mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
                      className="w-full rounded-xl border border-input bg-background px-4 md:px-5 py-3 md:py-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-ring transition pr-11"
                    />
                    <button
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPass ? <EyeOff className="h-4 w-4 md:h-5 md:w-5" /> : <Eye className="h-4 w-4 md:h-5 md:w-5" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="rounded-lg bg-destructive/10 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-destructive font-medium">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleAdminLogin}
                  className="w-full rounded-xl bg-primary text-primary-foreground py-3 md:py-4 text-sm md:text-base font-bold hover:opacity-90 active:scale-[0.98] transition-all"
                >
                  Sign In as Admin
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-center px-4 md:px-8 py-4 md:py-6">
        <p className="text-xs md:text-sm text-muted-foreground">
          Use your student ID and school portal password to log in.
        </p>
      </div>

      <p className="text-center text-xs md:text-sm text-muted-foreground py-6 md:py-8">
        MFU Facility Report System — Prototype v1.0
      </p>
    </div>
  );
}
