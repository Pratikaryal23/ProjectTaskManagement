"use client"

import { use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  Calendar,
  User,
  FolderOpen,
  Tag,
  Clock,
  MessageSquare,
  CheckCircle2,
  Play,
  PencilLine,
  Plus,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { StatusBadge } from "@/components/status-badge"
import { PriorityBadge } from "@/components/priority-badge"
import { AnimatedProgress } from "@/components/animated-progress"
import { tasks } from "@/lib/data"

function getActivityIcon(action: string) {
  if (action.includes("completed")) return CheckCircle2
  if (action.includes("started")) return Play
  if (action.includes("progress")) return PencilLine
  if (action.includes("comment")) return MessageSquare
  if (action.includes("created")) return Plus
  return Clock
}

function getActivityColor(action: string) {
  if (action.includes("completed")) return "bg-status-completed/20 text-status-completed-foreground"
  if (action.includes("started")) return "bg-status-progress/20 text-status-progress-foreground"
  if (action.includes("progress")) return "bg-primary/10 text-primary"
  if (action.includes("comment")) return "bg-status-pending/20 text-status-pending-foreground"
  return "bg-muted text-muted-foreground"
}

export default function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const task = tasks.find((t) => t.id === id)

  if (!task) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Back button & header */}
      <div className="flex items-start gap-4">
        <Button variant="ghost" size="icon" asChild className="mt-0.5 shrink-0">
          <Link href="/dashboard/tasks">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to tasks</span>
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {task.title}
            </h1>
            <StatusBadge status={task.status} />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {task.project}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Description */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-card-foreground">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">
                {task.description}
              </p>
            </CardContent>
          </Card>

          {/* Progress tracking */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-card-foreground">Progress Tracking</CardTitle>
              <CardDescription>Current task completion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-card-foreground">
                  Overall Progress
                </span>
                <span className="text-2xl font-bold tabular-nums text-primary">
                  {task.progress}%
                </span>
              </div>
              <AnimatedProgress value={task.progress} size="lg" />
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>Started {task.createdAt}</span>
                <span>Due {task.dueDate}</span>
              </div>
            </CardContent>
          </Card>

          {/* Activity timeline */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-card-foreground">Activity Timeline</CardTitle>
              <CardDescription>
                Recent activity on this task
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative flex flex-col gap-0">
                {task.activity.map((item, index) => {
                  const Icon = getActivityIcon(item.action)
                  const colorClass = getActivityColor(item.action)
                  const isLast = index === task.activity.length - 1

                  return (
                    <div
                      key={item.id}
                      className="animate-fade-in-up relative flex gap-4 pb-6"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: "backwards",
                      }}
                    >
                      {/* Timeline line */}
                      {!isLast && (
                        <div className="absolute left-[17px] top-10 h-[calc(100%-24px)] w-px bg-border" />
                      )}

                      {/* Icon */}
                      <div
                        className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${colorClass}`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-1">
                        <p className="text-sm text-card-foreground">
                          <span className="font-semibold">{item.user}</span>{" "}
                          <span className="text-muted-foreground">
                            {item.action}
                          </span>
                        </p>
                        {item.detail && (
                          <div className="mt-2 rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                            {item.detail}
                          </div>
                        )}
                        <p className="mt-1 text-xs text-muted-foreground">
                          {item.timestamp}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar details */}
        <div className="flex flex-col gap-6">
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-card-foreground">Details</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Assignee</p>
                  <div className="mt-0.5 flex items-center gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="bg-primary/10 text-[8px] font-semibold text-primary">
                        {task.assignee.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-card-foreground">
                      {task.assignee.name}
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Due Date</p>
                  <p className="mt-0.5 text-sm font-medium text-card-foreground">
                    {new Date(task.dueDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                  <FolderOpen className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Project</p>
                  <p className="mt-0.5 text-sm font-medium text-card-foreground">
                    {task.project}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Priority</p>
                  <div className="mt-0.5">
                    <PriorityBadge priority={task.priority} />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <p className="mb-2 text-xs text-muted-foreground">Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {task.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
