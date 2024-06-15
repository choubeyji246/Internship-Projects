import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import Button from './AtomComponents/Button';

const Modal = ({ children, onClose }) => {
    const dialog = useRef();

    const handleClose = () => {
        onClose();
    };
 
    useEffect(() => {
        if (dialog.current) {   
            dialog.current.showModal();
        } 
    }, []);

    return createPortal(
        <dialog ref={dialog} className="modal">
            <div className="modal-content">
                <Button className="close-btn" onClick={handleClose} >
                    &times;
                </Button>
                {children}
            </div>
        </dialog>,
        document.getElementById("modal")
    );
};

export default Modal;
