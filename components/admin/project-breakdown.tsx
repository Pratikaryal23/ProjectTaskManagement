"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { AnimatedProgress } from "@/components/animated-progress"
import { tasks } from "@/lib/data"

export function ProjectBreakdown() {
  const projectMap = new Map<
    string,
    { total: number; completed: number; progress: number }
  >()

  tasks.forEach((t) => {
    const existing = projectMap.get(t.project) || {
      total: 0,
      completed: 0,
      progress: 0,
    }
    existing.total++
    if (t.status === "completed") existing.completed++
    existing.progress += t.progress
    projectMap.set(t.project, existing)
  })

  const projects = Array.from(projectMap.entries()).map(([name, data]) => ({
    name,
    total: data.total,
    completed: data.completed,
    progress: Math.round(data.progress / data.total),
  }))

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-card-foreground">Projects</CardTitle>
        <CardDescription>Task progress by project</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-5">
          {projects.map((project) => (
            <div key={project.name}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-card-foreground">
                  {project.name}
                </span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {project.completed}/{project.total} tasks
                </span>
              </div>
              <AnimatedProgress value={project.progress} size="sm" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
