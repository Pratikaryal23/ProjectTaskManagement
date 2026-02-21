"use client"

import { useState } from "react"
import { Calendar, Play, CheckCircle2 } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { PriorityBadge } from "@/components/priority-badge"
import { AnimatedProgress } from "@/components/animated-progress"
import { UpdateProgressModal } from "./update-progress-modal"
import type { Task } from "@/lib/data"

interface EmployeeTaskCardProps {
  task: Task
}

export function EmployeeTaskCard({ task: initialTask }: EmployeeTaskCardProps) {
  const [task, setTask] = useState(initialTask)
  const [modalOpen, setModalOpen] = useState(false)

  function handleStart() {
    setTask({
      ...task,
      status: "in-progress",
      progress: task.progress > 0 ? task.progress : 5,
    })
  }

  function handleComplete() {
    setTask({ ...task, status: "completed", progress: 100 })
  }

  function handleProgressUpdate(newProgress: number) {
    setTask({
      ...task,
      progress: newProgress,
      status: newProgress >= 100 ? "completed" : "in-progress",
    })
  }

  return (
    <>
      <Card className="group border-border/60 shadow-sm transition-shadow hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <CardTitle className="text-base font-semibold text-card-foreground">
                {task.title}
              </CardTitle>
              <CardDescription className="mt-1 line-clamp-2">
                {task.description}
              </CardDescription>
            </div>
            <StatusBadge status={task.status} />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <AnimatedProgress value={task.progress} showLabel size="md" />

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <PriorityBadge priority={task.priority} />
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>
                {new Date(task.dueDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 border-t border-border/60 pt-3">
            {task.status === "pending" && (
              <Button
                size="sm"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleStart}
              >
                <Play className="mr-1.5 h-3.5 w-3.5" />
                Start Task
              </Button>
            )}
            {task.status === "in-progress" && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => setModalOpen(true)}
                >
                  Update Progress
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-status-completed text-status-completed-foreground hover:bg-status-completed/80"
                  onClick={handleComplete}
                >
                  <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                  Complete
                </Button>
              </>
            )}
            {task.status === "completed" && (
              <div className="flex w-full items-center justify-center gap-1.5 py-1 text-sm font-medium text-status-completed-foreground">
                <CheckCircle2 className="h-4 w-4" />
                Completed
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <UpdateProgressModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        currentProgress={task.progress}
        taskTitle={task.title}
        onSave={handleProgressUpdate}
      />
    </>
  )
}
