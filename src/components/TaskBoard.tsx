"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { moveTask } from "../store/tasksSlice";
import { Task, TaskProgress } from "../types/task";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import TaskDetailModal from "./TaskDetailModal";
import { useState, useEffect } from "react";

const columns: { key: TaskProgress; label: string; color: string; text: string }[] = [
  { key: "To Do", label: "TO DO", color: "bg-gray-200 text-gray-600", text: "font-semibold" },
  { key: "In Progress", label: "IN PROGRESS", color: "bg-blue-100 text-blue-700", text: "font-bold" },
  { key: "Done", label: "DONE", color: "bg-green-100 text-green-700", text: "font-semibold" },
];

export default function TaskBoard() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [showFormCol, setShowFormCol] = useState<TaskProgress | null>(null);
  const [detailTask, setDetailTask] = useState<Task | null>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  const handleDrop = (progress: TaskProgress) => {
    if (draggedId) {
      dispatch(moveTask({ id: draggedId, progress }));
      setDraggedId(null);
    }
  };

  if (!hasMounted) return null;

  return (
    <div className="min-h-screen py-10 px-6 rounded-xl">
      {/* Modal muncul jika detailTask ada */}
      {detailTask && (
        <TaskDetailModal task={detailTask} onClose={() => setDetailTask(null)} />
      )}
      <div className="flex flex-col lg:flex-row gap-6 justify-center h-full">
        {columns.map((col) => (
          <div
            key={col.key}
            className={`bg-white rounded-xl shadow-md p-4 w-full lg:w-80 flex flex-col border-t-4 ${col.color} h-full`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(col.key)}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-0.5 rounded text-xs uppercase tracking-wide ${col.color} ${col.text}`}>
                {col.label}
              </span>
              <span className="text-xs text-gray-400">
                {tasks.filter((t) => t.progress === col.key).length}
              </span>
            </div>
            <div className="flex-1 flex flex-col gap-2 mb-2 min-h-[40px]">
              {tasks
                .filter((t) => t.progress === col.key)
                .map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task.id)}
                    className="cursor-move"
                  >
                    <TaskCard
                      task={task}
                      onIdClick={() => setDetailTask(task)} // tambahkan prop ini
                    />
                  </div>
                ))}
            </div>
            {showFormCol === col.key ? (
              <TaskForm
                progress={col.key}
                onClose={() => setShowFormCol(null)}
              />
            ) : (
              <button
                className="mt-2 text-blue-600 text-sm hover:underline"
                onClick={() => setShowFormCol(col.key)}
                type="button"
              >
                + Create
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}