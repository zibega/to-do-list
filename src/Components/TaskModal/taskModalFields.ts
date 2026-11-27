import { ColumnId, COLUMNS } from '../TaskBoard';

export type InputFieldName = 'title' | 'description' | 'tag' | 'attachmentsCount';

export type SelectFieldName = 'column' | 'status';

export interface InputFieldConfig {
  name: InputFieldName;
  label: string;
  placeholder: string;
  type?: string;
  min?: number;
  required?: boolean;
  errorText?: string;
}

export const INPUT_FIELDS: InputFieldConfig[] = [
  {
    name: 'title',
    label: 'Заголовок',
    placeholder: 'Например: User Research',
    required: true,
    errorText: 'Введите заголовок задачи',
  },
  {
    name: 'description',
    label: 'Описание',
    placeholder: 'Опишите задачу',
    required: true,
    errorText: 'Введите описание задачи',
  },
  {
    name: 'tag',
    label: 'Тег',
    placeholder: 'Например: Sprint 9',
  },
  {
    name: 'attachmentsCount',
    label: 'Количество вложений',
    placeholder: '0',
    type: 'number',
    min: 0,
  },
];

export const SELECT_FIELDS: {
  name: SelectFieldName;
  label: string;
  options: { value: string; label: string }[];
}[] = [
  {
    name: 'column',
    label: 'Колонка',
    options: COLUMNS.map((col) => ({ value: col.id, label: col.title })),
  },
  {
    name: 'status',
    label: 'Статус',
    options: [
      { value: 'done', label: 'done' },
      { value: 'in progress', label: 'in progress' },
      { value: 'reject', label: 'reject' },
    ],
  },
];

export type { ColumnId };
