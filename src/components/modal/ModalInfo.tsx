import React from "react";
import { Modal } from "react-bootstrap";

interface ModalProps {
  isOpen: boolean;
  children: any;
  title?: string;
  onHide: () => void;
  size?: any;
}

export const ModalInfo = ({
  isOpen,
  children,
  title,
  onHide,
  size,
  ...rest
}: ModalProps) => {
  return (
    <Modal size={size} centered show={isOpen} onHide={onHide} {...rest}>
      <Modal.Body className="text-center">
        {title && <Modal.Title className="mb-3">{title}</Modal.Title>}

        {children}
      </Modal.Body>
    </Modal>
  );
};
