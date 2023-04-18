import React from "react";

const ConfirmModal = ({ showModal, toggle, onConfirm }) => {
  const onClose = () => {
    toggle();
  };
  return (
    <div className={`modal ${showModal && "modal-open"}`}>
      <div className='modal-box'>
        <div className='card-body items-csenter text-center'>
          <h2 className='card-title'>Warning!</h2>
          <p>Are you sure about that?</p>
          <div className='modal-action justify-center'>
            <button className='btn btn-sm btn-outline' onClick={onClose}>
              Cancel
            </button>
            <button
              className='btn btn-sm btn-outline btn-error'
              onClick={onConfirm}
            >
              Absolutely!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
