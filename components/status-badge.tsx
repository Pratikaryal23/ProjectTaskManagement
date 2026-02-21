import { cn } from "@/lib/utils"
import type { TaskStatus } from "@/lib/data"

const statusConfig: Record<
  TaskStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending",
    className:
      "bg-status-pending/20 text-status-pending-foreground border-status-pending/30",
  },
  "in-progress": {
    label: "In Progress",
    className:
      "bg-status-progress/20 text-status-progress-foreground border-status-progress/30",
  },
  completed: {
    label: "Completed",
    className:
      "bg-status-completed/20 text-status-completed-foreground border-status-completed/30",
  },
}

export function StatusBadge({ status }: { status: TaskStatus }) {
  const config = statusConfig[status]
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        config.className
      )}
    >
      {config.label}
    </span>
  )
}
