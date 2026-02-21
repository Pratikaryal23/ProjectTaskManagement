"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { useRole } from "@/lib/role-context"
import type { ReactNode } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { role } = useRole()
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className="transition-all duration-300 lg:pl-64">
        <div className="mx-auto max-w-7xl px-4 py-6 pt-16 sm:px-6 lg:px-8 lg:pt-6">
          {children}
        </div>
      </main>
    </div>
  )
}
