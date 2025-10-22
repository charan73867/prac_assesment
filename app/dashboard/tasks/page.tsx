import { TaskManager } from "@/components/TaskManager";

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          My Tasks
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          View and manage all your tasks
        </p>
      </div>

      <TaskManager />
    </div>
  );
}
