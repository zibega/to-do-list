import React, { useEffect, useState } from 'react';
import './CreateTaskModal.css';
import avatar1 from '../../assets/Avatar.png';
import { Button, Input, Modal, Select } from '..';
import { FlagStatus } from '../../types';
import { BoardTask, ColumnId, COLUMNS } from '../TaskBoard';

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

export interface CreateTaskModalProps {
  isOpen: boolean;
  defaultColumn: ColumnId;
  onClose: () => void;
  onCreateTask: (task: BoardTask) => void;
}

export const CreateTaskModal = ({
  isOpen,
  defaultColumn,
  onClose,
  onCreateTask,
}: CreateTaskModalProps) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setForm({ ...EMPTY_FORM, column: defaultColumn });
      setError('');
    }
  }, [isOpen, defaultColumn]);

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

    onCreateTask(newTask);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Новая задача">
      <form className="create-task-modal-form" onSubmit={handleSubmit}>
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
          onChange={(e) =>
            setForm({ ...form, attachmentsCount: e.target.value })
          }
        />
        <Select
          label="Колонка"
          fullWidth
          options={COLUMN_OPTIONS}
          value={form.column}
          onChange={(e) =>
            setForm({ ...form, column: e.target.value as ColumnId })
          }
        />
        <Select
          label="Статус"
          fullWidth
          options={STATUS_OPTIONS}
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value as FlagStatus })
          }
        />

        {error && <span className="create-task-modal-error">{error}</span>}

        <div className="create-task-modal-actions">
          <Button variant="secondary" onClick={onClose}>
            Отмена
          </Button>
          <Button type="submit" variant="primary">
            Создать
          </Button>
        </div>
      </form>
    </Modal>
  );
};