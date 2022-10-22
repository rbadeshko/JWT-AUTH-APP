import {Link, useNavigate} from "react-router-dom";
import {PathNavigation} from "../../../enums/NAVIGATION";
import React, {useEffect, useState} from "react";
import {authApi} from "api/authorization/authorization";
import {useAppDispatch} from "../../../store/hooks";
import {FormVariables} from "../../../types/FormTypes";
import {UniversalFormik} from "../UniversalFormik/UniversalFormik";
import {FormTemplate} from "../FormTemplate/FormTemplate";
import {Button} from "../../Button/Button";
import {FormInput} from "../FormTemplate/FormInput/FormInput";

export const SingUpForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isVisiblePass, setIsVisiblePass] = useState<boolean>(false);
    const [isSuccessRegistered, setIsSuccessRegistered] = useState<boolean>(false);

    useEffect(() => {
        isSuccessRegistered && navigate(PathNavigation.SING_IN)
    }, [isSuccessRegistered]);

    const togglePassword = () => {
        setIsVisiblePass(!isVisiblePass);
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
        const isBadMail = (badMail: boolean) => {
            !badMail && setIsSuccessRegistered(true);
        }
        authApi.registration(values.name, values.surname, values.email, values.password, isBadMail, dispatch);
    };
    const validationFields = {email: true, password: true, name: true, surname: true}
    const {
        formik,
        handleChangeWrapper
    } = UniversalFormik(validateOnChange, validateOnBlur, onSubmitAction, validationFields, initialValues);

    return (

        <div className="form form--singup">
            <h1 className="form__header">Register Account</h1>

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
                    <Button name={"Sign Up"} style={"button-signin--form"} type={"submit"}/>
                </>
            </FormTemplate>

            <p className="form__have-an-account">Already have an account?</p>
            <Link to={PathNavigation.SING_IN} className="link form-link link-signup">Sign In</Link>

        </div>

    )
}