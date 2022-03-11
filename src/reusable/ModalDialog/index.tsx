import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { modalProps } from "./typings";
import "./modal.scss";

/**
 * component is for to display modal window 
 * @param {*} props 
 * @returns modal dialog with html
 */
export default function Modaldialog({
  show,
  onClose,
  children,
  title,
  modelSize,
  fullscreen
}: modalProps) {
  return (
    <Modal
      show={show}
      onHide={() => onClose()}
      size={modelSize}
      centered
      contentClassName="modalContent"
      fullscreen={fullscreen}
    >
      <Modal.Header className="modalHeader">
        <Modal.Title className="modalTitle">{title}</Modal.Title>
        <Button
          type="button"
          className="closeBtn rounded-circle btn-secondary"
          onClick={onClose}
          data-dismiss="modal"
          aria-label="Close"
          aria-hidden="true"
        >
          X
        </Button>
      </Modal.Header>
      <Modal.Body className="modalBody">{children}</Modal.Body>
    </Modal>
  );
}

//default props declared here
Modaldialog.defaultProps = {
  modelSize: "lg", // sm, md, lg
  fullscreen: false
};

export { Modaldialog };
