import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import styles from './modal.module.css'

export default function Modaldialog({
  customClasses,
  show,
  onClose,
  children,
  title,
  modelSize
}) {
  // const [show, setShow] = useState(true);
  // console.log("opn", isOpen, children, title)

  const customCls = customClasses | "";
  return (
    <>
      <Modal
        show={show}
        onHide={() => onClose()}
        dialogClassName={"modal-90w " + customClasses}
        size={modelSize}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter" className="modalTitle">
            {title}
          </Modal.Title>
          <button type="button" className="close" onClick={onClose} data-dismiss="modal" aria-label="Close" aria-hidden="true"> X
          </button>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
      </Modal>
    </>
  );
}


class GradientModal extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickClose = this.handleClickClose.bind(this)
    this.onClose = this.props.onClose || function () { }
    this.styles = { ...styles, ...props.customstyles }
  }

  handleClickClose() {
    this.onClose()
  }

  handleHide() {
    return
  }

  render() {
    return (
      <Modal
        show={this.props.isOpen}
        className={styles.root + ' ghModalComponent'}
        onHide={() => this.props.onClose()}
      >
        <Modal.Header className={styles.modalHeader} >
          <Modal.Title id="contained-modal-title-vcenter" className={styles.modalTitle}>
            {this.props.title}
          </Modal.Title>
          <button type="button" className="close" onClick={this.props.onClose} data-dismiss="modal" aria-label="Close" aria-hidden="true" style={{
            fontFamily: "Gotham-Book",
            fontSize: "26px"
          }}>
            X
          </button>
        </Modal.Header>
        <Modal.Body>
          {this.props.children}
        </Modal.Body>
      </Modal>
    )
  }
}

Modaldialog.defaultProps = {
  modelSize: "xl"
}

export { GradientModal };
