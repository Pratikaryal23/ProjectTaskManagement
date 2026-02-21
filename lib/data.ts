export type Role = "admin" | "employee"

export type TaskStatus = "pending" | "in-progress" | "completed"
export type TaskPriority = "low" | "medium" | "high"

export interface Employee {
  id: string
  name: string
  email: string
  avatar: string
  role: string
  department: string
  tasksAssigned: number
  tasksCompleted: number
}

export interface ActivityItem {
  id: string
  user: string
  action: string
  timestamp: string
  detail?: string
}

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  progress: number
  assignee: Employee
  dueDate: string
  createdAt: string
  project: string
  tags: string[]
  activity: ActivityItem[]
}

export const employees: Employee[] = [
  {
    id: "emp-1",
    name: "Alex Rivera",
    email: "alex@acme.com",
    avatar: "AR",
    role: "Frontend Developer",
    department: "Engineering",
    tasksAssigned: 8,
    tasksCompleted: 5,
  },
  {
    id: "emp-2",
    name: "Sarah Chen",
    email: "sarah@acme.com",
    avatar: "SC",
    role: "Backend Developer",
    department: "Engineering",
    tasksAssigned: 6,
    tasksCompleted: 4,
  },
  {
    id: "emp-3",
    name: "Marcus Johnson",
    email: "marcus@acme.com",
    avatar: "MJ",
    role: "UI/UX Designer",
    department: "Design",
    tasksAssigned: 5,
    tasksCompleted: 3,
  },
  {
    id: "emp-4",
    name: "Emily Park",
    email: "emily@acme.com",
    avatar: "EP",
    role: "Product Manager",
    department: "Product",
    tasksAssigned: 7,
    tasksCompleted: 6,
  },
  {
    id: "emp-5",
    name: "Daniel Okafor",
    email: "daniel@acme.com",
    avatar: "DO",
    role: "DevOps Engineer",
    department: "Engineering",
    tasksAssigned: 4,
    tasksCompleted: 2,
  },
  {
    id: "emp-6",
    name: "Lisa Wang",
    email: "lisa@acme.com",
    avatar: "LW",
    role: "QA Engineer",
    department: "Engineering",
    tasksAssigned: 6,
    tasksCompleted: 5,
  },
]

