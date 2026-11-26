import './TaskBoard.css';
import { Button, TaskCard, TaskCardProps } from '..';

export type ColumnId = 'todo' | 'in_progress' | 'in_review' | 'done';

export interface BoardTask extends TaskCardProps {
  id: string;
  column: ColumnId;
}

export const COLUMNS: { id: ColumnId; title: string }[] = [
  { id: 'todo', title: 'To do' },
  { id: 'in_progress', title: 'In Progress' },
  { id: 'in_review', title: 'In Review' },
  { id: 'done', title: 'Done' },
];

export interface TaskBoardProps {
  columns: { id: ColumnId; title: string }[];
  tasks: BoardTask[];
  emptyText?: string;
  onAddColumnTask: (column: ColumnId) => void;
  onTaskClick?: (task: BoardTask) => void;
}

export const TaskBoard = ({
  columns,
  tasks,
  emptyText = 'Пока нет задач',
  onAddColumnTask,
  onTaskClick,
}: TaskBoardProps) => {
  return (
    <div className="task-board">
      {columns.map((col) => {
        const columnTasks = tasks.filter((t) => t.column === col.id);

        return (
          <section key={col.id} className="board-column">
            <div className="board-column-header">
              <div className="board-column-title-wrap">
                <h2 className="board-column-title">{col.title}</h2>
                <span className="board-column-count">{columnTasks.length}</span>
              </div>

              <div className="board-column-controls">
                <Button
                  variant="secondary"
                  size="sm"
                  className="board-column-circle-btn"
                  onClick={() => onAddColumnTask(col.id)}
                  title={`Добавить в ${col.title}`}
                >
                  +
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="board-column-circle-btn"
                  title="Опции колонки"
                >
                  &middot;&middot;&middot;
                </Button>
              </div>
            </div>

            <div className="board-column-tasks">
              {columnTasks.length > 0 ? (
                columnTasks.map((task) => {
                  const { id, column: _, ...cardProps } = task;
                  return (
                    <TaskCard
                      key={id}
                      {...cardProps}
                      onClick={onTaskClick ? () => onTaskClick(task) : undefined}
                    />
                  );
                })
              ) : (
                <p className="board-column-empty">{emptyText}</p>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
};
