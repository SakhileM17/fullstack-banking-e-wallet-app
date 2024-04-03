import React from 'react';
import '../css/main.css';

import EKQiLogo from '../assets/EKQiLogo.svg'; 
import SuccessCheck from '../assets/checkSign.svg'

const CustomSuccessModal = ({ heading,message, onConfirm, onCancel }) => {

  return (
    
    <div className='modal-container'>
      

    <div className='success-modal-header-container'>

      <div className='success-modal-text'>

        <p> {message} </p>

      </div>

    </div>

    <div className='success-modal-header-container'>

      <div className='success-modal-text'>

        <img src={SuccessCheck} alt='EKQiLogo'className='successcheck'/>

      </div>

    </div>

    <div className='success-modal-header-container'>

      <div className='success-modal-text'>

        <p> Click contiune to proceed back to the menu.  </p>

      </div>

    </div>
    
    <div className='modal-button-container'>

      <button className='modal-button-confirm' onClick={onConfirm}>
         Continue
      </button>
      
    </div>
  </div>
  );
};

export default CustomSuccessModal ;