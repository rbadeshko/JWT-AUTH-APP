import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux"
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {userReducer} from "./reducers/UserReducer";
import {appReducer} from "./reducers/appReduser";
import {loadState, saveState} from "../utils/state/state-util";

export const rootReducer = combineReducers({
    app: appReducer,
    user: userReducer,
});

export const store = createStore(rootReducer, loadState(), composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(() => {
    if (store.getState().app.token) {
        saveState({
            app: {
                token: store.getState().app.token,
                isLoggedIn: false,
                isLoading: false,
                isMessage: false,
                isError: false,
                message: null
            },
            user: {
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
        })
    }

})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatchType = ThunkDispatch<RootState, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>



