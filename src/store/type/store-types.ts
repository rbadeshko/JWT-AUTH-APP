import {UserType} from "types/UserType";

export interface UsersArrayType {
    count: number,
    items: UserType[]
}

export interface UserStateType {
    currentUser: UserType,
    users: UsersArrayType
}