import { auth } from "@/auth";
import { TaskManager } from "@/components/TaskManager";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, {session?.user?.name}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your tasks efficiently
        </p>
      </div>

      <TaskManager />
    </div>
  );
}
