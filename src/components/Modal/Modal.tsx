import React, {ReactElement} from 'react';
import "./Modal.css"

interface ModalType {
    message?: string | null
    isActive?: boolean
    isError?: boolean
    children?: ReactElement | string | number
}

export const Modal = ({message, isActive, isError /*children*/}: ModalType) => {
    let blockClass = "modal-box";
    isActive && (blockClass += " active");
    if(isError){
        blockClass += " modal-box__error";
    } else {
        blockClass += " modal-box__message";
    }
    return (
        <div className={blockClass}>
            <div className="modal__body">{message}</div>
        </div>
    );
}
