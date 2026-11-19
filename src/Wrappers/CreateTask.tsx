import React, { useState } from 'react';
import './CreateTask.css';
import { Button, Input, Modal, TaskCard, TaskCardProps } from '../components';
import { FlagStatus } from '../types';

export function CreateTask() {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState<TaskCardProps[]>([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [date, setDate] = useState('');
  const [attachmentsCount, setAttachmentsCount] = useState('');
  const [status, setStatus] = useState<FlagStatus>('done');

  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    date?: string;
  }>({});

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setTag('');
    setDate('');
    setAttachmentsCount('');
    setStatus('done');
    setErrors({});
  };

  const handleClose = () => {
    setIsOpen(false);
    resetForm();
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors: typeof errors = {};
    if (!title.trim()) nextErrors.title = 'Введите заголовок задачи';
    if (!description.trim()) nextErrors.description = 'Введите описание задачи';
    if (!date.trim()) nextErrors.date = 'Укажите дату';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const newTask: TaskCardProps = {
      title: title.trim(),
      description: description.trim(),
      date: date.trim(),
      tag: tag.trim() || undefined,
      attachmentsCount: Number(attachmentsCount) || 0,
      status,
    };

    setTasks((prev) => [...prev, newTask]);
    console.log('Создана задача:', newTask);
    handleClose();
  };

  return (
    <div className="create-task-section">
      <Button variant="primary" size="md" leftIcon="➕" onClick={() => setIsOpen(true)}>
        Создать задачу
      </Button>

      {tasks.length > 0 && (
        <div className="create-task-list">
          {tasks.map((task, index) => (
            <TaskCard key={index} {...task} />
          ))}
        </div>
      )}

      <Modal isOpen={isOpen} onClose={handleClose} title="Создание новой задачи">
        <form className="create-task-form" onSubmit={handleSubmit}>
          <Input
            label="Заголовок"
            placeholder="Например: User Research"
            fullWidth
            value={title}
            error={errors.title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors((prev) => ({ ...prev, title: undefined }));
            }}
          />

          <Input
            label="Описание"
            placeholder="Опишите задачу"
            fullWidth
            value={description}
            error={errors.description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors((prev) => ({ ...prev, description: undefined }));
            }}
          />

          <Input
            label="Тег"
            placeholder="Например: Sprint 8"
            fullWidth
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />

          <Input
            label="Дата"
            placeholder="Например: Mar 4"
            fullWidth
            value={date}
            error={errors.date}
            onChange={(e) => {
              setDate(e.target.value);
              setErrors((prev) => ({ ...prev, date: undefined }));
            }}
          />

          <Input
            type="number"
            min={0}
            label="Количество вложений"
            placeholder="0"
            fullWidth
            value={attachmentsCount}
            onChange={(e) => setAttachmentsCount(e.target.value)}
          />

          <div className="create-task-select-field">
            <label htmlFor="task-status" className="create-task-select-label">
              Статус
            </label>
            <select
              id="task-status"
              className="create-task-select"
              value={status}
              onChange={(e) => setStatus(e.target.value as FlagStatus)}
            >
              <option value="done">done</option>
              <option value="in progress">in progress</option>
              <option value="reject">reject</option>
            </select>
          </div>

          <div className="create-task-actions">
            <Button variant="secondary" onClick={handleClose}>
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
}
