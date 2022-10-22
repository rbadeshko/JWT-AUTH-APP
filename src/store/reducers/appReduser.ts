import {authApi} from "../../api/authorization/authorization";
import {AppThunk} from "../index";
import {PatchServerResponse} from "../../enums/SERVER_RESPONSE_CODE";
import {setCurrentUserTC} from "./UserReducer";
import {removeState} from "../../utils/state/state-util";
import {ModalBoxAnswer} from "../../enums/MODAL_BOX_ANSWER";

const AUTH = 'AUTH'
const SET_TOKEN = 'SET_TOKEN'
const REMOVE_TOKEN = 'REMOVE_TOKEN'
const LOGOUT = 'LOGOUT'
const LOADING = 'LOADING'
const NOT_LOADING = 'NOT_LOADING'
const MESSAGE = 'MESSAGE'
const RESET_MESSAGE = 'RESET_MESSAGE'

export interface AuthState {
    token: string
    isLoggedIn: boolean,
    isLoading: boolean,
    isMessage: boolean
    isError: boolean
    message: null | string,

}

const initialState: AuthState = {
    token: "",
    isLoggedIn: false,
    isLoading: false,
    isMessage: false,
    isError: false,
    message: null,
}

export const appReducer = (state = initialState, action: ActionAppType): AuthState => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload,
            }
        case AUTH:
            return {...state, isLoggedIn: true}
        case REMOVE_TOKEN:
            return {
                ...state,
                token: "",
                isLoggedIn: false
            }
        case LOGOUT:
            removeState();
            return {
                ...state,
                token: "",
                isMessage: true,
                message: ModalBoxAnswer.SUCCESSFUL_LOGOUT,
                isLoggedIn: false
            }
        case LOADING:
            return {
                ...state,
                isLoading: true
            }
        case NOT_LOADING:
            return {
                ...state,
                isLoading: false
            }
        case MESSAGE :
            return {
                ...state,
                isMessage: true,
                isError: action.payload.isError,
                message: action.payload.message
            }
        case RESET_MESSAGE :
            return {
                ...state,
                isMessage: false,
                isError: false,
                message: null
            }
        default:
            return state;
    }
}

export type ActionAppType =
    AuthActionType
    | SetTokenType
    | RemoveTokenType
    | LogOutActionType
    | LoadingActionType
    | NotLoadingActionType
    | ModalMessageActionType
    | ResetModalMessageActionType

type AuthActionType = ReturnType<typeof auth>
type SetTokenType = ReturnType<typeof setToken>
type RemoveTokenType = ReturnType<typeof removeToken>
type LogOutActionType = ReturnType<typeof logOut>
type LoadingActionType = ReturnType<typeof loading>
type NotLoadingActionType = ReturnType<typeof notLoading>
type ModalMessageActionType = ReturnType<typeof modalMessage>
type ResetModalMessageActionType = ReturnType<typeof resetModalMessage>

export const auth = () => {
    return {
        type: AUTH,
    } as const
}
export const setToken = (token: string) => {
    return {
        type: SET_TOKEN,
        payload: token
    } as const
}
export const removeToken = () => {
    return {
        type: REMOVE_TOKEN,
    } as const
}
export const logOut = () => {
    return {
        type: LOGOUT,
    } as const
}
export const loading = () => {
    return {
        type: LOADING,
    } as const
}
export const notLoading = () => {
    return {
        type: NOT_LOADING,
    } as const
}
export const modalMessage = (isError: boolean, message: string | null) => {
    return {
        type: MESSAGE,
        payload: {isError, message}
    } as const
}
export const resetModalMessage = () => {
    return {
        type: RESET_MESSAGE,
    } as const
}

export const loginTC = (email: string, pass: string): AppThunk => {
    return async (dispatch) => {
        dispatch(loading());
        try {

            const res = await authApi.login(email, pass);
            if (res.status === PatchServerResponse.SUCCESS_REQUEST) {
                dispatch(setToken(res.data.accessToken));
                dispatch(setCurrentUserTC(res.data.accessToken))
            }
        } catch (error: any) {
            switch (error.response.status) {
                case PatchServerResponse.BAD_MAIL_OR_PASS :
                    return dispatch(modalMessage(true, ModalBoxAnswer.BAD_MAIL_OR_PASS))
                case PatchServerResponse.USER_NOT_VALIDATED :
                    return dispatch(modalMessage(true, ModalBoxAnswer.USER_NOT_VALIDATED));
                default:
                    return null;
            }
        } finally {
            dispatch(notLoading());
        }

    }
}





