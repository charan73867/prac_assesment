"use client";

import { Card, Button } from "@repo/ui";
import { Trash2, Check, Clock, AlertCircle } from "lucide-react";
import { format, isPast, parseISO } from "date-fns";
import type { Task } from "./TaskManager";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, currentStatus: string) => void;
}

export function TaskCard({ task, onDelete, onToggleStatus }: TaskCardProps) {
  const dueDate = parseISO(task.dueDate);
  const isOverdue = isPast(dueDate) && task.status === "pending";

  return (
    <Card
      className={`group relative overflow-hidden rounded-xl p-5 sm:p-6 space-y-4 transition-all duration-200
        bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950
        border border-gray-200/80 dark:border-gray-800
        hover:shadow-lg hover:-translate-y-[1px]
        ${isOverdue ? "ring-1 ring-red-300/60 dark:ring-red-500/40" : "ring-1 ring-transparent"}
      `}
    >
      {isOverdue && (
        <span
          className="absolute inset-y-0 left-0 w-1 bg-red-500/80"
          aria-hidden="true"
        />
      )}

      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white leading-tight line-clamp-2">
          {task.title}
        </h3>

        <div
          className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium
            ${
              task.status === "completed"
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
            }
          `}
          aria-live="polite"
        >
          {task.status === "completed" ? (
            <Check className="w-3.5 h-3.5" aria-hidden="true" />
          ) : (
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
          )}
          <span className="capitalize">{task.status}</span>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
        {task.description}
      </p>

      <div className="flex items-center gap-2 text-sm">
        {isOverdue ? (
          <AlertCircle className="w-4 h-4 text-red-500" aria-hidden="true" />
        ) : (
          <Clock className="w-4 h-4 text-gray-500" aria-hidden="true" />
        )}
        <span
          className={isOverdue ? "text-red-600 dark:text-red-400 font-medium" : "text-gray-500"}
          title={format(dueDate, "PPPP")}
        >
          Due: {format(dueDate, "MMM dd, yyyy")}
        </span>

        {isOverdue && (
          <span className="ml-2 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 px-2 py-0.5 text-[11px]">
            Overdue
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 pt-4 mt-2 border-t border-gray-200 dark:border-gray-800">
        <Button
          variant={task.status === "completed" ? "outline" : "default"}
          size="sm"
          className="flex-1 justify-center"
          onClick={() => onToggleStatus(task._id, task.status)}
          aria-label={task.status === "completed" ? "Mark task as pending" : "Mark task as completed"}
        >
          <Check className="w-4 h-4 mr-2" aria-hidden="true" />
          {task.status === "completed" ? "Mark Pending" : "Complete"}
        </Button>

        <Button
          variant="destructive"
          size="sm"
          className="inline-flex items-center justify-center"
          onClick={() => onDelete(task._id)}
          aria-label="Delete task"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" aria-hidden="true" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    </Card>
  );
}