export const tasks: Task[] = [
  {
    id: "task-1",
    title: "Redesign Landing Page",
    description:
      "Overhaul the main landing page with new branding guidelines. Include updated hero section, testimonials, and pricing table.",
    status: "in-progress",
    priority: "high",
    progress: 65,
    assignee: employees[0],
    dueDate: "2026-03-15",
    createdAt: "2026-02-01",
    project: "Website Redesign",
    tags: ["frontend", "design"],
    activity: [
      {
        id: "a1",
        user: "Alex Rivera",
        action: "updated progress to 65%",
        timestamp: "2 hours ago",
      },
      {
        id: "a2",
        user: "Emily Park",
        action: "added comment",
        timestamp: "5 hours ago",
        detail: "Looking great! Please update the CTA copy.",
      },
      {
        id: "a3",
        user: "Alex Rivera",
        action: "started the task",
        timestamp: "3 days ago",
      },
      {
        id: "a4",
        user: "Emily Park",
        action: "created the task",
        timestamp: "1 week ago",
      },
    ],
  },
  {
    id: "task-2",
    title: "API Rate Limiting",
    description:
      "Implement rate limiting on all public-facing API endpoints to prevent abuse and ensure fair usage.",
    status: "pending",
    priority: "high",
    progress: 0,
    assignee: employees[1],
    dueDate: "2026-03-10",
    createdAt: "2026-02-10",
    project: "Backend Infrastructure",
    tags: ["backend", "security"],
    activity: [
      {
        id: "a5",
        user: "Emily Park",
        action: "created the task",
        timestamp: "1 week ago",
      },
    ],
  },
  {
    id: "task-3",
    title: "User Onboarding Flow",
    description:
      "Design and prototype a new onboarding experience that guides users through key features with interactive walkthroughs.",
    status: "in-progress",
    priority: "medium",
    progress: 40,
    assignee: employees[2],
    dueDate: "2026-03-20",
    createdAt: "2026-02-05",
    project: "User Experience",
    tags: ["design", "ux"],
    activity: [
      {
        id: "a6",
        user: "Marcus Johnson",
        action: "updated progress to 40%",
        timestamp: "1 day ago",
      },
      {
        id: "a7",
        user: "Marcus Johnson",
        action: "started the task",
        timestamp: "5 days ago",
      },
      {
        id: "a8",
        user: "Emily Park",
        action: "created the task",
        timestamp: "2 weeks ago",
      },
    ],
  },
  {
    id: "task-4",
    title: "Quarterly OKR Report",
    description:
      "Compile and present Q1 objectives and key results across all departments with analysis and recommendations.",
    status: "completed",
    priority: "medium",
    progress: 100,
    assignee: employees[3],
    dueDate: "2026-02-28",
    createdAt: "2026-02-01",
    project: "Operations",
    tags: ["reports", "management"],
    activity: [
      {
        id: "a9",
        user: "Emily Park",
        action: "completed the task",
        timestamp: "1 day ago",
      },
      {
        id: "a10",
        user: "Emily Park",
        action: "updated progress to 100%",
        timestamp: "1 day ago",
      },
      {
        id: "a11",
        user: "Emily Park",
        action: "started the task",
        timestamp: "2 weeks ago",
      },
    ],
  },
  {
    id: "task-5",
    title: "CI/CD Pipeline Optimization",
    description:
      "Reduce build times by 50% through caching strategies, parallel test execution, and optimized Docker layers.",
    status: "in-progress",
    priority: "high",
    progress: 75,
    assignee: employees[4],
    dueDate: "2026-03-05",
    createdAt: "2026-01-25",
    project: "Backend Infrastructure",
    tags: ["devops", "performance"],
    activity: [
      {
        id: "a12",
        user: "Daniel Okafor",
        action: "updated progress to 75%",
        timestamp: "6 hours ago",
      },
      {
        id: "a13",
        user: "Daniel Okafor",
        action: "added comment",
        timestamp: "1 day ago",
        detail: "Parallel test execution is now live. Seeing a 35% reduction already.",
      },
      {
        id: "a14",
        user: "Daniel Okafor",
        action: "started the task",
        timestamp: "3 weeks ago",
      },
    ],
  },
  {
    id: "task-6",
    title: "Mobile Responsive Audit",
    description:
      "Audit all pages for mobile responsiveness, fix layout issues, and ensure consistent experience across devices.",
    status: "pending",
    priority: "medium",
    progress: 0,
    assignee: employees[0],
    dueDate: "2026-03-25",
    createdAt: "2026-02-15",
    project: "Website Redesign",
    tags: ["frontend", "mobile"],
    activity: [
      {
        id: "a15",
        user: "Emily Park",
        action: "created the task",
        timestamp: "6 days ago",
      },
    ],
  },
  {
    id: "task-7",
    title: "E2E Testing Suite",
    description:
      "Build comprehensive end-to-end testing suite for critical user flows including login, checkout, and onboarding.",
    status: "in-progress",
    priority: "medium",
    progress: 50,
    assignee: employees[5],
    dueDate: "2026-03-18",
    createdAt: "2026-02-08",
    project: "Quality Assurance",
    tags: ["testing", "qa"],
    activity: [
      {
        id: "a16",
        user: "Lisa Wang",
        action: "updated progress to 50%",
        timestamp: "3 hours ago",
      },
      {
        id: "a17",
        user: "Lisa Wang",
        action: "started the task",
        timestamp: "1 week ago",
      },
    ],
  },
  {
    id: "task-8",
    title: "Database Migration to Postgres",
    description:
      "Migrate the existing MySQL database to PostgreSQL with zero downtime. Include data validation and rollback strategy.",
    status: "pending",
    priority: "high",
    progress: 0,
    assignee: employees[1],
    dueDate: "2026-04-01",
    createdAt: "2026-02-18",
    project: "Backend Infrastructure",
    tags: ["backend", "database"],
    activity: [
      {
        id: "a18",
        user: "Emily Park",
        action: "created the task",
        timestamp: "3 days ago",
      },
    ],
  },
  {
    id: "task-9",
    title: "Design System Documentation",
    description:
      "Document all design tokens, components, and patterns in a living style guide accessible to the entire team.",
    status: "completed",
    priority: "low",
    progress: 100,
    assignee: employees[2],
    dueDate: "2026-02-20",
    createdAt: "2026-01-15",
    project: "User Experience",
    tags: ["design", "documentation"],
    activity: [
      {
        id: "a19",
        user: "Marcus Johnson",
        action: "completed the task",
        timestamp: "1 day ago",
      },
      {
        id: "a20",
        user: "Marcus Johnson",
        action: "updated progress to 100%",
        timestamp: "1 day ago",
      },
    ],
  },
  {
    id: "task-10",
    title: "Performance Monitoring Setup",
    description:
      "Configure real-time performance monitoring with alerting for latency spikes, error rates, and resource utilization.",
    status: "completed",
    priority: "medium",
    progress: 100,
    assignee: employees[4],
    dueDate: "2026-02-25",
    createdAt: "2026-02-01",
    project: "Backend Infrastructure",
    tags: ["devops", "monitoring"],
    activity: [
      {
        id: "a21",
        user: "Daniel Okafor",
        action: "completed the task",
        timestamp: "3 days ago",
      },
    ],
  },
]

export const stats = {
  totalTasks: tasks.length,
  completedTasks: tasks.filter((t) => t.status === "completed").length,
  inProgressTasks: tasks.filter((t) => t.status === "in-progress").length,
  pendingTasks: tasks.filter((t) => t.status === "pending").length,
  totalEmployees: employees.length,
  overallProgress: Math.round(
    tasks.reduce((acc, t) => acc + t.progress, 0) / tasks.length
  ),
}
