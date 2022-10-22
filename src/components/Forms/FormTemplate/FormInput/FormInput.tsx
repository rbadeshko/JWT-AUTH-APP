import "components/Forms/forms.css";
import React, { ChangeEvent, useState } from "react";

interface FormInputType {
  label: string;
  name: string;
  style?: string;
  placeholder?: string;
  type?: "text" | "password";
  onChangeHandle: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  error?: string;
  touch?: boolean;
}

export const FormInput = (Props: FormInputType) => {
  console.log("render FormInput");
  const { label, style, name, placeholder, type, onChangeHandle, value, error, touch } = Props;
  const [isVisiblePass, setIsVisiblePass] = useState<boolean>(false);

  const togglePassword = () => {
    setIsVisiblePass(!isVisiblePass);
  };
  return (
    <div className={`input-block ${style}`}>
      <label htmlFor={name}
             className={`label input-block__label ${error ? "label-error__red" : ""}`}>{label} {touch && error ? error : null}</label>
      <input
        type={!type ? "text" : "password"}
        className="input input-block__input"
        placeholder={placeholder}
        name={name}
        onChange={(e) => {
          onChangeHandle(e);
        }}
        value={value}
      />
      <>
        {!type && <div className={!isVisiblePass ? "password-eye" : "password-eye password-eye__visible"}
                     onClick={togglePassword}></div>}
      </>
    </div>

  );
};