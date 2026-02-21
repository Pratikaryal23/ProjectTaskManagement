"use client"

import { useRouter } from "next/navigation"
import {
  FolderKanban,
  Shield,
  User,
  ArrowRight,
  BarChart3,
  ListTodo,
  Users,
  CheckCircle2,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useRole } from "@/lib/role-context"

export default function HomePage() {
  const router = useRouter()
  const { setRole } = useRole()

  function handleSelect(role: "admin" | "employee") {
    setRole(role)
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-10">
        {/* Brand */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg">
            <FolderKanban className="h-7 w-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              TaskFlow
            </h1>
            <p className="mt-2 text-pretty text-muted-foreground">
              Select your role to access the project management dashboard
            </p>
          </div>
        </div>

        {/* Role selection */}
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Admin card */}
          <Card
            className="group cursor-pointer border-border/60 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            onClick={() => handleSelect("admin")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleSelect("admin")
            }}
          >
            <CardContent className="flex flex-col gap-5 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-card-foreground">Admin</h2>
                  <p className="text-xs text-muted-foreground">
                    Full access dashboard
                  </p>
                </div>
              </div>

              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <BarChart3 className="h-3.5 w-3.5 text-primary" />
                  Statistics overview
                </li>
                <li className="flex items-center gap-2">
                  <ListTodo className="h-3.5 w-3.5 text-primary" />
                  Task management
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 text-primary" />
                  Employee management
                </li>
              </ul>

              <div className="flex items-center gap-1.5 text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
                Enter as Admin
                <ArrowRight className="h-4 w-4" />
              </div>
            </CardContent>
          </Card>

          {/* Employee card */}
          <Card
            className="group cursor-pointer border-border/60 shadow-sm transition-all hover:border-status-completed/30 hover:shadow-md"
            onClick={() => handleSelect("employee")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleSelect("employee")
            }}
          >
            <CardContent className="flex flex-col gap-5 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-status-completed/20">
                  <User className="h-5 w-5 text-status-completed-foreground" />
                </div>
                <div>
                  <h2 className="font-semibold text-card-foreground">
                    Employee
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Personal task view
                  </p>
                </div>
              </div>

              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <ListTodo className="h-3.5 w-3.5 text-status-completed-foreground" />
                  Personal task board
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-status-completed-foreground" />
                  Progress tracking
                </li>
                <li className="flex items-center gap-2">
                  <BarChart3 className="h-3.5 w-3.5 text-status-completed-foreground" />
                  Personal statistics
                </li>
              </ul>

              <div className="flex items-center gap-1.5 text-sm font-medium text-status-completed-foreground transition-transform group-hover:translate-x-1">
                Enter as Employee
                <ArrowRight className="h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          You can switch roles anytime from the sidebar
        </p>
      </div>
    </div>
  )
}
