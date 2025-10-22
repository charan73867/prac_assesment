// apps/web/app/dashboard/page.tsx
"use client";

export default function DashboardPage() {
  const cards = [
    { title: "Tasks", description: "View and manage your tasks efficiently." },
    { title: "Projects", description: "Track project progress and deadlines." },
    { title: "Teams", description: "Collaborate with your team members." },
    { title: "Analytics", description: "View detailed analytics and reports." },
    { title: "Calendar", description: "Manage your schedule easily." },
    { title: "Settings", description: "Update your preferences and account info." },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="relative p-6 rounded-2xl bg-white/80 dark:bg-slate-900/75 backdrop-blur-xl border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300"
        >
          {/* Animated gradient glow */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-3xl animate-pulse"></div>

          <h2 className="relative text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            {card.title}
          </h2>
          <p className="relative text-gray-600 dark:text-gray-300 text-sm">
            {card.description}
          </p>
        </div>
      ))}
    </div>
  );
}
