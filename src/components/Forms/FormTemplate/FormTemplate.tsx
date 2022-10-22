import "components/Forms/forms.css"
import React, { ReactElement, useEffect, useState} from "react";

interface FormTemplateType {
    mainStyle?: string;
    onSubmit: ()=> void
    children: ReactElement | string | number
}

export const FormTemplate = (Props: FormTemplateType) => {
    const {mainStyle, onSubmit, children} = Props;
    return (
            <form action="/" onSubmit={onSubmit}>
                <div className="form__body">
                    {children}
                </div>
            </form>

    )
}