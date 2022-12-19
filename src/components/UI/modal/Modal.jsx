import React from "react";
import stl from './Modal.module.css'
import axios from 'axios';

const Modal = ({setShowModal, ...props}) => {

    return(
        <div className={[stl.modal, stl.active].join(' ')} onClick={() => setShowModal(false)}>
                <div className={stl.modal__content} onClick={(e) => e.stopPropagation()}>
                    {props.children}
                </div>
        </div>
    )
}

export default Modal