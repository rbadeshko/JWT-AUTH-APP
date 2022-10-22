import {instanceWithToken} from "../config";
import {PathAdditionalEndpoint} from "../../enums/ADDITIONAL_ENDPOINTS";
import {PatchServerResponse} from "enums/SERVER_RESPONSE_CODE";
import {AuthAnswerLoginType} from "../types/ApiFormTypes";
import {ModalBoxAnswer} from "../../enums/MODAL_BOX_ANSWER";
import {loading, modalMessage, notLoading} from "../../store/reducers/appReduser";
import {AppDispatchType} from "../../store";

export const authApi = {

    registration: async (firstName: string, secondName: string, email: string, pass: string, badMail: (badMail:boolean)=> void, dispatch: AppDispatchType) => {
        dispatch(loading());
        try {
            const response = await instanceWithToken.post(PathAdditionalEndpoint.SIGN_UP, {
                name: firstName,
                surname: secondName,
                email: email,
                password: pass,
            });
            if (response.status === PatchServerResponse.SUCCESS_REGISTRATION) {
                badMail(false);
                dispatch(modalMessage(false, ModalBoxAnswer.SUCCESS_REGISTRATION));
            }
        } catch (error: any) {
            console.log("error", error.response.status)
            switch (error.response.status) {
                case PatchServerResponse.EMAIL_ALREADY_EXISTS :
                    return dispatch(modalMessage(true, ModalBoxAnswer.EMAIL_ALREADY_EXISTS));
                default:
                    return null;
            }
        } finally {
            dispatch(notLoading());
        }
    },
    login: (email: string, pass: string) => {
                const response =  instanceWithToken.post<AuthAnswerLoginType>(PathAdditionalEndpoint.SIGN_IN, {
                    email: email,
                    password: pass,
                });
        return response
    }
}







