"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { AnimatedProgress } from "@/components/animated-progress"
import { tasks, employees, stats } from "@/lib/data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const statusData = [
  { name: "Pending", value: stats.pendingTasks, color: "oklch(0.80 0.15 85)" },
  { name: "In Progress", value: stats.inProgressTasks, color: "oklch(0.55 0.18 250)" },
  { name: "Completed", value: stats.completedTasks, color: "oklch(0.78 0.15 155)" },
]

const employeeData = employees.map((emp) => ({
  name: emp.name.split(" ")[0],
  assigned: emp.tasksAssigned,
  completed: emp.tasksCompleted,
}))

const projectData = (() => {
  const projectMap = new Map<string, { total: number; completed: number }>()
  tasks.forEach((t) => {
    const existing = projectMap.get(t.project) || { total: 0, completed: 0 }
    existing.total++
    if (t.status === "completed") existing.completed++
    projectMap.set(t.project, existing)
  })
  return Array.from(projectMap.entries()).map(([name, data]) => ({
    name: name.length > 15 ? name.slice(0, 15) + "..." : name,
    total: data.total,
    completed: data.completed,
  }))
})()

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Reports
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Analytics and insights about your projects and team performance
        </p>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-border/60 shadow-sm">
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground">
              Completion Rate
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-card-foreground">
              {Math.round((stats.completedTasks / stats.totalTasks) * 100)}%
            </p>
            <AnimatedProgress
              value={Math.round(
                (stats.completedTasks / stats.totalTasks) * 100
              )}
              size="sm"
              className="mt-3"
            />
          </CardContent>
        </Card>
        <Card className="border-border/60 shadow-sm">
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground">
              Average Progress
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-card-foreground">
              {stats.overallProgress}%
            </p>
            <AnimatedProgress
              value={stats.overallProgress}
              size="sm"
              className="mt-3"
            />
          </CardContent>
        </Card>
        <Card className="border-border/60 shadow-sm">
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground">
              Team Utilization
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-card-foreground">
              {employees.length} members
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {tasks.filter((t) => t.status !== "completed").length} active
              tasks
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Task Status Distribution */}
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-card-foreground">
              Task Status Distribution
            </CardTitle>
            <CardDescription>
              Breakdown of tasks by current status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid var(--border)",
                      backgroundColor: "var(--card)",
                      color: "var(--card-foreground)",
                      fontSize: "13px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6">
              {statusData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {entry.name} ({entry.value})
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Employee Performance */}
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-card-foreground">
              Employee Performance
            </CardTitle>
            <CardDescription>
              Tasks assigned vs completed per team member
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={employeeData} barGap={4}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                  axisLine={{ stroke: "var(--border)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--card)",
                    color: "var(--card-foreground)",
                    fontSize: "13px",
                  }}
                />
                <Bar
                  dataKey="assigned"
                  fill="oklch(0.55 0.18 250 / 0.3)"
                  radius={[4, 4, 0, 0]}
                  name="Assigned"
                />
                <Bar
                  dataKey="completed"
                  fill="oklch(0.55 0.18 250)"
                  radius={[4, 4, 0, 0]}
                  name="Completed"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Project Progress */}
        <Card className="border-border/60 shadow-sm lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-card-foreground">
              Project Progress
            </CardTitle>
            <CardDescription>
              Tasks completed per project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={projectData} barGap={4}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                  axisLine={{ stroke: "var(--border)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--card)",
                    color: "var(--card-foreground)",
                    fontSize: "13px",
                  }}
                />
                <Bar
                  dataKey="total"
                  fill="oklch(0.55 0.18 250 / 0.3)"
                  radius={[4, 4, 0, 0]}
                  name="Total"
                />
                <Bar
                  dataKey="completed"
                  fill="oklch(0.78 0.15 155)"
                  radius={[4, 4, 0, 0]}
                  name="Completed"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
