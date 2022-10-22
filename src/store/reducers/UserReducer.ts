import {UserType} from "types/UserType";
import {AppThunk, store} from "../index";
import {PatchServerResponse} from "../../enums/SERVER_RESPONSE_CODE";
import {usersApi} from "../../api/users/users";
import {auth, loading, modalMessage, notLoading, removeToken} from "./appReduser";
import {ModalBoxAnswer} from "../../enums/MODAL_BOX_ANSWER";
import {loadState, removeState} from "../../utils/state/state-util";
import {UsersArrayType, UserStateType} from "../type/store-types";


const SET_CURRENT_USER = 'SET_CURRENT_USER'
const SET_ALL_USERS = 'SET_ALL_USERS'
const UPDATE_USER = 'UPDATE_USERS'
const DELETE_USER = 'DELETE_USER'
const ADD_USER = "ADD_USER"


const initialState: UserStateType = {
    currentUser: {
        email: "",
        name: "",
        surname: "",
        id: "",
    },
    users: {
        count: 0,
        items: []
    },
}


export const userReducer = (state = initialState, action: UserActionsType): UserStateType => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            };
        case SET_ALL_USERS:
            return {
                ...state,
                users: action.payload
            }
        case ADD_USER:
            return {
                ...state,
                users: {
                    ...state.users,
                    items: [action.payload, ...state.users.items],
                    count: state.users.items.length + 1
                }
            }
        case UPDATE_USER:
            return {
                ...state,
                users: {
                    ...state.users,
                    items: state.users.items.map(item => item.id === action.payload.id ? action.payload : item)
                }
            }
        case DELETE_USER:
            return {
                ...state,
                users: {
                    ...state.users,
                    items: state.users.items.filter(item => item.id !== action.payload),
                    count: state.users.items.length - 1,
                }
            }
        default:
            return state;
    }
}

export type UserActionsType =
    SetCurrentUserType
    | GetAllUsersType
    | UpdateUserType
    | DeleteUserType
    | AddUserType

type SetCurrentUserType = ReturnType<typeof setCurrentUser>
type GetAllUsersType = ReturnType<typeof setAllUsers>
type UpdateUserType = ReturnType<typeof updateUser>
type DeleteUserType = ReturnType<typeof deleteUser>
type AddUserType = ReturnType<typeof addUser>
export const setCurrentUser = (user: UserType) => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    } as const
}
export const setAllUsers = (users: UsersArrayType) => {
    return {
        type: SET_ALL_USERS,
        payload: users
    } as const
}
export const addUser = (user: UserType) => {
    return {
        type: ADD_USER,
        payload: user
    } as const
}
export const updateUser = (user: UserType) => {
    return {
        type: UPDATE_USER,
        payload: user
    } as const
}
export const deleteUser = (id: string) => {
    return {
        type: DELETE_USER,
        payload: id
    } as const
}

export const setCurrentUserTC = (token: string): AppThunk => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            let res = await usersApi(token).me();
            if (res.status === PatchServerResponse.SUCCESS_REQUEST) {
                dispatch(auth()); //set isLoginIn true
                dispatch(setCurrentUser(res.data))
                dispatch(modalMessage(false, ModalBoxAnswer.SUCCESSFUL_LOGIN));
            }
        } catch (response) {
            dispatch(removeToken());
            removeState();
            dispatch(modalMessage(true, ModalBoxAnswer.SOMETHING_IS_WRONG));
            console.log("Error set current: ", response);
        } finally {
            dispatch(notLoading());
        }
    }
}

export const getAllUsersTC = (token: string): AppThunk => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            if (token) {
                let allUsers = await usersApi(token).getUsers();
                dispatch(setAllUsers(allUsers.data))
            }
        } catch (error: any) {
            dispatch(modalMessage(true, ModalBoxAnswer.SOMETHING_IS_WRONG))
            console.log("Error get all users: ", error.response);
        } finally {
            dispatch(notLoading());
        }
    }
}
export const addUserTC = (email: string, password: string, name: string, surname: string, id: string, callBack: (successAdded: boolean) => void): AppThunk => {
    let stateToken = loadState().app.token;
    return async (dispatch) => {
        dispatch(loading());
        try {
            let res = await usersApi(stateToken).addUser(email, password, name, surname/*, ""*/);
            if (res.status === PatchServerResponse.USER_ADDED) {
                dispatch(addUser(res.data))
                callBack(true);
                dispatch(modalMessage(false, ModalBoxAnswer.USER_ADDED))
            }
        } catch (error: any) {
            dispatch(modalMessage(true, ModalBoxAnswer.USER_ADDING_ERROR))
            console.log(error)
        } finally {
            dispatch(notLoading());
        }
    }
}

export const updateUserTC = (email: string, name: string, surname: string, id: string): AppThunk => {
    let stateToken = loadState().app.token;
    return async (dispatch) => {
        dispatch(loading());
        try {
            let updateUserResponse = await usersApi(stateToken).updateUser(email, name, surname, id);
            if (updateUserResponse.status === PatchServerResponse.SUCCESS_REQUEST) {

                dispatch(updateUser(updateUserResponse.data));

                dispatch(modalMessage(false, ModalBoxAnswer.SUCCESS_USER_UPDATED));
            }
        } catch (error: any) {
            dispatch(modalMessage(true, ModalBoxAnswer.ERROR_USER_UPDATED));
            console.log(error)
        } finally {
            dispatch(notLoading());
        }
    }
}

export const updateCurrentUserTC = (email: string, name: string, surname: string, id: string): AppThunk => {
    let stateToken = loadState().app.token;
    return async (dispatch) => {
        dispatch(loading());
        try {
            let res = await usersApi(stateToken).updateUser(email, name, surname, id);
            if (res.status === PatchServerResponse.SUCCESS_REQUEST) {

                dispatch(updateUser(res.data));
                dispatch(setCurrentUser(res.data));

                dispatch(modalMessage(false, ModalBoxAnswer.SUCCESS_CURRENT_USER_UPDATED))
            }
        } catch (error: any) {
            dispatch(modalMessage(true, ModalBoxAnswer.ERROR_USER_UPDATED));
            console.log(error)
        } finally {
            dispatch(notLoading());
        }
    }
}
export const removeUserTC = (token: string, id: string): AppThunk => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            let removeUser = await usersApi(token).removeUser(id);
            if (removeUser.status === PatchServerResponse.SUCCESS_USER_DELETED) {
                dispatch(deleteUser(id));
                dispatch(modalMessage(false, ModalBoxAnswer.SUCCESS_USER_DELETED))
            }
        } catch (error: any) {
            if (error.response.status === PatchServerResponse.USER_NOT_FOUND) {
                dispatch(modalMessage(true, ModalBoxAnswer.USER_NOT_FOUND))
            } else {
                dispatch(modalMessage(true, ModalBoxAnswer.SOMETHING_IS_WRONG))
            }
            console.log(error)
        } finally {
            dispatch(notLoading());
        }
    }
}