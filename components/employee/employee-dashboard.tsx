"use client"

import { CheckCircle2, Clock, AlertCircle, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { tasks } from "@/lib/data"
import { EmployeeTaskCard } from "./employee-task-card"

export function EmployeeDashboard() {
  // Simulating Alex Rivera's tasks
  const myTasks = tasks.filter((t) => t.assignee.id === "emp-1")
  const completed = myTasks.filter((t) => t.status === "completed").length
  const inProgress = myTasks.filter((t) => t.status === "in-progress").length
  const pending = myTasks.filter((t) => t.status === "pending").length
  const avgProgress = myTasks.length
    ? Math.round(myTasks.reduce((a, t) => a + t.progress, 0) / myTasks.length)
    : 0

  const summaryCards = [
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle2,
      accent: "bg-status-completed/20 text-status-completed-foreground",
    },
    {
      label: "In Progress",
      value: inProgress,
      icon: Clock,
      accent: "bg-status-progress/20 text-status-progress-foreground",
    },
    {
      label: "Pending",
      value: pending,
      icon: AlertCircle,
      accent: "bg-status-pending/20 text-status-pending-foreground",
    },
    {
      label: "Avg. Progress",
      value: `${avgProgress}%`,
      icon: TrendingUp,
      accent: "bg-primary/10 text-primary",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Welcome back, Alex
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {"Here's"} an overview of your assignments
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {summaryCards.map((card, i) => (
          <Card
            key={card.label}
            className="animate-fade-in-up border-border/60 shadow-sm"
            style={{
              animationDelay: `${i * 80}ms`,
              animationFillMode: "backwards",
            }}
          >
            <CardContent className="flex items-center gap-3 p-4">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${card.accent}`}
              >
                <card.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  {card.label}
                </p>
                <p className="text-xl font-bold tracking-tight text-card-foreground">
                  {card.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Your Active Tasks
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {myTasks
            .filter((t) => t.status !== "completed")
            .map((task) => (
              <EmployeeTaskCard key={task.id} task={task} />
            ))}
        </div>
      </div>
    </div>
  )
}
