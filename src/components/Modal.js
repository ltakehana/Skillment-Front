import React from 'react';
import '../styles/components/modal.css';

const Modal = ({ id = 'modal', onClose = () => { }, children }) => {

  const handleOutsideClick = (e) => {
    if (e.target.id === id) onClose();
  };

  return (
    <div id={id} className="modal" onClick={handleOutsideClick}>
      <div id="modal-container">
        <div id="close-modal-container">
          <button onClick={onClose} id="close-modal-button" type="button">
            <span className="material-icons">
              close
            </span>
          </button>
        </div>
        <div id="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
