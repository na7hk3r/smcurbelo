import React from 'react';
import Modal from 'react-modal';
import './CertificateModal.css';

Modal.setAppElement('#root');

const CertificateModal = ({ isOpen, onRequestClose, pdfUrl }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Certificate Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <button onClick={onRequestClose} className="close-button">X</button>
        <iframe src={pdfUrl} title="Certificate" className="pdf-viewer" />
      </div>
    </Modal>
  );
};

export default CertificateModal;