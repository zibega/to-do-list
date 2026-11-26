import React, { useEffect, useRef, useState } from 'react';
import './TaskModal.css';
import { Button, Input, Modal, Select } from '..';
import { FlagStatus } from '../../types/IconTypes';
import { BoardTask, ColumnId } from '../TaskBoard';
import { INPUT_FIELDS, InputFieldName, SELECT_FIELDS } from './taskModalFields';

const EMPTY_FORM = {
  title: '',
  description: '',
  tag: '',
  date: '',
  attachmentsCount: '',
  status: 'done' as FlagStatus,
  column: 'todo' as ColumnId,
};

export interface TaskModalProps {
  isOpen: boolean;
  defaultColumn: ColumnId;
  initialTask?: BoardTask | null;
  defaultAvatars?: string[];
  onClose: () => void;
  onSubmit: (taskData: Omit<BoardTask, 'id'>) => void;
  onDelete?: () => void;
}

export const TaskModal = ({
  isOpen,
  defaultColumn,
  initialTask,
  defaultAvatars = [],
  onClose,
  onSubmit,
  onDelete,
}: TaskModalProps) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<InputFieldName, string>>>({});
  const titleInputRef = useRef<HTMLInputElement>(null);

  const isEditMode = Boolean(initialTask);

  useEffect(() => {
    if (!isOpen) return;

    if (initialTask) {
      setForm({
        title: initialTask.title,
        description: initialTask.description,
        tag: initialTask.tag ?? '',
        date: initialTask.date,
        attachmentsCount: String(initialTask.attachmentsCount ?? 0),
        status: initialTask.status ?? 'done',
        column: initialTask.column,
      });
    } else {
      setForm({ ...EMPTY_FORM, column: defaultColumn });
    }

    setErrors({});
    setTimeout(() => titleInputRef.current?.focus(), 0);
  }, [isOpen, initialTask, defaultColumn]);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors: Partial<Record<InputFieldName, string>> = {};
    INPUT_FIELDS.forEach((field) => {
      if (field.required && !form[field.name].trim()) {
        nextErrors[field.name] = field.errorText;
      }
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSubmit({
      column: form.column,
      title: form.title.trim(),
      description: form.description.trim(),
      date: form.date.trim(),
      tag: form.tag.trim() || undefined,
      attachmentsCount: Number(form.attachmentsCount) || 0,
      status: form.status,
      avatars: initialTask?.avatars ?? defaultAvatars,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? 'Редактировать задачу' : 'Новая задача'}
    >
      <form className="task-modal-form" onSubmit={handleSubmit}>
        {INPUT_FIELDS.map((field) => (
          <Input
            key={field.name}
            ref={field.name === 'title' ? titleInputRef : undefined}
            type={field.type}
            min={field.min}
            label={field.label}
            placeholder={field.placeholder}
            fullWidth
            value={form[field.name]}
            error={errors[field.name]}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, [field.name]: e.target.value }));
              setErrors((prev) => ({ ...prev, [field.name]: undefined }));
            }}
          />
        ))}

        {SELECT_FIELDS.map((field) => (
          <Select
            key={field.name}
            label={field.label}
            fullWidth
            options={field.options}
            value={form[field.name]}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, [field.name]: e.target.value }) as typeof EMPTY_FORM)
            }
          />
        ))}

        <div className="task-modal-actions">
          {isEditMode && onDelete && (
            <Button variant="danger" className="task-modal-delete-btn" onClick={onDelete}>
              Удалить
            </Button>
          )}
          <Button variant="secondary" onClick={onClose}>
            Отмена
          </Button>
          <Button type="submit" variant="primary">
            {isEditMode ? 'Сохранить' : 'Создать'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
