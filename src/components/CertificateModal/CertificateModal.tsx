import React, { useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import './CertificateModal.css';

Modal.setAppElement('#root');

interface CertificateModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  pdfUrl: string;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ isOpen, onRequestClose, pdfUrl }) => {
  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) {
      onRequestClose();
    }
  }, [isOpen, onRequestClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscapeKey]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Certificate Modal"
      className="modal"
      overlayClassName="overlay"
      closeTimeoutMS={300}
    >
      <div className="modal-content">
        <button 
          onClick={onRequestClose} 
          className="close-button" 
          aria-label="Close certificate viewer"
        >
          ✕
        </button>
        <iframe 
          src={pdfUrl} 
          title="Certificate" 
          className="pdf-viewer" 
          loading="eager"
          allowFullScreen
        />
      </div>
    </Modal>
  );
};

export default CertificateModal;