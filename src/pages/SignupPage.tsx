import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { DORM_BUILDINGS } from "@/data/mockData";
import { ChevronLeft, Building2, CheckCircle2 } from "lucide-react";

export function SignupPage() {
  const { signupStudent, setCurrentView } = useApp();
  const [studentId, setStudentId] = useState("");
  const [selectedDorm, setSelectedDorm] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showDormDropdown, setShowDormDropdown] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSignup = () => {
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

    // Validate dorm selection
    if (!selectedDorm) {
      setError("Please select your dormitory.");
      return;
    }

    // Validate password
    if (!password.trim()) {
      setError("Password is required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Save account + preferences and auto-login
    signupStudent(studentId, password, selectedDorm as string);
    // signupStudent will auto-login and redirect; as a fallback show submitted
    setTimeout(() => setSubmitted(true), 300);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 pb-8">
        <div className="max-w-md w-full text-center animate-scale-in">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-secondary flex items-center justify-center mx-auto mb-5 md:mb-8">
            <CheckCircle2 className="h-10 w-10 md:h-12 md:w-12 text-primary" />
          </div>
          <h2 className="text-xl md:text-3xl font-bold text-foreground mb-2 md:mb-4">Signup Successful!</h2>
          <p className="text-muted-foreground text-sm md:text-base mb-2">
            Your dormitory has been registered.
          </p>
          <p className="text-muted-foreground text-sm md:text-base mb-6 md:mb-8">
            <span className="font-semibold">{selectedDorm}</span> will be used during login.
          </p>
          <button
            onClick={() => setCurrentView("login")}
            className="w-full rounded-xl bg-primary text-primary-foreground py-3 md:py-4 text-sm md:text-base font-bold hover:opacity-90 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header Banner */}
      <div className="header-gradient px-6 md:px-8 pt-16 md:pt-24 pb-10 md:pb-16 text-primary-foreground text-center">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-gold rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg">
          <span className="text-2xl md:text-3xl font-bold text-gold-foreground">MFU</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-bold">Student Signup</h1>
        <p className="text-sm md:text-base opacity-75 mt-1 md:mt-2">Register Your Dormitory</p>
      </div>

      {/* Card */}
      <div className="flex-1 px-4 md:px-8 -mt-4">
        <div className="max-w-sm md:max-w-md mx-auto bg-card card-shadow rounded-2xl overflow-hidden animate-slide-up">
          <div className="p-6 md:p-8">
            <button
              onClick={() => setCurrentView("login")}
              className="flex items-center gap-1 text-sm md:text-base text-muted-foreground mb-6 hover:text-foreground transition"
            >
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
              Back to Login
            </button>

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
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter a password"
                  className="w-full rounded-xl border border-input bg-background px-4 md:px-5 py-3 md:py-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-ring transition"
                />
              </div>

              <div>
                <label className="block text-sm md:text-base font-semibold text-foreground mb-1.5 md:mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  className="w-full rounded-xl border border-input bg-background px-4 md:px-5 py-3 md:py-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-ring transition"
                />
              </div>

              <div>
                <label className="block text-sm md:text-base font-semibold text-foreground mb-1.5 md:mb-2">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="h-4 w-4 md:h-5 md:w-5" />
                    Select Your Dormitory
                  </div>
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowDormDropdown(!showDormDropdown)}
                    className="w-full flex items-center justify-between bg-background border border-input rounded-xl px-4 md:px-5 py-3 md:py-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-ring transition"
                  >
                    <span className={selectedDorm ? "text-foreground" : "text-muted-foreground"}>
                      {selectedDorm || "Choose a dormitory..."}
                    </span>
                    <span className="text-muted-foreground">▼</span>
                  </button>

                  {/* Dropdown Menu */}
                  {showDormDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-input rounded-xl z-40 max-h-72 overflow-y-auto shadow-lg">
                      {DORM_BUILDINGS.map((building) => (
                        <button
                          key={building}
                          onClick={() => {
                            setSelectedDorm(building);
                            setShowDormDropdown(false);
                          }}
                          className={`w-full text-left px-4 md:px-5 py-2.5 md:py-3 text-sm md:text-base hover:bg-muted transition-colors ${
                            selectedDorm === building ? "bg-secondary font-semibold text-primary" : ""
                          }`}
                        >
                          {building}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-xs md:text-sm text-muted-foreground mt-1.5 md:mt-2">
                  This will be saved as your dormitory assignment
                </p>
              </div>

              {error && (
                <div className="rounded-lg bg-destructive/10 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-destructive font-medium">
                  {error}
                </div>
              )}

              <button
                onClick={handleSignup}
                className="w-full rounded-xl bg-primary text-primary-foreground py-3 md:py-4 text-sm md:text-base font-bold hover:opacity-90 active:scale-[0.98] transition-all"
              >
                Complete Signup
              </button>

              <div className="bg-secondary rounded-xl p-3 md:p-4">
                <p className="text-xs md:text-sm text-muted-foreground">
                  <span className="font-semibold">Note:</span> Your dormitory choice will be saved. If the automatic system assigns a different dorm during login, your registered choice will take precedence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
