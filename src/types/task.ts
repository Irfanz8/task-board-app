export type TaskPriority = 'Low' | 'Medium' | 'High';
export type TaskProgress = 'To Do' | 'In Progress' | 'Done';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  progress: TaskProgress;
}