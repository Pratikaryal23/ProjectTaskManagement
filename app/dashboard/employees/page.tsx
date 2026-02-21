"use client"

import { Mail, Briefcase } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AnimatedProgress } from "@/components/animated-progress"
import { employees } from "@/lib/data"

export default function EmployeesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Employees
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your team members and their task assignments
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {employees.map((emp, i) => {
          const completionRate = emp.tasksAssigned
            ? Math.round((emp.tasksCompleted / emp.tasksAssigned) * 100)
            : 0

          return (
            <Card
              key={emp.id}
              className="animate-fade-in-up border-border/60 shadow-sm transition-shadow hover:shadow-md"
              style={{
                animationDelay: `${i * 80}ms`,
                animationFillMode: "backwards",
              }}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-sm font-bold text-primary">
                      {emp.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-card-foreground">
                      {emp.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{emp.role}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-3.5 w-3.5" />
                    <span>{emp.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="h-3.5 w-3.5" />
                    <span>{emp.department}</span>
                  </div>
                </div>

                <div className="mt-4 rounded-lg bg-muted/50 p-3">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Task Completion</span>
                    <span className="font-semibold text-card-foreground">
                      {emp.tasksCompleted}/{emp.tasksAssigned}
                    </span>
                  </div>
                  <AnimatedProgress value={completionRate} size="sm" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
