import React, {useState} from "react";
import "./AddUser.css"
import {useAppDispatch} from "../../../store/hooks";
import {addUserTC} from "../../../store/reducers/UserReducer";
import {FormVariables} from "../../../types/FormTypes";
import {UniversalFormik} from "../../Forms/UniversalFormik/UniversalFormik";
import {FormInput} from "../../Forms/FormTemplate/FormInput/FormInput";
import {Button} from "../../Button/Button";
import {FormTemplate} from "../../Forms/FormTemplate/FormTemplate";

interface AddUser {
    //if true = close Popup
    callBack?: (isTrue: boolean) => void
}

export const AddUser = ( Props: AddUser) => {
    const {callBack} = Props;
    const dispatch = useAppDispatch();

    const [isVisiblePass, setIsVisiblePass] = useState<boolean>(false);

    const togglePassword = () => {
        setIsVisiblePass(!isVisiblePass);
    }

    const onClickCloseButton = () => {
        callBack && callBack(true);
        formik.resetForm()
    }

    /*SETTING FORMIK FUNCTION*/
    let validateOnChange = false;
    let validateOnBlur = false;
    const initialValues = {
        email: '',
        password: '',
        name: '',
        surname: '',
    }
    const onSubmitAction = (values: FormVariables) => {
        let resultAddUser = (result: boolean) => {
            callBack && result && callBack(result);
            result && formik.resetForm();
        }
        dispatch(addUserTC(values.email, values.password, values.name, values.surname, "", resultAddUser))
    };
    const validationFields = {email: true, password: true, name: true, surname: true}
    const {
        formik,
        handleChangeWrapper
    } = UniversalFormik(validateOnChange, validateOnBlur, onSubmitAction, validationFields, initialValues);


    return (
        <div className={"form form--add-user"}>
                <div className="close-button form__close-button form__close-button--white" onClick={onClickCloseButton}></div>
            <h1 className="form__header">Add New User</h1>
            <FormTemplate mainStyle={""} onSubmit={formik.handleSubmit}>

                <>
                    <FormInput label={"Name"} name={"name"} style={"input-block--name"} placeholder={"Xavier"} type={"text"} onChangeHandle={(e) => {
                        handleChangeWrapper(e);
                    }} value={formik.values.name} error={formik.errors.name} touch={formik.touched.name}/>

                    <FormInput label={"Surname"} name={"surname"} style={"input-block--surname"} placeholder={"Gabriele"} type={"text"} onChangeHandle={(e) => {
                        handleChangeWrapper(e);
                    }} value={formik.values.surname} error={formik.errors.surname} touch={formik.touched.surname}/>

                    <FormInput label={"E-mail"} name={"email"} style={"input-block--email"} placeholder={"xavier.d@gmail.com"} type={"text"} onChangeHandle={(e) => {
                        handleChangeWrapper(e);
                    }} value={formik.values.email} error={formik.errors.email} touch={formik.touched.email}/>

                    <FormInput
                        label={"Password"}
                        name={"password"}
                        style={"input-block--pass input-block--last"}
                        placeholder={"xavier.d@gmail.com"}
                        type={isVisiblePass ? "text" : "password"}
                        onChangeHandle={(e) => {
                            handleChangeWrapper(e);}}
                        value={formik.values.password}
                        error={formik.errors.password}
                        touch={formik.touched.password}
                    />
                    <Button name={"Add User"} style={"button-signin--form"} type={"submit"}/>
                </>
            </FormTemplate>
        </div>
    )
}