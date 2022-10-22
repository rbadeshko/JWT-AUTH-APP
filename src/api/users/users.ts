import {instanceWithToken} from "../config";
import {PathAdditionalEndpoint} from "enums/ADDITIONAL_ENDPOINTS";
import {UserType} from "types/UserType";
import {UsersArrayType} from "store/type/store-types";

export const usersApi = (token: string | null) => {
    const defaultConfig = {
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        }
    };
    return {
        me: () => {
            return instanceWithToken.get<UserType>(PathAdditionalEndpoint.ME, defaultConfig)
        },
        getUsers: () => {
            const response = instanceWithToken.get<UsersArrayType>(PathAdditionalEndpoint.USERS, defaultConfig);
            return response;

        },
        addUser: (email: string, password: string, name: string, surname: string, ) => {
            const response = instanceWithToken.post(PathAdditionalEndpoint.USERS, {
                email,
                password,
                name,
                surname,
            }, defaultConfig);
            return response
        },
        updateUser: (email: string,  name: string, surname: string, id: string) => {
            const response = instanceWithToken.put(`${PathAdditionalEndpoint.USERS}/${id}`, {
                email,
                name,
                surname,
                id,
            },defaultConfig);
            return response
        },
        removeUser: (id: string) => {
            const response = instanceWithToken.delete(`${PathAdditionalEndpoint.USERS}/${id}`, defaultConfig);
            return response
        },
    }
}







