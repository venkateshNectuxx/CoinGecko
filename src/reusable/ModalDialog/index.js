import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import {Button} from 'react-bootstrap';
import './modal.scss'

export default function Modaldialog({
  show,
  onClose,
  children,
  title,
  modelSize
}) {

  return (
    <>
      <Modal
        show={show}
        onHide={() => onClose()}
        size={modelSize}
        centered
        contentClassName='modalContent'
      >
        <Modal.Header className='modalHeader'>
          <Modal.Title  className="modalTitle">
            {title}
          </Modal.Title>
          <Button type="button" className="closeBtn rounded-circle btn-secondary" onClick={onClose} data-dismiss="modal" aria-label="Close" aria-hidden="true"> 
          X
          </Button>
        </Modal.Header>
        <Modal.Body className='modalBody'>
          {children}
        </Modal.Body>
      </Modal>
    </>
  );
}

Modaldialog.defaultProps = {
  modelSize: "md"
}

export { Modaldialog };
