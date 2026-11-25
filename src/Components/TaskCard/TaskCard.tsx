import './TaskCard.css';
import { ClipIcon, ClockIcon, FlagIcon } from '../Icons';
import { FlagStatus } from '../../types/IconTypes';

export interface TaskCardProps {
  title: string;
  description: string;
  date: string;
  tag?: string;
  attachmentsCount?: number;
  status?: FlagStatus;
  avatars?: string[];
  onClick?: () => void;
}

export function TaskCard({
  title,
  description,
  date,
  tag,
  attachmentsCount = 0,
  status = 'done',
  avatars = [],
  onClick,
}: TaskCardProps) {
  return (
    <div className={`task-card ${onClick ? 'task-card--clickable' : ''}`} onClick={onClick}>
      <div className="task-top">
        <h3 className="task-title">{title}</h3>
        {description && <p className="task-description">{description}</p>}
        {tag && <span className="task-tag">{tag}</span>}
      </div>

      <div className="task-divider" />

      <div className="task-bottom">
        <div className="task-meta">
          <div className="task-meta-item">
            <span className="task-icon-box">
              <ClipIcon disabled={attachmentsCount === 0} />
            </span>
            {attachmentsCount > 0 && <span className="task-meta-text">{attachmentsCount}</span>}
          </div>

          <span className="task-icon-box">
            <FlagIcon status={status} />
          </span>

          <div className="task-meta-item">
            <span className="task-icon-box">
              <ClockIcon />
            </span>
            <span className="task-meta-text">{date}</span>
          </div>
        </div>

        {avatars.length > 0 && (
          <div className="task-users">
            {avatars.map((src, index) => (
              <img key={index} src={src} alt={`User ${index + 1}`} className="task-avatar" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
