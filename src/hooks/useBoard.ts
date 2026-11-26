import { useState } from 'react';
import { BoardTask, ColumnId, COLUMNS } from '../components/TaskBoard';
import { StatusFilterValue } from '../components/TaskFilters';
import { useTasks } from '../context';

export const useBoard = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilterValue>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultColumn, setDefaultColumn] = useState<ColumnId>(COLUMNS[0].id);
  const [editingTask, setEditingTask] = useState<BoardTask | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<BoardTask | null>(null);

  const openCreateModal = (column: ColumnId = COLUMNS[0].id) => {
    setEditingTask(null);
    setDefaultColumn(column);
    setIsModalOpen(true);
  };

  const openEditModal = (task: BoardTask) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleSubmitTask = (taskData: Omit<BoardTask, 'id'>) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
      setSearch('');
    }
    closeModal();
  };

  const requestDeleteEditingTask = () => {
    if (editingTask) {
      setTaskToDelete(editingTask);
    }
  };

  const cancelDelete = () => {
    setTaskToDelete(null);
  };

  const confirmDelete = () => {
    if (!taskToDelete) return;
    deleteTask(taskToDelete.id);
    setTaskToDelete(null);
    closeModal();
  };

  const resetFilters = () => {
    setSearch('');
    setStatusFilter('all');
  };

  const normalizedQuery = search.trim().toLowerCase();
  const hasActiveFilters = Boolean(normalizedQuery) || statusFilter !== 'all';

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      !normalizedQuery ||
      task.title.toLowerCase().includes(normalizedQuery) ||
      task.description.toLowerCase().includes(normalizedQuery) ||
      (task.tag && task.tag.toLowerCase().includes(normalizedQuery));

    const matchesStatus = statusFilter === 'all' || (task.status ?? 'done') === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    filteredTasks,
    hasActiveFilters,
    resetFilters,
    isModalOpen,
    defaultColumn,
    editingTask,
    taskToDelete,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSubmitTask,
    requestDeleteEditingTask,
    cancelDelete,
    confirmDelete,
  };
};
