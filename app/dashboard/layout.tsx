// apps/web/app/dashboard/layout.tsx
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Sidebar, Topbar } from "@repo/ui";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-indigo-950/95 dark:to-purple-950/90">

      {/* Sidebar fixed on the left */}
      <aside className="fixed top-0 left-0 h-full w-72 z-50 border-r border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <Sidebar />
      </aside>

      {/* Main content wrapper */}
      <div className="flex flex-col flex-1 lg:ml-72 min-h-screen">

        {/* Topbar sticky */}
        <header className="sticky top-0 z-40 backdrop-blur-lg bg-white/80 dark:bg-slate-900/80 border-b border-gray-200/50 dark:border-slate-700/50 shadow-sm">
          <Topbar user={session.user} />
        </header>

        {/* Main content area */}
        <main className="relative flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10">

          {/* Optional animated background inside content */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-[-120px] right-[-100px] w-[500px] h-[500px] bg-gradient-to-tl from-pink-400/20 to-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
          </div>

          {/* Actual page content */}
          <div className="relative z-10">{children}</div>
        </main>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-600 dark:text-gray-400 py-6 border-t border-gray-200/40 dark:border-slate-800/40">
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
            TaskSphere
          </span>{" "}
          • © 2025
        </footer>
      </div>
    </div>
  );
}
