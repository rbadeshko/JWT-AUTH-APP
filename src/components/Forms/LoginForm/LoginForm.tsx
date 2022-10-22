import "components/Forms/forms.css"
import React, {ChangeEvent, useEffect, useState} from "react";
import {FormikProps, useFormik} from 'formik';
import {Link, Navigate, useNavigate} from "react-router-dom";
import {PathNavigation} from "enums/NAVIGATION";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";

import {Button} from "../../Button/Button";
import {loginTC} from "../../../store/reducers/appReduser";
import {validation} from "../../../utils/validation/form-validation-utils";
import {FormVariables} from "../../../types/FormTypes";
import {UniversalFormik} from "../UniversalFormik/UniversalFormik";
import {FormInput} from "../FormTemplate/FormInput/FormInput";
import {FormTemplate} from "../FormTemplate/FormTemplate";

export const LoginForm = () => {

    let dispatch = useAppDispatch();
    //const isLoading = useAppSelector(state => state.app.isLoading);



    /* SETTING FORMIK FUNCTION */
    let validateOnChange = false;
    let validateOnBlur = false;
    const initialValues = {
        email: '',
        password: '',
        name: '',
        surname: '',
    }
    const onSubmitAction = (values:FormVariables) => {dispatch(loginTC(values.email, values.password))};
    const validationFields = {email: true, password: true, name: false, surname: false}
    const {
        formik,
        handleChangeWrapper
    } = UniversalFormik(validateOnChange, validateOnBlur, onSubmitAction, validationFields, initialValues);

    return (

        <div className="form form--singin">
            <h1 className="form__header">Sign In</h1>
            <FormTemplate mainStyle={""} onSubmit={formik.handleSubmit}>

                <>
                    <FormInput
                      label={"E-mail"}
                      name={"email"}
                      style={"input-block--email"}
                      placeholder={"xavier.d@gmail.com"}
                      type={"text"}
                      onChangeHandle={(e) => {
                        handleChangeWrapper(e);
                    }}
                      value={formik.values.email}
                      error={formik.errors.email}
                      touch={formik.touched.email}/>

                    <FormInput
                        label={"Password"}
                        name={"password"}
                        style={"input-block--pass input-block--last"}
                        placeholder={"xavier.d@gmail.com"}
                        onChangeHandle={(e) => {
                            handleChangeWrapper(e);}}
                        value={formik.values.password}
                        error={formik.errors.password}
                        touch={formik.touched.password}
                    />
                    <Button name={"Sign In"} style={"button-signin--form"} type={"submit"}/>
                </>
            </FormTemplate>
            <p className="form__have-an-account">Don't have an account?</p>
            <Link to={PathNavigation.SING_UP} className="link form-link link-signup">Sign Up</Link>
        </div>

    )
}