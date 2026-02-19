import { useApp } from "@/context/AppContext";
import { IssueCard } from "@/components/IssueCard";
import { Plus, FileText } from "lucide-react";

export function MyIssuesPage() {
  const { issues, user, setCurrentView } = useApp();

  const myIssues = issues.filter((i) => i.studentId === user?.studentId);
  const active = myIssues.filter((i) => i.status !== "resolved");
  const resolved = myIssues.filter((i) => i.status === "resolved");

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-8">
        {myIssues.length === 0 ? (
          <div className="text-center py-20 md:py-32">
            <FileText className="h-12 w-12 md:h-16 md:w-16 text-muted-foreground mx-auto mb-3 md:mb-4 opacity-40" />
            <p className="font-semibold text-sm md:text-base text-muted-foreground">No issues submitted yet</p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">Report a problem using the + button</p>
          </div>
        ) : (
          <>
            {active.length > 0 && (
              <div className="mb-6 md:mb-8">
                <h2 className="text-sm md:text-lg font-semibold text-foreground mb-4 md:mb-6">
                  Active ({active.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {active.map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
                  ))}
                </div>
              </div>
            )}

            {resolved.length > 0 && (
              <div>
                <h2 className="text-sm md:text-lg font-semibold text-muted-foreground mb-4 md:mb-6">
                  Resolved ({resolved.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 opacity-70">
                  {resolved.map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
                  ))}
                </div>
              </div>
            )}
          </>
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
