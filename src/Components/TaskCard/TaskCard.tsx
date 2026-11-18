import { useEffect, useRef, useState } from 'react';
import './TaskCard.css';
import { ClipIcon, ClockIcon, FlagIcon, FlagStatus } from '../Icons';
import avatar1 from '../../Assets/Avatar.png';
import avatar2 from '../../Assets/Avatar1.png';
import avatar3 from '../../Assets/Avatar2.png';

const FLAG_STATUSES: FlagStatus[] = ['done', 'in progress', 'reject'];

export interface TaskCardProps {
  title?: string;
  description?: string;
  tag?: string;
  attachmentsCount?: number;
  flagStatus?: FlagStatus;
  onFlagStatusChange?: (status: FlagStatus) => void;
  date?: string;
  avatars?: string[];
}

export function TaskCard({
  title = 'User Research',
  description = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque ...',
  tag = 'Maecenas Lacus',
  attachmentsCount = 3,
  flagStatus = 'done',
  onFlagStatusChange,
  date = 'Mar 4',
  avatars = [avatar1, avatar2, avatar3],
}: TaskCardProps) {
  const [status, setStatus] = useState<FlagStatus>(flagStatus);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectStatus = (nextStatus: FlagStatus) => {
    setStatus(nextStatus);
    setIsOpen(false);
    onFlagStatusChange?.(nextStatus);
  };

  return (
    <div className="task-card">
      <div className="task-top">
        <h3 className="task-title">{title}</h3>
        <p className="task-description">{description}</p>
        <span className="task-tag">{tag}</span>
      </div>

      <div className="task-divider" />

      <div className="task-bottom">
        <div className="task-meta">
          <div className="task-meta-item">
            <span className="task-icon-box">
              <ClipIcon />
            </span>
            <span className="task-meta-text">{attachmentsCount}</span>
          </div>

          <div className="task-flag-dropdown-wrap" ref={dropdownRef}>
            <button
              type="button"
              className="task-flag-btn"
              onClick={() => setIsOpen(!isOpen)}
              title="Выбрать статус"
            >
              <FlagIcon status={status} />
            </button>

            {isOpen && (
              <div className="task-flag-dropdown">
                {FLAG_STATUSES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`task-flag-option ${
                      status === item ? 'task-flag-option--active' : ''
                    }`}
                    onClick={() => handleSelectStatus(item)}
                  >
                    <FlagIcon status={item} />
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="task-meta-item">
            <span className="task-icon-box">
              <ClockIcon />
            </span>
            <span className="task-meta-text">{date}</span>
          </div>
        </div>

        <div className="task-users">
          {avatars.map((src, index) => (
            <img key={index} src={src} alt={`User ${index + 1}`} className="task-avatar" />
          ))}
        </div>
      </div>
    </div>
  );
}
