import {resetModalMessage} from "store/reducers/appReduser";
import {AppDispatchType} from "../../store";

const DELAY = 3000;

export const hideMessage = (dispatch: AppDispatchType) => {
    setTimeout(()=>{
        dispatch(resetModalMessage());
    }, DELAY)
}

export const showMessage = () => {

}