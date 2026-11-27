import { Controller, useForm } from 'react-hook-form';
import './TaskModal.css';
import { Button, Input, Modal, Select } from '..';
import { FlagStatus } from '../../types/IconTypes';
import { BoardTask, ColumnId } from '../TaskBoard';
import { INPUT_FIELDS, SELECT_FIELDS } from './taskModalFields';
import { Datepicker } from '../DatePicker';

interface TaskFormValues {
  title: string;
  description: string;
  tag: string;
  date: string;
  attachmentsCount: string;
  status: FlagStatus;
  column: ColumnId;
}

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
  const isEditMode = Boolean(initialTask);

  const { control, handleSubmit } = useForm<TaskFormValues>({
    defaultValues: {
      title: initialTask?.title ?? '',
      description: initialTask?.description ?? '',
      tag: initialTask?.tag ?? '',
      date: initialTask?.date ?? '',
      attachmentsCount: String(initialTask?.attachmentsCount ?? ''),
      status: initialTask?.status ?? 'done',
      column: initialTask?.column ?? defaultColumn,
    },
  });

  const handleFormSubmit = (data: TaskFormValues) => {
    onSubmit({
      column: data.column,
      title: data.title.trim(),
      description: data.description.trim(),
      date: data.date.trim(),
      tag: data.tag.trim() || undefined,
      attachmentsCount: Number(data.attachmentsCount) || 0,
      status: data.status,
      avatars: initialTask?.avatars ?? defaultAvatars,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? 'Редактировать задачу' : 'Новая задача'}
    >
      <form className="task-modal-form" onSubmit={handleSubmit(handleFormSubmit)}>
        {INPUT_FIELDS.map((fieldConfig) => (
          <Controller
            key={fieldConfig.name}
            name={fieldConfig.name}
            control={control}
            rules={
              fieldConfig.required
                ? {
                    required: fieldConfig.errorText,
                    validate: (val) => val.trim().length > 0 || fieldConfig.errorText,
                  }
                : undefined
            }
            render={({ field, fieldState }) => (
              <Input
                ref={field.ref}
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                autoFocus={fieldConfig.name === 'title'}
                type={fieldConfig.type}
                min={fieldConfig.min}
                label={fieldConfig.label}
                placeholder={fieldConfig.placeholder}
                fullWidth
                error={fieldState.error?.message}
              />
            )}
          />
        ))}
        <Controller
          name="date"
          control={control}
          rules={{
            required: 'Укажите дату',
            validate: (val) => val.trim().length > 0 || 'Укажите дату',
          }}
          render={({ field, fieldState }) => (
            <Datepicker
              label="Дата"
              placeholder="Выберите дату"
              fullWidth
              value={field.value}
              error={fieldState.error?.message}
              onChange={field.onChange}
            />
          )}
        />

        {SELECT_FIELDS.map((fieldConfig) => (
          <Controller
            key={fieldConfig.name}
            name={fieldConfig.name}
            control={control}
            render={({ field }) => (
              <Select
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                label={fieldConfig.label}
                fullWidth
                options={fieldConfig.options}
              />
            )}
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
