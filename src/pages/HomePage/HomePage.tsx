import { useState } from 'react';
import './HomePage.css';
import { ConfirmModal, TaskModal } from '../../components';
import { BoardTask, ColumnId, COLUMNS, TaskBoard } from '../../components/TaskBoard';
import { StatusFilterValue, TaskFilters } from '../../components/TaskFilters';
import { useTasks } from '../../context';
import { DEFAULT_TASK_AVATARS, STATUS_FILTER_OPTIONS } from '../../data/board';
export const HomePage = () => {
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

  const handleSubmitTask = (taskData: Omit<BoardTask, 'id'>) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
      setSearch('');
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleConfirmDelete = () => {
    if (!taskToDelete) return;
    deleteTask(taskToDelete.id);
    setTaskToDelete(null);
    setIsModalOpen(false);
    setEditingTask(null);
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

  return (
    <div className="home-container">
      <TaskFilters
        search={search}
        statusFilter={statusFilter}
        statusOptions={STATUS_FILTER_OPTIONS}
        onSearchChange={setSearch}
        onStatusFilterChange={setStatusFilter}
        onResetFilters={() => {
          setSearch('');
          setStatusFilter('all');
        }}
        onNewItemClick={() => openCreateModal(COLUMNS[0].id)}
      />

      <TaskBoard
        columns={COLUMNS}
        tasks={filteredTasks}
        emptyText={hasActiveFilters ? 'Ничего не найдено' : 'Пока нет задач'}
        onAddColumnTask={openCreateModal}
        onTaskClick={openEditModal}
      />

      <TaskModal
        isOpen={isModalOpen}
        defaultColumn={defaultColumn}
        initialTask={editingTask}
        defaultAvatars={DEFAULT_TASK_AVATARS}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleSubmitTask}
        onDelete={() => editingTask && setTaskToDelete(editingTask)}
      />

      <ConfirmModal
        isOpen={Boolean(taskToDelete)}
        title="Удалить задачу?"
        message={`Вы уверены, что хотите удалить задачу "${taskToDelete?.title}"?`}
        onCancel={() => setTaskToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};
