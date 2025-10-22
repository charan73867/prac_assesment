export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className="p-6 rounded-2xl bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl shadow-lg border border-gray-200 dark:border-slate-700 hover:scale-105 transition-transform duration-300"
        >
          <h2 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-2">
            Card {idx + 1}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Sample description for card {idx + 1}. You can replace this with real content.
          </p>
        </div>
      ))}
    </div>
  );
}
