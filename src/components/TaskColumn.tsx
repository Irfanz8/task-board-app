"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import TaskCard from "./TaskCard";
import { TaskProgress } from "../types/task";
import { useEffect, useState } from "react";

interface Props {
  progress: TaskProgress;
  label: string;
  borderColor: string;
}

export default function TaskColumn({ progress, label, borderColor }: Props) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const tasks = useSelector((state: RootState) =>
    state.tasks.tasks.filter((t) => t.progress === progress)
  );

  if (!hasMounted) return null; // Hindari render di server

  return (
    <div
      className={`bg-white rounded-xl shadow-md p-4 w-80 flex flex-col border-t-4 ${borderColor}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-gray-700">{label}</span>
        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">
          {tasks.length}
        </span>
      </div>
      <div className="flex-1 flex flex-col gap-2 mb-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}