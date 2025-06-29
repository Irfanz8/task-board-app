"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/tasksSlice";
import { TaskProgress } from "../types/task";

export default function TaskForm({
  progress,
  onClose,
}: {
  progress: TaskProgress;
  onClose: () => void;
}) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  return (
    <form
      className="border border-blue-400 rounded-lg p-3 bg-white"
      onSubmit={(e) => {
        e.preventDefault();
        if (title) {
          dispatch(
            addTask({
              title,
              description: "",
              priority: "Medium",
              progress,
            })
          );
          setTitle("");
          onClose();
        }
      }}
    >
      <input
        className="w-full border-none outline-none text-sm mb-3 bg-transparent"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      <div className="flex justify-end">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-2 py-1 text-sm font-semibold"
          type="submit"
        >
          Create
        </button>
      </div>
    </form>
  );
}