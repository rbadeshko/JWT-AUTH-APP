import React from 'react';
import "./Button.css"

type ButtonPropsType = {
    name: string,
    type?: "button" | "submit" | "reset" | undefined
    form?: "round" | "square"
    style?: string,
    callBack?: () => void | undefined
}

export const Button = (Props: ButtonPropsType) => {
    const {type, name, form, style, callBack} = Props;
    let combStyle = "";
    if (style) combStyle += style;
    if (form) combStyle += " button__" + form;
    return (
        <button type={type} className={"button " + combStyle} onClick={callBack}>{name}</button>
    );
};