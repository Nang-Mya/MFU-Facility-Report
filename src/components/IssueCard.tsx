import { Issue, CATEGORIES } from "@/data/mockData";
import { SeverityBadge, StatusBadge } from "./Badges";
import { MapPin, Clock, ImageIcon } from "lucide-react";

interface IssueCardProps {
  issue: Issue;
  onClick?: () => void;
  showActions?: boolean;
  actionSlot?: React.ReactNode;
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

export function IssueCard({ issue, onClick, actionSlot }: IssueCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-card card-shadow rounded-xl overflow-hidden ${onClick ? "cursor-pointer active:scale-[0.99] transition-transform" : ""}`}
    >
      {issue.photoUrl && (
        <div className="h-36 md:h-48 w-full overflow-hidden bg-muted">
          <img
            src={issue.photoUrl}
            alt="Issue photo"
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between gap-2 mb-2 md:mb-3">
          <div className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground">
            <MapPin className="h-3 w-3 md:h-4 md:w-4 shrink-0" />
            <span className="font-medium">{issue.building}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <SeverityBadge severity={issue.severity} />
            <StatusBadge status={issue.status} />
          </div>
        </div>

        <p className="text-sm md:text-base font-medium text-foreground line-clamp-2 mb-2 md:mb-3">
          {issue.description}
        </p>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs md:text-sm text-muted-foreground">
              {CATEGORIES[issue.category]}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
            {!issue.photoUrl && <ImageIcon className="h-3 w-3 opacity-40" />}
            <Clock className="h-3 w-3 md:h-4 md:w-4" />
            <span>{timeAgo(issue.createdAt)}</span>
          </div>
        </div>

        <div className="mt-2 md:mt-3">
          <span className="text-xs md:text-sm font-mono text-muted-foreground">{issue.id}</span>
        </div>

        {actionSlot && <div className="mt-4 md:mt-6">{actionSlot}</div>}
      </div>
    </div>
  );
}
