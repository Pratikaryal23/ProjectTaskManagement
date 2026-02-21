import { cn } from "@/lib/utils"
import type { TaskPriority } from "@/lib/data"

const priorityConfig: Record<
  TaskPriority,
  { label: string; className: string }
> = {
  low: {
    label: "Low",
    className: "text-muted-foreground",
  },
  medium: {
    label: "Medium",
    className: "text-status-progress-foreground",
  },
  high: {
    label: "High",
    className: "text-destructive",
  },
}

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  const config = priorityConfig[priority]
  return (
    <span className={cn("inline-flex items-center gap-1 text-xs font-medium", config.className)}>
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          priority === "low" && "bg-muted-foreground",
          priority === "medium" && "bg-status-progress-foreground",
          priority === "high" && "bg-destructive"
        )}
      />
      {config.label}
    </span>
  )
}
