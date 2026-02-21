"use client"

import { useState, useMemo } from "react"
import { tasks } from "@/lib/data"
import { EmployeeTaskCard } from "@/components/employee/employee-task-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MyTasksPage() {
  const myTasks = tasks.filter((t) => t.assignee.id === "emp-1")
  const [tab, setTab] = useState("all")

  const filtered = useMemo(() => {
    if (tab === "all") return myTasks
    return myTasks.filter((t) => t.status === tab)
  }, [tab, myTasks])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          My Tasks
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          View and manage all your assigned tasks
        </p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">
            All ({myTasks.length})
          </TabsTrigger>
          <TabsTrigger value="in-progress">
            In Progress (
            {myTasks.filter((t) => t.status === "in-progress").length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending ({myTasks.filter((t) => t.status === "pending").length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({myTasks.filter((t) => t.status === "completed").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-6">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-border/60 bg-card py-16">
              <p className="text-muted-foreground">No tasks in this category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {filtered.map((task) => (
                <EmployeeTaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
