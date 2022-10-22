export interface validationFieldsType {
    email: boolean
    password: boolean
    name: boolean
    surname: boolean
}

export interface FormikErrorType {
    email?: string
    password?: string
    name?: string
    surname?: string
}
export interface FormVariables {
    email: string
    password: string
    name: string
    surname: string
}