import React from 'react';
import './ConfirmModal.css';
import { Button, Modal } from '..';

export interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Удалить',
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title}>
      <p className="confirm-modal-text">{message}</p>
      <div className="confirm-modal-actions">
        <Button variant="secondary" onClick={onCancel}>
          Отмена
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
};