import { useState } from 'react';
import './HomePage.css';
import { CreateTaskModal } from '../components/CreateTaskModal';
import { BoardTask, ColumnId, COLUMNS, TaskBoard } from '../components/TaskBoard';
import { TaskFilters } from '../components/TaskFilters';

export const HomePage = () => {
  const [tasks, setTasks] = useState<BoardTask[]>([]);
  const [search, setSearch] = useState('');
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

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div className="home-container">
      <TaskFilters
        search={search}
        onSearchChange={setSearch}
        onNewItemClick={() => openModal('todo')}
      />

      <TaskBoard
        columns={COLUMNS}
        tasks={filteredTasks}
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