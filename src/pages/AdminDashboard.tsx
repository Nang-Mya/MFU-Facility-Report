import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Issue, IssueStatus, CATEGORIES, DORM_BUILDINGS } from "@/data/mockData";
import { SeverityBadge, StatusBadge, CategoryBadge } from "@/components/Badges";
import { CheckCircle2, MapPin, Clock, ChevronRight, X, ImageIcon, Filter } from "lucide-react";

const SEVERITY_ORDER = { high: 0, medium: 1, low: 2 };

function sortIssues(issues: Issue[]) {
  return [...issues].sort((a, b) => {
    const sv = SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity];
    if (sv !== 0) return sv;
    return a.createdAt.getTime() - b.createdAt.getTime();
  });
}

type SortBy = "severity" | "date";

function applySorting(issues: Issue[], sortBy: SortBy): Issue[] {
  const sorted = [...issues];
  if (sortBy === "severity") {
    sorted.sort((a, b) => {
      const sv = SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity];
      if (sv !== 0) return sv;
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  } else {
    sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  return sorted;
}

function timeAgo(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function IssueDetailModal({ issue, onClose, onStatusChange }: {
  issue: Issue;
  onClose: () => void;
  onStatusChange: (id: string, status: IssueStatus) => void;
}) {
  const nextStatus: Record<IssueStatus, IssueStatus | null> = {
    submitted: "inprogress",
    inprogress: "resolved",
    resolved: null,
  };

  const nextLabel: Record<IssueStatus, string> = {
    submitted: "Mark In Progress",
    inprogress: "Mark Resolved ✔️",
    resolved: "Resolved",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-foreground/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full md:max-w-2xl bg-card rounded-t-2xl md:rounded-2xl p-5 md:p-8 pb-10 md:pb-8 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <span className="font-mono text-sm md:text-base font-bold text-primary">{issue.id}</span>
          <button onClick={onClose} className="p-1 text-muted-foreground hover:bg-muted rounded-lg">
            <X className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </div>

        {issue.photoUrl && (
          <img src={issue.photoUrl} alt="" className="w-full h-40 md:h-60 object-cover rounded-xl mb-4 md:mb-6" />
        )}

        <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
          <SeverityBadge severity={issue.severity} />
          <StatusBadge status={issue.status} />
          <CategoryBadge category={issue.category} />
        </div>

        <div className="flex items-center gap-1.5 text-sm md:text-base text-muted-foreground mb-3 md:mb-4 flex-wrap">
          <MapPin className="h-4 w-4 md:h-5 md:w-5" />
          <span className="font-semibold">{issue.building}</span>
          <span>·</span>
          <Clock className="h-4 w-4 md:h-5 md:w-5" />
          <span>{timeAgo(issue.createdAt)}</span>
        </div>

        <p className="text-sm md:text-base text-foreground leading-relaxed mb-4 md:mb-6">{issue.description}</p>

        <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6">Student ID: {issue.studentId}</p>

        {issue.status !== "resolved" && nextStatus[issue.status] && (
          <button
            onClick={() => {
              onStatusChange(issue.id, nextStatus[issue.status]!);
              onClose();
            }}
            className={`w-full rounded-xl py-3 md:py-4 text-sm md:text-base font-bold transition-all hover:opacity-90 active:scale-[0.98] ${
              issue.status === "inprogress"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground border border-border"
            }`}
          >
            {nextLabel[issue.status]}
          </button>
        )}

        {issue.status === "resolved" && (
          <div className="flex items-center justify-center gap-2 py-3 md:py-4 rounded-xl bg-secondary text-secondary-foreground">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-sm md:text-base font-semibold">Issue Resolved</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const { issues, updateIssueStatus } = useApp();
  const [selected, setSelected] = useState<Issue | null>(null);
  const [selectedDorm, setSelectedDorm] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>("severity");
  const [showDormFilter, setShowDormFilter] = useState(false);

  const active = sortIssues(issues.filter((i) => i.status !== "resolved"));
  const resolved = issues.filter((i) => i.status === "resolved");

  // Apply dormitory filter to active issues
  const filteredActive = selectedDorm 
    ? active.filter((i) => i.building === selectedDorm)
    : active;

  // Apply sorting
  const sortedActive = applySorting(filteredActive, sortBy);

  const stats = {
    high: issues.filter((i) => i.severity === "high" && i.status !== "resolved").length,
    total: active.length,
    resolved: resolved.length,
  };

  const sortLabel = sortBy === "severity" ? "High → Low" : "Latest → Oldest";

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-4 mb-6 md:mb-8">
          <div className="bg-card card-shadow rounded-xl p-3 md:p-6 text-center">
            <p className="text-2xl md:text-4xl font-bold severity-high">{stats.high}</p>
            <p className="text-[10px] md:text-sm font-medium text-muted-foreground mt-0.5 md:mt-2">High Priority</p>
          </div>
          <div className="bg-card card-shadow rounded-xl p-3 md:p-6 text-center">
            <p className="text-2xl md:text-4xl font-bold text-foreground">{stats.total}</p>
            <p className="text-[10px] md:text-sm font-medium text-muted-foreground mt-0.5 md:mt-2">Active Issues</p>
          </div>
          <div className="bg-card card-shadow rounded-xl p-3 md:p-6 text-center">
            <p className="text-2xl md:text-4xl font-bold severity-low">{stats.resolved}</p>
            <p className="text-[10px] md:text-sm font-medium text-muted-foreground mt-0.5 md:mt-2">Resolved</p>
          </div>
        </div>

        {/* Filter & Sort Controls */}
        {active.length > 0 && (
          <div className="mb-6 md:mb-8 space-y-3">
            <div className="flex flex-col md:flex-row gap-2 md:gap-3">
              {/* Dormitory Filter Button */}
              <div className="relative flex-1">
                <button
                  onClick={() => setShowDormFilter(!showDormFilter)}
                  className="w-full flex items-center justify-between gap-2 bg-card card-shadow rounded-xl px-4 py-2.5 md:py-3 text-sm md:text-base font-medium text-foreground hover:bg-muted transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Filter className="h-4 w-4" />
                    {selectedDorm ? selectedDorm : "All Dorms"}
                  </span>
                  <span className="text-xs md:text-sm text-muted-foreground">▼</span>
                </button>

                {/* Dormitory Dropdown Menu */}
                {showDormFilter && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-card card-shadow rounded-xl z-40 max-h-48 md:max-h-96 overflow-y-auto">
                    <button
                      onClick={() => {
                        setSelectedDorm(null);
                        setShowDormFilter(false);
                      }}
                      className={`w-full text-left px-4 py-2 md:py-2.5 text-sm md:text-base hover:bg-muted transition-colors ${
                        !selectedDorm ? "bg-muted font-semibold" : ""
                      }`}
                    >
                      All Dorms
                    </button>
                    {DORM_BUILDINGS.map((building) => (
                      <button
                        key={building}
                        onClick={() => {
                          setSelectedDorm(building);
                          setShowDormFilter(false);
                        }}
                        className={`w-full text-left px-4 py-2 md:py-2.5 text-sm md:text-base hover:bg-muted transition-colors ${
                          selectedDorm === building ? "bg-muted font-semibold" : ""
                        }`}
                      >
                        {building}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Sort Toggle Button */}
              <button
                onClick={() => setSortBy(sortBy === "severity" ? "date" : "severity")}
                className="flex items-center justify-center gap-1.5 bg-card card-shadow rounded-xl px-4 py-2.5 md:py-3 text-sm md:text-base font-medium text-foreground hover:bg-muted transition-colors whitespace-nowrap"
              >
                <Clock className="h-4 w-4" />
                <span className="hidden sm:inline">{sortLabel}</span>
                <span className="sm:hidden">Sort</span>
              </button>
            </div>

            {selectedDorm && (
              <div className="text-xs md:text-sm text-muted-foreground px-1">
                Showing {sortedActive.length} issue{sortedActive.length !== 1 ? "s" : ""} in {selectedDorm}
              </div>
            )}
          </div>
        )}

        {/* Active Issues */}
        {sortedActive.length > 0 && (
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-sm md:text-lg font-semibold text-foreground">Active Issues</h2>
              <span className="text-xs md:text-sm text-muted-foreground">Sorted: {sortLabel}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {sortedActive.map((issue) => (
                <div
                  key={issue.id}
                  onClick={() => setSelected(issue)}
                  className="bg-card card-shadow rounded-xl overflow-hidden cursor-pointer active:scale-[0.99] transition-transform"
                >
                  <div className="flex flex-col md:flex-row gap-3 p-4 md:p-5">
                    {issue.photoUrl ? (
                      <img
                        src={issue.photoUrl}
                        alt=""
                        className="w-full md:w-20 h-32 md:h-20 rounded-lg object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-full md:w-20 h-32 md:h-20 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <ImageIcon className="h-8 w-8 text-muted-foreground opacity-40" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                        <SeverityBadge severity={issue.severity} />
                        <StatusBadge status={issue.status} />
                      </div>
                      <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground mb-2">
                        <MapPin className="h-3 w-3" />
                        <span className="font-semibold">{issue.building}</span>
                      </div>
                      <p className="text-xs md:text-sm text-foreground line-clamp-3 md:line-clamp-2">{issue.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 self-start md:self-center hidden md:block" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Issues in Filter */}
        {sortedActive.length === 0 && active.length > 0 && (
          <div className="mb-6 md:mb-8 text-center py-12 md:py-16">
            <Filter className="h-10 md:h-12 w-10 md:w-12 text-muted-foreground mx-auto mb-3 opacity-40" />
            <p className="text-sm md:text-base font-medium text-muted-foreground">No issues in {selectedDorm}</p>
            <button
              onClick={() => setSelectedDorm(null)}
              className="text-xs md:text-sm text-primary font-semibold mt-3 hover:underline"
            >
              Clear filter
            </button>
          </div>
        )}

        {/* Resolved */}
        {resolved.length > 0 && (
          <div>
            <h2 className="text-sm md:text-lg font-semibold text-muted-foreground mb-4 md:mb-6 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5" />
              Completed ({resolved.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 opacity-60">
              {resolved.map((issue) => (
                <div
                  key={issue.id}
                  onClick={() => setSelected(issue)}
                  className="bg-card card-shadow rounded-xl cursor-pointer"
                >
                  <div className="flex gap-3 p-3 md:p-4">
                    {issue.photoUrl ? (
                      <img src={issue.photoUrl} alt="" className="w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover shrink-0" />
                    ) : (
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                        <span className="text-xs font-mono text-muted-foreground">{issue.id}</span>
                        <StatusBadge status={issue.status} />
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">{issue.building} · {CATEGORIES[issue.category]}</div>
                      <p className="text-xs md:text-sm text-foreground line-clamp-1 mt-0.5">{issue.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {issues.length === 0 && (
          <div className="text-center py-20 md:py-32">
            <CheckCircle2 className="h-12 w-12 md:h-16 md:w-16 text-muted-foreground mx-auto mb-3 md:mb-4 opacity-40" />
            <p className="font-semibold text-sm md:text-base text-muted-foreground">No issues reported yet</p>
          </div>
        )}
      </div>

      {selected && (
        <IssueDetailModal
          issue={selected}
          onClose={() => setSelected(null)}
          onStatusChange={updateIssueStatus}
        />
      )}
    </div>
  );
}
