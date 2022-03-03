import React from "react";
import { Button, Modal } from "react-bootstrap";

interface ModalProps {
  isOpen: boolean;
  children: any;
  title?: string;
  size?: any;
  onHide: () => void;
  onSubmit: () => void;
  submitBtn?: string;
  submitSize?: any;
  submitVariant?: string;
}

export const ModalConfirm = ({
  isOpen,
  children,
  title,
  size = "sm",
  onHide,
  onSubmit,
  submitBtn = "Ok",
  submitSize,
  submitVariant,
  ...rest
}: ModalProps) => {
  return (
    <Modal size={size} centered show={isOpen} onHide={onHide} {...rest}>
      <Modal.Body className="text-center">
        {title && <Modal.Title className="mb-3">{title}</Modal.Title>}

        {children}

        <div className="d-flex justify-content-center mt-3">
          <Button
            className="me-3"
            size={submitSize}
            variant={submitVariant}
            onClick={() => {
              onSubmit();
              onHide();
            }}
          >
            {submitBtn}
          </Button>
          <Button size={submitSize} variant="outline-dark" onClick={onHide}>
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
