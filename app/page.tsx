"use client";

import { useRouter } from "next/navigation";
import {
  Shield,
  User,
  ArrowRight,
  BarChart3,
  ListTodo,
  Users,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useRole } from "@/lib/role-context";

export default function HomePage() {
  const router = useRouter();
  const { setRole } = useRole();

  function handleSelect(role: "admin" | "employee") {
    setRole(role);
    router.push("/dashboard");
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4">
      {/* Background decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-0 text-center ">
          {/* Logo */}
          <img
            src="karyelogo.png"
            alt="TaskFlow logo"
            className="h-96 w-auto object-contain -mb-34"
          />

          {/* Divider with label */}

          <div className="h-px flex-1 bg-border/60" />
          <div className=" flex gap-2 justify-center items-center">
            <p className="text-md font-medium text-muted-foreground ">
              Select your role to continue
            </p>
            <ArrowRight className="h-4 w-4 mt-1" />
          </div>

          <div className="h-px flex-1 bg-border/60" />
        </div>

        {/* Role selection */}
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Admin card */}
          <Card
            className="group relative cursor-pointer overflow-hidden border-border/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
            onClick={() => handleSelect("admin")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleSelect("admin");
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <CardContent className="relative flex flex-col gap-5 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20 transition-all duration-300 group-hover:bg-primary/15 group-hover:ring-primary/40">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-card-foreground">
                    Admin
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Full access dashboard
                  </p>
                </div>
              </div>

              <div className="h-px bg-border/50" />

              <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
                <li className="flex items-center gap-2.5">
                  <div className="flex h-5 w-5 items-center justify-center rounded-md bg-primary/10">
                    <BarChart3 className="h-3 w-3 text-primary" />
                  </div>
                  Statistics overview
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="flex h-5 w-5 items-center justify-center rounded-md bg-primary/10">
                    <ListTodo className="h-3 w-3 text-primary" />
                  </div>
                  Task management
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="flex h-5 w-5 items-center justify-center rounded-md bg-primary/10">
                    <Users className="h-3 w-3 text-primary" />
                  </div>
                  Employee management
                </li>
              </ul>

              <div className="flex items-center gap-1.5 text-sm font-semibold text-primary">
                Enter as Admin
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5" />
              </div>
            </CardContent>
          </Card>

          {/* Employee card */}
          <Card
            className="group relative cursor-pointer overflow-hidden border-border/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-status-completed/40 hover:shadow-xl"
            onClick={() => handleSelect("employee")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleSelect("employee");
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-status-completed to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-status-completed/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <CardContent className="relative flex flex-col gap-5 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-status-completed/15 ring-1 ring-status-completed/25 transition-all duration-300 group-hover:bg-status-completed/20 group-hover:ring-status-completed/40">
                  <User className="h-5 w-5 text-status-completed-foreground" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-card-foreground">
                    Employee
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Personal task view
                  </p>
                </div>
              </div>

              <div className="h-px bg-border/50" />

              <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
                <li className="flex items-center gap-2.5">
                  <div className="flex h-5 w-5 items-center justify-center rounded-md bg-status-completed/15">
                    <ListTodo className="h-3 w-3 text-status-completed-foreground" />
                  </div>
                  Personal task board
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="flex h-5 w-5 items-center justify-center rounded-md bg-status-completed/15">
                    <CheckCircle2 className="h-3 w-3 text-status-completed-foreground" />
                  </div>
                  Progress tracking
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="flex h-5 w-5 items-center justify-center rounded-md bg-status-completed/15">
                    <BarChart3 className="h-3 w-3 text-status-completed-foreground" />
                  </div>
                  Personal statistics
                </li>
              </ul>

              <div className="flex items-center gap-1.5 text-sm font-semibold text-status-completed-foreground">
                Enter as Employee
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5" />
              </div>
            </CardContent>
          </Card>
        </div>

        <p className="text-center text-md text-muted-foreground/60">
          You can switch roles anytime from the sidebar
        </p>
      </div>
    </div>
  );
}
