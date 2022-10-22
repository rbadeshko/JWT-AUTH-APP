import "components/Forms/forms.css"
import React, {ChangeEvent} from "react";
import {FormikProps, useFormik} from 'formik';
import {validation} from "utils/validation/form-validation-utils";
import {FormVariables, validationFieldsType} from "types/FormTypes";


export const UniversalFormik = (validateOnChange:boolean, validateOnBlur:boolean, onSubmitAction:(values:FormVariables)=>void, validationFields: validationFieldsType, initialValues:FormVariables) => {

    const formik: FormikProps<FormVariables> = useFormik<FormVariables>({
        initialValues: initialValues,
        validateOnChange: validateOnChange,
        validateOnBlur: validateOnBlur,
        validate: (values) => {
            return validation(formik, values, validationFields);
        },
        onSubmit: (values, {resetForm}) => {
            onSubmitAction(values);
        }
    })

    const handleChangeWrapper = (e: ChangeEvent<HTMLInputElement>) => {
        formik.setFieldError(e.target.name, undefined);
        formik.handleChange(e);
    };
    return {formik, handleChangeWrapper};
}
