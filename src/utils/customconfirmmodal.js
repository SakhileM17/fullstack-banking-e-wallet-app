import React from 'react';
import '../css/main.css';

const Customconfirmmodal = ({ heading, message, onConfirm, onCancel }) => {

  

  return (
    
    <div className='modal-container'>
      
      <div className='success-modal-header-container'>
        
        <div className='success-modal-heading'>
          
          <h2>{heading}</h2>
          
        </div>

      </div>

      <div className='success-modal-header-container'>

        <div className='success-modal-text'>

          <p> {message} </p>

        </div>

      </div>
      
      <div className='modal-button-container'>

        <button className='modal-button-confirm' onClick={onConfirm}>
          Confirm
        </button>
        <button className='modal-button-cancel' onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Customconfirmmodal;