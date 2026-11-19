import React, { useEffect, useRef } from 'react';
import './Modal.css';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal-dialog"
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      <div className="modal-content">
        <div className="modal-header">
          {title && <h2 className="modal-title">{title}</h2>}
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Закрыть модальное окно"
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </dialog>
  );
}
