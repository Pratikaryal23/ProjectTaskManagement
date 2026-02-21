"use client"

import { useRole } from "@/lib/role-context"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { EmployeeDashboard } from "@/components/employee/employee-dashboard"

export default function DashboardPage() {
  const { role } = useRole()

  if (role === "employee") {
    return <EmployeeDashboard />
  }

  return <AdminDashboard />
}
