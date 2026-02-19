import { useState, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { Issue, Severity, Category, CATEGORIES } from "@/data/mockData";
import { Camera, ChevronLeft, CheckCircle2, X } from "lucide-react";

const SEVERITIES: { value: Severity; label: string; desc: string; className: string }[] = [
  { value: "low", label: "Low", desc: "Minor inconvenience", className: "severity-low" },
  { value: "medium", label: "Medium", desc: "Affecting daily life", className: "severity-medium" },
  { value: "high", label: "High", desc: "Urgent / Safety risk", className: "severity-high" },
];

export function ReportIssuePage() {
  const { user, addIssue, issues, setCurrentView } = useApp();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("plumbing");
  const [severity, setSeverity] = useState<Severity>("medium");
  const [photoUrl, setPhotoUrl] = useState<string | undefined>();
  const [submitted, setSubmitted] = useState(false);
  const [newIssueId, setNewIssueId] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
    }
  };

  const handleSubmit = () => {
    setError("");
    if (!description.trim()) {
      setError("Please describe the issue.");
      return;
    }
    const id = `MFU-${String(issues.length + 1).padStart(3, "0")}`;
    const newIssue: Issue = {
      id,
      studentId: user!.studentId,
      building: user!.building,
      category,
      description: description.trim(),
      severity,
      status: "submitted",
      photoUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    addIssue(newIssue);
    setNewIssueId(id);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 pb-8">
        <div className="max-w-md md:max-w-2xl w-full text-center animate-scale-in">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-secondary flex items-center justify-center mx-auto mb-5 md:mb-8">
            <CheckCircle2 className="h-10 w-10 md:h-12 md:w-12 text-primary" />
          </div>
          <h2 className="text-xl md:text-3xl font-bold text-foreground mb-2 md:mb-4">Issue Reported!</h2>
          <p className="text-muted-foreground text-sm md:text-base mb-4 md:mb-6">
            Your report has been submitted successfully. You can track the status in My Issues.
          </p>
          <div className="bg-secondary rounded-xl px-4 md:px-6 py-3 md:py-4 mb-6 md:mb-8">
            <p className="text-xs md:text-sm text-muted-foreground mb-1">Issue ID</p>
            <p className="text-lg md:text-2xl font-bold font-mono text-primary">{newIssueId}</p>
          </div>
          <div className="space-y-2 md:space-y-3">
            <button
              onClick={() => setCurrentView("myissues")}
              className="w-full rounded-xl bg-primary text-primary-foreground py-3 md:py-4 text-sm md:text-base font-bold hover:opacity-90 transition"
            >
              View My Issues
            </button>
            <button
              onClick={() => setCurrentView("home")}
              className="w-full rounded-xl border border-border text-foreground py-3 md:py-4 text-sm md:text-base font-medium hover:bg-muted transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="max-w-2xl md:max-w-4xl mx-auto px-4 md:px-8 py-4 md:py-8">
        {/* Back button */}
        <button
          onClick={() => setCurrentView("home")}
          className="flex items-center gap-1 text-sm md:text-base text-muted-foreground mb-6 md:mb-8 hover:text-foreground transition"
        >
          <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
          Back
        </button>

        <div className="space-y-5 md:space-y-7 max-w-2xl">
          {/* Photo Upload */}
          <div>
            <label className="block text-sm md:text-base font-semibold mb-2 md:mb-3">Photo / Evidence</label>
            <div
              onClick={() => fileRef.current?.click()}
              className="relative rounded-xl border-2 border-dashed border-border bg-muted hover:border-primary transition-colors cursor-pointer overflow-hidden"
            >
              {photoUrl ? (
                <div className="relative">
                  <img src={photoUrl} alt="Preview" className="w-full h-48 md:h-72 object-cover" />
                  <button
                    onClick={(e) => { e.stopPropagation(); setPhotoUrl(undefined); }}
                    className="absolute top-2 right-2 bg-foreground/60 text-background rounded-full p-1"
                  >
                    <X className="h-3 w-3 md:h-4 md:w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 md:py-16 gap-2">
                  <Camera className="h-8 w-8 md:h-10 md:w-10 text-muted-foreground" />
                  <p className="text-sm md:text-base text-muted-foreground font-medium">Tap to add photo</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Optional but recommended</p>
                </div>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm md:text-base font-semibold mb-2 md:mb-3">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full rounded-xl border border-input bg-background px-4 md:px-5 py-3 md:py-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
            >
              {Object.entries(CATEGORIES).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm md:text-base font-semibold mb-2 md:mb-3">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the problem in detail. Include room number if applicable."
              rows={4}
              className="w-full rounded-xl border border-input bg-background px-4 md:px-5 py-3 md:py-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          {/* Severity */}
          <div>
            <label className="block text-sm md:text-base font-semibold mb-2 md:mb-3">Severity</label>
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              {SEVERITIES.map(({ value, label, desc, className }) => (
                <button
                  key={value}
                  onClick={() => setSeverity(value)}
                  className={`rounded-xl p-3 md:p-4 text-center border-2 transition-all ${
                    severity === value
                      ? "border-primary scale-[1.02]"
                      : "border-transparent"
                  } ${className}`}
                >
                  <p className="text-sm md:text-base font-bold">{label}</p>
                  <p className="text-[10px] md:text-xs mt-0.5 opacity-80">{desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Building (auto-assigned) */}
          <div className="bg-secondary rounded-xl px-4 md:px-6 py-3 md:py-4">
            <p className="text-xs md:text-sm text-muted-foreground">Reporting for building</p>
            <p className="text-sm md:text-lg font-bold text-secondary-foreground">{user?.building}</p>
          </div>

          {error && (
            <div className="rounded-lg bg-destructive/10 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-destructive font-medium">
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full rounded-xl bg-primary text-primary-foreground py-3.5 md:py-4 text-sm md:text-base font-bold hover:opacity-90 active:scale-[0.98] transition-all"
          >
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
}
