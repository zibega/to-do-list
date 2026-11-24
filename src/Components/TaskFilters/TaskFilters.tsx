import './TaskFilters.css';
import { Button, Input } from '..';
import { SearchIcon } from '../Icons/SearchIcon';

export interface TaskFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  onNewItemClick: () => void;
}

export const TaskFilters = ({ search, onSearchChange, onNewItemClick }: TaskFiltersProps) => {
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
        <Button variant="primary" onClick={onNewItemClick}>
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
  );
};
