"use client"

import {
  ListTodo,
  CheckCircle2,
  Clock,
  AlertCircle,
  Users,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { stats } from "@/lib/data"

const cards = [
  {
    label: "Total Tasks",
    value: stats.totalTasks,
    icon: ListTodo,
    accent: "bg-primary/10 text-primary",
  },
  {
    label: "Completed",
    value: stats.completedTasks,
    icon: CheckCircle2,
    accent: "bg-status-completed/20 text-status-completed-foreground",
  },
  {
    label: "In Progress",
    value: stats.inProgressTasks,
    icon: Clock,
    accent: "bg-status-progress/20 text-status-progress-foreground",
  },
  {
    label: "Pending",
    value: stats.pendingTasks,
    icon: AlertCircle,
    accent: "bg-status-pending/20 text-status-pending-foreground",
  },
  {
    label: "Employees",
    value: stats.totalEmployees,
    icon: Users,
    accent: "bg-primary/10 text-primary",
  },
  {
    label: "Avg. Progress",
    value: `${stats.overallProgress}%`,
    icon: TrendingUp,
    accent: "bg-status-completed/20 text-status-completed-foreground",
  },
]

export function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, i) => (
        <Card
          key={card.label}
          className="animate-fade-in-up border-border/60 shadow-sm"
          style={{ animationDelay: `${i * 80}ms`, animationFillMode: "backwards" }}
        >
          <CardContent className="flex items-center gap-4 p-5">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${card.accent}`}
            >
              <card.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {card.label}
              </p>
              <p className="animate-count-up text-2xl font-bold tracking-tight text-card-foreground">
                {card.value}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
