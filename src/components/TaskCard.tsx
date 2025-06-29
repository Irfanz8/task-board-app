"use client";

import { Task } from "../types/task";
import PriorityIndicator from "./PriorityIndicator";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../store/tasksSlice";
import { useState, useRef } from "react";
import EditTaskModal from "./EditTaskModal";

const priorities: Array<"Low" | "Medium" | "High"> = ["Low", "Medium", "High"];

export default function TaskCard({
  task,
  onIdClick,
}: {
  task: Task;
  onIdClick?: () => void;
}) {
  const dispatch = useDispatch();
  const [priority, setPriority] = useState(task.priority);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleSelect = (p: "Low" | "Medium" | "High") => {
    setPriority(p);
    dispatch(updateTask({ ...task, priority: p }));
    setShowDropdown(false);
  };

  const handleDelete = () => {
    if (window.confirm("Delete this task?")) {
      dispatch(deleteTask(task.id));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-3 mb-2 border border-gray-200 flex flex-col gap-1">
      {/* Edit Modal */}
      {showEditModal && (
        <EditTaskModal
          task={task}
          onClose={() => setShowEditModal(false)}
        />
      )}
      <div className="font-semibold text-gray-800 flex justify-between items-center">
        {task.title}
        <div className="flex items-center gap-1">
          {/* Eye icon for detail */}
          <button
            className="text-[#2684ff] hover:text-[#0057d8] transition-colors"
            title="View details"
            onClick={e => {
              e.stopPropagation();
              if (onIdClick) onIdClick();
            }}
            style={{ padding: 0, display: "flex", alignItems: "center" }}
          >
            <svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" stroke="currentColor" />
              <circle cx="12" cy="12" r="3" stroke="currentColor" />
            </svg>
          </button>
          {/* Edit icon */}
          <button
            className="text-[#ffc107] hover:text-yellow-600 transition-colors"
            title="Edit task"
            onClick={() => setShowEditModal(true)}
            style={{ padding: 0, display: "flex", alignItems: "center" }}
          >
            <svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
              <path d="M17.013 7.387l-0.4-0.4a2 2 0 0 0-2.828 0l-7.072 7.072a2 2 0 0 0-.512.878l-1 3.464a1 1 0 0 0 1.213 1.213l3.464-1a2 2 0 0 0 .878-.512l7.072-7.072a2 2 0 0 0 0-2.828z" stroke="currentColor" fill="none"/>
              <path d="M15 6l3 3" stroke="currentColor" />
            </svg>
          </button>
          {/* Delete icon */}
          <button
            className="text-[#ff3b3b] hover:text-red-700 transition-colors"
            title="Delete task"
            onClick={handleDelete}
            style={{ padding: 0, display: "flex", alignItems: "center" }}
          >
            <svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
              <rect x="5" y="7" width="14" height="12" rx="2" stroke="currentColor"/>
              <path d="M9 11v6M15 11v6" stroke="currentColor"/>
              <path d="M10 7V5a2 2 0 012-2h0a2 2 0 012 2v2" stroke="currentColor"/>
              <path d="M4 7h16" stroke="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="text-xs text-gray-500">{task.description}</div>
      <div className="flex items-center gap-2 mt-1">
        <span
          className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded"
        >
          {task.id}
        </span>
        {/* Priority dropdown */}
        <div
          className="flex items-center gap-1 ml-auto relative"
          ref={dropdownRef}
        >
          <button
            className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-white shadow-sm min-w-[90px] outline-none
      ${task.progress === "Done" ? "text-green-600" : "text-gray-600"}
      `}
            style={{ border: "none" }}
            onClick={() => setShowDropdown((v) => !v)}
            type="button"
          >
            {task.progress === "Done" && (
              <svg
                className="w-4 h-4 mr-1 text-green-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
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
          </button>
          {showDropdown && (
            <div className="absolute z-10 mt-1 right-0 w-32 bg-white border rounded shadow">
              {priorities.map((p) => (
                <button
                  key={p}
                  className="flex items-center w-full px-2 py-1 text-sm hover:bg-gray-100"
                  onClick={() => handleSelect(p)}
                  type="button"
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
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}