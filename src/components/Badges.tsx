import { Severity, IssueStatus, Category, CATEGORIES } from "@/data/mockData";

interface SeverityBadgeProps {
  severity: Severity;
  showLabel?: boolean;
}

const SEVERITY_CONFIG: Record<Severity, { label: string; className: string }> = {
  low: { label: "Low", className: "severity-low" },
  medium: { label: "Medium", className: "severity-medium" },
  high: { label: "High", className: "severity-high" },
};

export function SeverityBadge({ severity, showLabel = true }: SeverityBadgeProps) {
  const config = SEVERITY_CONFIG[severity];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${config.className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {showLabel && config.label}
    </span>
  );
}

interface StatusBadgeProps {
  status: IssueStatus;
}

const STATUS_CONFIG: Record<IssueStatus, { label: string; className: string }> = {
  submitted: { label: "Submitted", className: "status-submitted" },
  inprogress: { label: "In Progress", className: "status-inprogress" },
  resolved: { label: "Resolved", className: "status-resolved" },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}

interface CategoryBadgeProps {
  category: Category;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
      {CATEGORIES[category]}
    </span>
  );
}
