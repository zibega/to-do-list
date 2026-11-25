import './TaskFilters.css';
import { Button, Input, Select, SelectOption } from '..';
import { FlagStatus } from '../../types/IconTypes';
import { SearchIcon } from '../Icons/SearchIcon';

export type StatusFilterValue = 'all' | FlagStatus;

export interface TaskFiltersProps {
  search: string;
  statusFilter: StatusFilterValue;
  statusOptions: SelectOption[];
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (status: StatusFilterValue) => void;
  onResetFilters: () => void;
  onNewItemClick: () => void;
}

export const TaskFilters = ({
  search,
  statusFilter,
  statusOptions,
  onSearchChange,
  onStatusFilterChange,
  onResetFilters,
  onNewItemClick,
}: TaskFiltersProps) => {
  const hasActiveFilters = Boolean(search.trim()) || statusFilter !== 'all';

  return (
    <div className="task-filters">
      <div className="task-filters-search">
        <Input
          type="search"
          placeholder="Search Items"
          leftIcon={<SearchIcon />}
          clearable
          fullWidth
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          onClear={() => onSearchChange('')}
        />
      </div>

      <div className="task-filters-actions">
        <div className="task-filters-status">
          <Select
            aria-label="Фильтр по статусу"
            fullWidth
            options={statusOptions}
            value={statusFilter}
            onChange={(e) =>
              onStatusFilterChange(e.target.value as StatusFilterValue)
            }
          />
        </div>

        {hasActiveFilters && (
          <Button variant="secondary" onClick={onResetFilters}>
            Сбросить
          </Button>
        )}

        <Button variant="primary" onClick={onNewItemClick}>
          New Item
        </Button>

        <Button variant="secondary" disabled>
          Board
        </Button>
      </div>
    </div>
  );
};