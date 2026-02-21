"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  ListTodo,
  Users,
  BarChart3,
  FolderKanban,
  ChevronLeft,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useRole } from "@/lib/role-context"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const adminLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/tasks", label: "All Tasks", icon: ListTodo },
  { href: "/dashboard/employees", label: "Employees", icon: Users },
  { href: "/dashboard/reports", label: "Reports", icon: BarChart3 },
]

const employeeLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/my-tasks", label: "My Tasks", icon: ListTodo },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { role, setRole } = useRole()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = role === "admin" ? adminLinks : employeeLinks
  const displayName = role === "admin" ? "Admin User" : "Alex Rivera"
  const displayRole = role === "admin" ? "Administrator" : "Frontend Developer"

  return (
    <>
      {/* Mobile toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-card shadow-md"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out",
          collapsed ? "w-[72px]" : "w-64",
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className={cn("flex items-center border-b border-sidebar-border px-4 py-5", collapsed && "justify-center px-2")}>
          {!collapsed && (
            <Link href="/dashboard" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
                <FolderKanban className="h-4 w-4 text-sidebar-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight">TaskFlow</span>
            </Link>
          )}
          {collapsed && (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
              <FolderKanban className="h-4 w-4 text-sidebar-primary-foreground" />
            </div>
          )}
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4">
          <div className={cn("mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/50", collapsed && "sr-only")}>
            Navigation
          </div>
          <ul className="flex flex-col gap-1">
            {links.map((link) => {
              const isActive =
                link.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                      collapsed && "justify-center px-2"
                    )}
                  >
                    <link.icon className="h-[18px] w-[18px] shrink-0" />
                    {!collapsed && <span>{link.label}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Collapse button - desktop only */}
        <div className="hidden px-3 py-2 lg:block">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex w-full items-center justify-center rounded-lg p-2 text-sidebar-foreground/50 transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform",
                collapsed && "rotate-180"
              )}
            />
          </button>
        </div>

        {/* User section */}
        <div className={cn("border-t border-sidebar-border p-4", collapsed && "p-2")}>
          <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
            <Avatar className="h-9 w-9 shrink-0 border border-sidebar-border">
              <AvatarFallback className="bg-sidebar-primary text-[11px] font-semibold text-sidebar-primary-foreground">
                {displayName.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 truncate">
                <p className="truncate text-sm font-semibold leading-tight">
                  {displayName}
                </p>
                <p className="truncate text-xs text-sidebar-foreground/60">
                  {displayRole}
                </p>
              </div>
            )}
          </div>
          {!collapsed && (
            <button
              onClick={() =>
                setRole(role === "admin" ? "employee" : "admin")
              }
              className="mt-3 w-full rounded-lg bg-sidebar-accent px-3 py-1.5 text-xs font-medium text-sidebar-accent-foreground transition-colors hover:bg-sidebar-accent/80"
            >
              Switch to {role === "admin" ? "Employee" : "Admin"} View
            </button>
          )}
        </div>
      </aside>
    </>
  )
}
