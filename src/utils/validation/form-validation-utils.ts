import {FormikProps} from "formik";
import {FormikErrorType, FormVariables, validationFieldsType} from "../../types/FormTypes";

export const validation = (
    formik: FormikProps<FormVariables>,
    values: FormVariables,
    validationFields: validationFieldsType
) => {
    let errors: FormikErrorType = {};

    if (validationFields.email) {
        if (!values.email) {
            errors.email = '-required';
        } else if (!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i.test(values.email)) {
            errors.email = '- Invalid email address';
        }
    }

    if (validationFields.password) {
        if (!values.password) {
            errors.password = '- required';
        } else {
            const minNameLength = 2;
            const maxNameLength = 10;
            if (values.password.length < minNameLength) {
                errors.password = '- at least 2 characters';
            }
            if (values.password.length > maxNameLength) {
                errors.password = 'maximum 10 characters';
            }
        }
    }
    if (validationFields.name) {
        if (!values.name) {
            errors.name = '- required';
        } else {
            const minNameLength = 3;
            const maxNameLength = 15;
            if (values.name.length < minNameLength) {
                errors.name = '- at least 3 characters';
            }
            if (values.name.length > maxNameLength) {
                errors.name = 'maximum 15 characters';
            }
        }
    }
    if (validationFields.surname) {
        if (!values.surname) {
            errors.surname = '- required';
        } else {
            const minNameLength = 3;
            const maxNameLength = 15;
            if (values.surname.length < minNameLength) {
                errors.surname = '- at least 3 characters';
            }
            if (values.surname.length > maxNameLength) {
                errors.surname = 'maximum 15 characters';
            }
        }
    }
    return errors;
}