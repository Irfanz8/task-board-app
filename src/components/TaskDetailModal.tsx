import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../store/tasksSlice";
import { Task } from "../types/task";
import PriorityIndicator from "./PriorityIndicator";

const priorities = ["Low", "Medium", "High"] as const;

export default function TaskDetailModal({
  task,
  onClose,
}: {
  task: Task;
  onClose: () => void;
}) {
  const dispatch = useDispatch();
  const [priority, setPriority] = useState(task.priority);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleSelect = (p: typeof priorities[number]) => {
    setPriority(p);
    dispatch(updateTask({ ...task, priority: p }));
    setShowDropdown(false);
  };

  if (!task) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-8 min-w-[340px] max-w-[95vw] relative animate-fade-in"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          ✕
        </button>
        {/* Task ID with check icon */}
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1 text-sm text-blue-900 font-medium">
            <svg
              className="w-5 h-5 text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <rect width="20" height="20" rx="4" fill="#e0f2fe" />
              <path
                d="M6 10.5l2 2 4-4"
                stroke="#2563eb"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {task.id}
          </span>
        </div>
        {/* Title */}
        <h2 className="text-2xl font-bold text-[#233055] mb-6">{task.title}</h2>
        {/* Description */}
        <div className="mb-6">
          <div className="font-semibold text-[#233055] mb-1">Description</div>
          <div className="text-[#233055] text-base">
            {task.description || (
              <span className="italic text-gray-400">No description</span>
            )}
          </div>
        </div>
        {/* Priority */}
        <div>
          <div className="font-semibold text-[#233055] mb-1">Priority</div>
          <div
            className="flex items-center gap-1 text-base relative"
            ref={dropdownRef}
          >
            <div
              className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-white shadow-sm min-w-[90px] outline-none cursor-pointer border border-gray-200`}
              onClick={() => setShowDropdown((v) => !v)}
              tabIndex={0}
            >
              <PriorityIndicator priority={priority} />
              <span
                className={
                  priority === "High"
                    ? "text-red-500"
                    : priority === "Medium"
                    ? "text-yellow-500"
                    : "text-blue-500"
                }
              >
                {priority}
              </span>
              <svg
                className="w-3 h-3 ml-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            {showDropdown && (
              <div className="absolute z-10 mt-1 left-0 w-32 bg-white border rounded shadow">
                {priorities.map((p) => (
                  <div
                    key={p}
                    className="flex items-center w-full px-2 py-1 text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelect(p)}
                    tabIndex={0}
                  >
                    <PriorityIndicator priority={p} className="mr-2" />
                    <span
                      className={
                        p === "High"
                          ? "text-red-500"
                          : p === "Medium"
                          ? "text-yellow-500"
                          : "text-blue-500"
                      }
                    >
                      {p}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Tambahkan di src/app/globals.css atau tailwind.css:
/*
@keyframes fade-in {
  from { opacity: 0; transform: scale(0.95);}
  to { opacity: 1; transform: scale(1);}
}
.animate-fade-in {
  animation: fade-in 0.2s ease;
}
*/