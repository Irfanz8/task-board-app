import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../store/tasksSlice";
import { Task } from "../types/task";
import PriorityIndicator from "./PriorityIndicator";

const priorities: Array<"Low" | "Medium" | "High"> = ["Low", "Medium", "High"];

export default function EditTaskModal({
  task,
  onClose,
}: {
  task: Task;
  onClose: () => void;
}) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">(task.priority);
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

  const handleSelect = (p: "Low" | "Medium" | "High") => {
    setPriority(p);
    setShowDropdown(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateTask({ ...task, title, description, priority }));
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-8 min-w-[340px] max-w-[95vw] relative animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold text-[#233055] mb-6">Edit Task</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block font-semibold text-[#233055] mb-1">Title</label>
            <input
              type="text"
              className="w-full border rounded px-2 py-1 text-base"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-[#233055] mb-1">Description</label>
            <textarea
              className="w-full border rounded px-2 py-1 text-base"
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div>
            <label className="block font-semibold text-[#233055] mb-1">Priority</label>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                className="flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-white shadow-sm min-w-[90px] outline-none border border-gray-200"
                onClick={() => setShowDropdown((v) => !v)}
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
              </button>
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
          <div>
            <label className="block font-semibold text-[#233055] mb-1">Task ID</label>
            <input
              type="text"
              className="w-full border rounded px-2 py-1 bg-gray-100 text-gray-500 text-base"
              value={task.id}
              disabled
            />
          </div>
          <button
            type="submit"
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-base font-semibold"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}