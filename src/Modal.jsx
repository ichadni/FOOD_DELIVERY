import React from 'react';
import ReactDOM from 'react-dom';

const MODAL_STYLE = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgb(34,34,34)',
  zIndex: 1000,
  height: '90%',
  width: '80%',
  borderRadius: '8px',
  padding: '20px',
  overflowY: 'auto'
};

const OVERLAY_STYLE = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.7)',
  zIndex: 999
};

export default function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLE} onClick={onClose} />

      <div style={MODAL_STYLE}>
        
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '22px',
            width: '36px',
            height: '36px',
            cursor: 'pointer'
          }}
        >
          &times;
        </button>

        {children}
      </div>
    </>,
    document.getElementById('cart-root')
  );
}
