import React, { ReactNode, useRef } from 'react';
import './index.css'

export const Gmodal = ({ isOpen, onClose, children, className }) => {
    const overlayRef = useRef(null);
    const mainRef = useRef(null);

    if (!isOpen) {
        return null; 
    }

    function clickClose(e){
        if (e.target === overlayRef.current) {
            onClose();
        }
    }

    function escClose (e){
        if (e.key === 'Escape'){
            onClose();
        }
        return  window.removeEventListener('keydown', escClose);
    }

    window.addEventListener('keydown', escClose);

    return (
    <div className='overlay' onClick={clickClose} ref={overlayRef}>
        <div className={className} ref={mainRef}>
            {children}
        </div>
    </div>
    )
}
