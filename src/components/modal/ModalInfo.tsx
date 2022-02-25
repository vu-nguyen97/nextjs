import React from "react";
import { Modal } from "react-bootstrap";

interface ModalProps {
  isOpen: boolean;
  children: any;
  title?: string;
  onHide: () => void;
}

export const ModalInfo = ({ isOpen, children, title, onHide }: ModalProps) => {
  return (
    <Modal centered show={isOpen} onHide={onHide}>
      <Modal.Body className="text-center">
        {title && <Modal.Title className="mb-3">{title}</Modal.Title>}

        {children}
      </Modal.Body>
    </Modal>
  );
};
