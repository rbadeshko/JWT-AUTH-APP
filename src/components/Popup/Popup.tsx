import React, {ReactElement} from 'react';
import "./Popup.css"

interface PopupType {
    isActive: boolean
    setActive: (status: boolean) => void
    children?: ReactElement | string | number
}

export const Popup = ({isActive, setActive, children}: PopupType) => {
    let blockClass = "popup-box";
    isActive && (blockClass += " active");
    isActive && (document.body.style.overflow = 'hidden');
    !isActive && (document.body.style.overflow = '');

    return (
        <div className={blockClass} onClick={() => {setActive(false)}}>
            <div className="popup-box__body" onClick={(e) => {
                e.stopPropagation()
            }}>{children}</div>
        </div>
    );
}
