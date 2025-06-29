import { Task } from '../types/task';

export default function TaskDetail({ task }: { task: Task }) {
  return (
    <div className="border rounded p-4 bg-white max-w-lg">
      <div className="text-xs text-gray-500 mb-2">{task.id}</div>
      <div className="text-xl font-bold mb-2">{task.title}</div>
      <div className="mb-2">
        <span className="font-semibold">Description</span>
        <div className="text-sm">{task.description}</div>
      </div>
      <div>
        <span className="font-semibold">Priority</span>
        <div className="text-sm">{task.priority}</div>
      </div>
    </div>
  );
}