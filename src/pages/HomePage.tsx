import React, { useState } from 'react';
import './HomePage.css';
import avatar1 from '../assets/Avatar.png';
import { Button, Input, Modal, Select, TaskCard, TaskCardProps } from '../components';
import { FlagStatus } from '../types';
import { SearchIcon } from '../components';

type ColumnId = 'todo' | 'in_progress' | 'in_review' | 'done';

interface BoardTask extends TaskCardProps {
  id: string;
  column: ColumnId;
}

const COLUMNS: { id: ColumnId; title: string }[] = [
  { id: 'todo', title: 'To do' },
  { id: 'in_progress', title: 'In Progress' },
  { id: 'in_review', title: 'In Review' },
  { id: 'done', title: 'Done' },
];

const COLUMN_OPTIONS = COLUMNS.map((col) => ({
  value: col.id,
  label: col.title,
}));

const STATUS_OPTIONS = [
  { value: 'done', label: 'done' },
  { value: 'in progress', label: 'in progress' },
  { value: 'reject', label: 'reject' },
];

const EMPTY_FORM = {
  title: '',
  description: '',
  tag: '',
  date: '',
  attachmentsCount: '',
  status: 'done' as FlagStatus,
  column: 'todo' as ColumnId,
};

export const HomePage = () => {
  const [tasks, setTasks] = useState<BoardTask[]>([]);
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState('');

  const openModal = (column: ColumnId = 'todo') => {
    setForm({ ...EMPTY_FORM, column });
    setError('');
    setIsOpen(true);
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.title.trim() || !form.description.trim() || !form.date.trim()) {
      setError('Заполните заголовок, описание и дату');
      return;
    }

    const newTask: BoardTask = {
      id: String(Date.now()),
      column: form.column,
      title: form.title.trim(),
      description: form.description.trim(),
      date: form.date.trim(),
      tag: form.tag.trim() || undefined,
      attachmentsCount: Number(form.attachmentsCount) || 0,
      status: form.status,
      avatars: [avatar1],
    };

    setTasks((prev) => [...prev, newTask]);
    setSearch('');
    setIsOpen(false);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <div className="home-container">
      <div className="home-top">
        <div className="home-search">
          <Input
            type="text"
            placeholder="Search Items"
            leftIcon={<SearchIcon/>}
            clearable
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch('')}
          />
        </div>

        <div className="home-actions">
          <Button variant="primary" onClick={() => openModal('todo')}>
            New Item
          </Button>
          <Button variant="secondary" disabled>
            Filter
          </Button>
          <Button variant="secondary" disabled>
            Board
          </Button>
        </div>
      </div>

      <div className="home-board">
        {COLUMNS.map((col) => {
          const columnTasks = filteredTasks.filter((t) => t.column === col.id);

          return (
            <section key={col.id} className="board-column">
              <div className="board-column-header">
                <div className="board-column-title-wrap">
                  <h2 className="board-column-title">{col.title}</h2>
                  <span className="board-column-count">{columnTasks.length}</span>
                </div>
                <div className="board-column-controls">
                  <button
                    type="button"
                    className="board-column-circle-btn"
                    onClick={() => openModal(col.id)}
                    title={`Добавить в ${col.title}`}
                  >
                    +
                  </button>
                  <button type="button" className="board-column-circle-btn">
                    ...
                  </button>
                </div>
              </div>

              <div className="board-column-tasks">
                {columnTasks.map(({ id, column: _, ...cardProps }) => (
                  <TaskCard key={id} {...cardProps} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Новая задача">
        <form className="home-modal-form" onSubmit={handleSubmit}>
          <Input
            label="Заголовок"
            placeholder="Например: User Research"
            fullWidth
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <Input
            label="Описание"
            placeholder="Опишите задачу"
            fullWidth
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <Input
            label="Тег"
            placeholder="Например: Sprint 9"
            fullWidth
            value={form.tag}
            onChange={(e) => setForm({ ...form, tag: e.target.value })}
          />
          <Input
            label="Дата"
            placeholder="Mar 4"
            fullWidth
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <Input
            type="number"
            min={0}
            label="Вложения"
            placeholder="0"
            fullWidth
            value={form.attachmentsCount}
            onChange={(e) => setForm({ ...form, attachmentsCount: e.target.value })}
          />
          <Select
            label="Колонка"
            fullWidth
            options={COLUMN_OPTIONS}
            value={form.column}
            onChange={(e) => setForm({ ...form, column: e.target.value as ColumnId })}
          />
          <Select
            label="Статус"
            fullWidth
            options={STATUS_OPTIONS}
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as FlagStatus })}
          />

          {error && <span style={{ color: '#ff0000', fontSize: 13 }}>{error}</span>}

          <div className="home-modal-actions">
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Отмена
            </Button>
            <Button type="submit" variant="primary">
              Создать
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
