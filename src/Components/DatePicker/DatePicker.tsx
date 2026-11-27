import { useEffect, useRef, useState } from 'react';
import './DatePicker.css';
import { Button, Input } from '..';
import { CalendarIcon } from '../Icons';

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const defaultFormatDate = (date: Date) =>
  date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

const parseDateValue = (val?: string): Date | null => {
  if (!val) return null;
  const hasYear = /\d{4}/.test(val);
  const parsed = new Date(hasYear ? val : `${val}, ${new Date().getFullYear()}`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export interface DatepickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  formatDate?: (date: Date) => string;
}

export const Datepicker = ({
  value,
  onChange,
  label,
  placeholder = 'Выберите дату',
  error,
  fullWidth = false,
  disabled = false,
  formatDate = defaultFormatDate,
}: DatepickerProps) => {
  const selectedDate = parseDateValue(value);
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState<Date>(() => selectedDate ?? new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstDayIndex).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const today = new Date();
  const monthLabel = viewDate.toLocaleDateString('ru-RU', {
    month: 'long',
    year: 'numeric',
  });

  const handleToggle = () => {
    if (disabled) return;
    if (!isOpen) {
      setViewDate(selectedDate ?? new Date());
    }
    setIsOpen((prev) => !prev);
  };

  const handleSelectDay = (day: number) => {
    const picked = new Date(year, month, day);
    onChange(formatDate(picked));
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`datepicker-container ${fullWidth ? 'datepicker-container--full-width' : ''}`}
    >
      <Input
        readOnly
        disabled={disabled}
        label={label}
        placeholder={placeholder}
        error={error}
        fullWidth={fullWidth}
        value={value}
        rightIcon={
          <span className="datepicker-icon-btn" onClick={handleToggle}>
            <CalendarIcon />
          </span>
        }
        className="datepicker-input-wrapper"
        onClick={handleToggle}
      />

      {isOpen && (
        <div className="datepicker-popup">
          <div className="datepicker-header">
            <Button
              variant="secondary"
              size="sm"
              className="datepicker-nav-btn"
              onClick={() => setViewDate(new Date(year, month - 1, 1))}
              aria-label="Предыдущий месяц"
            >
              ‹
            </Button>

            <span className="datepicker-month-label">{monthLabel}</span>

            <Button
              variant="secondary"
              size="sm"
              className="datepicker-nav-btn"
              onClick={() => setViewDate(new Date(year, month + 1, 1))}
              aria-label="Следующий месяц"
            >
              ›
            </Button>
          </div>

          <div className="datepicker-grid">
            {WEEKDAYS.map((day) => (
              <span key={day} className="datepicker-weekday">
                {day}
              </span>
            ))}

            {cells.map((day, index) => {
              if (!day) return <span key={`empty-${index}`} />;

              const cellDate = new Date(year, month, day);
              const isSelected = Boolean(selectedDate && isSameDay(cellDate, selectedDate));
              const isToday = isSameDay(cellDate, today);

              const dayClasses = [
                'datepicker-day-btn',
                isToday ? 'datepicker-day-btn--today' : '',
                isSelected ? 'datepicker-day-btn--selected' : '',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <Button
                  key={day}
                  variant="secondary"
                  size="sm"
                  className={dayClasses}
                  onClick={() => handleSelectDay(day)}
                >
                  {day}
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
