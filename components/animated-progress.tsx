"use client"

import { cn } from "@/lib/utils"

interface AnimatedProgressProps {
  value: number
  className?: string
  barClassName?: string
  showLabel?: boolean
  size?: "sm" | "md" | "lg"
}

export function AnimatedProgress({
  value,
  className,
  barClassName,
  showLabel = false,
  size = "md",
}: AnimatedProgressProps) {
  const height = size === "sm" ? "h-1.5" : size === "md" ? "h-2" : "h-3"

  const barColor =
    value >= 100
      ? "bg-status-completed"
      : value >= 50
        ? "bg-primary"
        : value >= 25
          ? "bg-status-progress"
          : "bg-status-pending"

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("flex-1 overflow-hidden rounded-full bg-muted", height)}>
        <div
          className={cn(
            "animate-progress-fill rounded-full transition-all duration-500",
            height,
            barColor,
            barClassName
          )}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-muted-foreground tabular-nums">
          {value}%
        </span>
      )}
    </div>
  )
}
