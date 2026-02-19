import { useApp } from "@/context/AppContext";
import { IssueCard } from "@/components/IssueCard";
import { Plus, Building2, TrendingUp } from "lucide-react";

export function StudentHome() {
  const { issues, user, setCurrentView } = useApp();

  const buildingIssues = issues.filter((i) => i.building === user?.building);
  const submitted = buildingIssues.filter((i) => i.status === "submitted").length;
  const inProgress = buildingIssues.filter((i) => i.status === "inprogress").length;
  const resolved = buildingIssues.filter((i) => i.status === "resolved").length;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Building Summary */}
      <div className="px-4 md:px-8 py-4 md:py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-4 md:mb-6">
          <Building2 className="h-4 w-4 md:h-5 md:w-5 text-primary" />
          <span className="text-sm md:text-base font-semibold text-foreground">{user?.building} — Issues Overview</span>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6 md:mb-8">
          {[
            { label: "Submitted", value: submitted, className: "status-submitted" },
            { label: "In Progress", value: inProgress, className: "status-inprogress" },
            { label: "Resolved", value: resolved, className: "status-resolved" },
          ].map(({ label, value, className }) => (
            <div key={label} className="bg-card card-shadow rounded-xl p-3 md:p-6 text-center">
              <p className={`text-2xl md:text-4xl font-bold ${className}`}>{value}</p>
              <p className="text-[10px] md:text-sm font-medium text-muted-foreground mt-0.5 md:mt-2">{label}</p>
            </div>
          ))}
        </div>

        {/* Issues List */}
        {buildingIssues.length === 0 ? (
          <div className="text-center py-16 md:py-24">
            <TrendingUp className="h-10 w-10 md:h-14 md:w-14 text-muted-foreground mx-auto mb-3 md:mb-4 opacity-40" />
            <p className="text-muted-foreground text-sm md:text-base font-medium">No issues reported yet</p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              Tap the + button to report a problem
            </p>
          </div>
        ) : (
          <div className="space-y-3 md:space-y-4">
            <h2 className="text-sm md:text-lg font-semibold text-foreground">Recent Reports in {user?.building}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {buildingIssues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FAB */}
      <button
        onClick={() => setCurrentView("report")}
        className="fixed bottom-20 right-4 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center fab-shadow hover:opacity-90 active:scale-95 transition-all"
      >
        <Plus className="h-7 w-7 stroke-[2.5]" />
      </button>
    </div>
  );
}
