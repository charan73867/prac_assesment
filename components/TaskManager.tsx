"use client";

import { useState, useEffect } from "react";
import { Card, Button } from "@repo/ui";
import { Plus, Inbox, Loader2, ClipboardList } from "lucide-react";
import { TaskCard } from "./TaskCard";
import { AddTaskModal } from "./AddTaskModal";

export type Task = {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "completed";
  userId: string;
  createdAt: string;
};

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch tasks from API
  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data: Task[] = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    setFilteredTasks(
      filter === "all" ? tasks : tasks.filter((t) => t.status === filter)
    );
  }, [tasks, filter]);

  // Delete task
  const handleDeleteTask = async (id: string) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete task");
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      alert((err as Error).message);
    }
  };

  // Toggle task status
  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "completed" ? "pending" : "completed";
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update task");
      const updatedTask: Task = await res.json();
      setTasks((prev) => prev.map((t) => (t._id === id ? updatedTask : t)));
    } catch (err) {
      alert((err as Error).message);
    }
  };

  // Add new task
  const handleAddTask = (newTask: Task) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-600 dark:text-slate-300">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600 dark:text-indigo-400" />
        <p className="mt-3 text-sm">Loading your tasks…</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 lg:p-8 backdrop-blur-md bg-gradient-to-br from-white/90 to-white/70 dark:from-slate-900/90 dark:to-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 ring-1 ring-indigo-100 dark:bg-indigo-950/40 dark:ring-indigo-900">
              <ClipboardList className="h-5 w-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Tasks</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {tasks.length} total • {filter === "all" ? "showing all" : `showing ${filter}`}
              </p>
            </div>
          </div>

          {/* Add Task Button */}
          <Button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg rounded-xl px-5 py-2.5 transition-all duration-300 hover:scale-105"
            aria-label="Add new task"
          >
            <Plus className="w-5 h-5" />
            Add New Task
          </Button>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/70 ring-1 ring-slate-200/70 dark:ring-slate-700/60">
            {(["all", "completed", "pending"] as const).map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`transition-all font-medium rounded-xl shadow-sm
                  ${filter === f
                    ? "bg-white text-indigo-700 ring-1 ring-indigo-200 hover:bg-white dark:bg-slate-900/80 dark:text-indigo-300 dark:ring-indigo-900"
                    : "bg-transparent text-slate-700 dark:text-slate-300 hover:bg-white/70 dark:hover:bg-slate-700/60"}
                `}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                <span
                  className={`ml-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold
                    ${filter === f
                      ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300"
                      : "bg-white/60 text-slate-600 dark:bg-slate-900/40 dark:text-slate-300"}
                  `}
                  aria-live="polite"
                >
                  {f === "all" ? tasks.length : tasks.filter((t) => t.status === f).length}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Task Grid */}
      {filteredTasks.length === 0 ? (
        <Card className="p-16 text-center rounded-3xl border-2 border-dashed border-slate-300/60 dark:border-slate-700/60 bg-white/60 dark:bg-slate-900/40">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
            <Inbox className="h-7 w-7 text-slate-500 dark:text-slate-400" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">No tasks found</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Create your first task to get started.
          </p>
          <div className="mt-6">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 shadow-md transition"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </Button>
          </div>
        </Card>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6"
          aria-live="polite"
        >
          {filteredTasks.map((t) => (
            <TaskCard
              key={t._id}
              task={t}
              onDelete={handleDeleteTask}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      )}

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskAdded={handleAddTask}
      />
    </div>
  );
}