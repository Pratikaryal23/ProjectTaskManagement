"use client"

import { StatCards } from "./stat-cards"
import { RecentTasksTable } from "./recent-tasks-table"
import { ProjectBreakdown } from "./project-breakdown"

export function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of all projects and team activity
        </p>
      </div>

      <StatCards />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentTasksTable />
        </div>
        <div>
          <ProjectBreakdown />
        </div>
      </div>
    </div>
  )
}
