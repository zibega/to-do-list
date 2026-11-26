import avatar1 from '../assets/Avatar.png';
import { StatusFilterValue } from '../components/TaskFilters';

export interface StatusFilterOption {
  value: StatusFilterValue;
  label: string;
}

export const STATUS_FILTER_OPTIONS: StatusFilterOption[] = [
  { value: 'all', label: 'Все статусы' },
  { value: 'done', label: 'done' },
  { value: 'in progress', label: 'in progress' },
  { value: 'reject', label: 'reject' },
];

export const DEFAULT_TASK_AVATARS: string[] = [avatar1];