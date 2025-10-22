"use client";

import { useState } from "react";
import { Button, Input, Card } from "@repo/ui";
import { X, Loader2, Calendar, Type, FileText } from "lucide-react";
import type { Task } from "./TaskManager";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskAdded: (task: Task) => void;
}

export function AddTaskModal({ isOpen, onClose, onTaskAdded }: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, dueDate }),
      });

      if (!res.ok) throw new Error("Failed to create task");

      const newTask: Task = await res.json();

      onTaskAdded(newTask);

      setTitle("");
      setDescription("");
      setDueDate("");
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-task-title"
      aria-describedby="add-task-description"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal */}
      <Card className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200/70 dark:border-slate-700/70 bg-white/90 dark:bg-slate-900/90 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/70 dark:border-slate-700/60">
          <div>
            <h2 id="add-task-title" className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Add New Task
            </h2>
            <p id="add-task-description" className="text-xs text-slate-500 dark:text-slate-400">
              Create a task with title, description, and due date.
            </p>
          </div>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label="Close modal"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          {/* Title */}
          <div className="space-y-1.5">
            <label htmlFor="task-title" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Title
            </label>
            <div className="relative">
              <Type className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" aria-hidden="true" />
              <Input
                id="task-title"
                name="title"
                type="text"
                placeholder="e.g., Prepare project update"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                autoFocus
                className="pl-9 rounded-xl border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/70 focus-visible:ring-indigo-500"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label htmlFor="task-description" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Description
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" aria-hidden="true" />
              <textarea
                id="task-description"
                name="description"
                placeholder="Add details, links, or context for this task..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full min-h-[110px] resize-y rounded-xl pl-9 pr-3 py-3 border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/70 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                required
              />
              <div className="mt-1 text-right text-xs text-slate-500 dark:text-slate-400">
                {description.length} characters
              </div>
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-1.5">
            <label htmlFor="task-due" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Due date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" aria-hidden="true" />
              <Input
                id="task-due"
                name="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                className="pl-9 rounded-xl border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/70 focus-visible:ring-indigo-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 sm:justify-end">
            <Button
              variant="outline"
              onClick={onClose}
              type="button"
              className="flex-1 sm:flex-none sm:min-w-[120px] rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="flex-1 sm:flex-none sm:min-w-[140px] rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg transition-all"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  Creating...
                </span>
              ) : (
                "Create Task"
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}