import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { BoardTask } from '../components/TaskBoard';

const TASKS_STORAGE_KEY = 'to_do_list_tasks';

export type NewTaskData = Omit<BoardTask, 'id'>;
export type UpdateTaskData = Partial<Omit<BoardTask, 'id'>>;

export interface TasksContextValue {
  tasks: BoardTask[];
  addTask: (task: NewTaskData) => void;
  updateTask: (id: string, updatedData: UpdateTaskData) => void;
  deleteTask: (id: string) => void;
}

const TasksContext = createContext<TasksContextValue | null>(null);

const getInitialTasks = (): BoardTask[] => {
  try {
    const saved = localStorage.getItem(TASKS_STORAGE_KEY);
    return saved ? (JSON.parse(saved) as BoardTask[]) : [];
  } catch {
    return [];
  }
};

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<BoardTask[]>(getInitialTasks);

  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((taskData: NewTaskData) => {
    const newTask: BoardTask = {
      ...taskData,
      id: String(Date.now()),
    };
    setTasks((prev) => [...prev, newTask]);
  }, []);

  const updateTask = useCallback((id: string, updatedData: UpdateTaskData) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updatedData } : task)));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      tasks,
      addTask,
      updateTask,
      deleteTask,
    }),
    [tasks, addTask, updateTask, deleteTask],
  );

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};
