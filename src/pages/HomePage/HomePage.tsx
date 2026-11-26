import React, { useState } from 'react';
import './HomePage.css';
import { CreateTaskModal } from '../../components/CreateTaskModal';
import { BoardTask, ColumnId, COLUMNS, TaskBoard } from '../../components/TaskBoard';
import { StatusFilterValue, TaskFilters } from '../../components/TaskFilters';

const STATUS_FILTER_OPTIONS = [
  { value: 'all', label: 'Все статусы' },
  { value: 'done', label: 'done' },
  { value: 'in progress', label: 'in progress' },
  { value: 'reject', label: 'reject' },
];

export const HomePage = () => {
  const [tasks, setTasks] = useState<BoardTask[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilterValue>('all');
  const [isOpen, setIsOpen] = useState(false);
  const [defaultColumn, setDefaultColumn] = useState<ColumnId>('todo');

  const openModal = (column: ColumnId = 'todo') => {
    setDefaultColumn(column);
    setIsOpen(true);
  };

  const handleCreateTask = (newTask: BoardTask) => {
    setTasks((prev) => [...prev, newTask]);
    setSearch('');
    setIsOpen(false);
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
        onNewItemClick={() => openModal('todo')}
      />

      <TaskBoard
        columns={COLUMNS}
        tasks={filteredTasks}
        emptyText={hasActiveFilters ? 'Ничего не найдено' : 'Пока нет задач'}
        onAddColumnTask={openModal}
      />

      <CreateTaskModal
        isOpen={isOpen}
        defaultColumn={defaultColumn}
        onClose={() => setIsOpen(false)}
        onCreateTask={handleCreateTask}
      />
    </div>
  );
};
