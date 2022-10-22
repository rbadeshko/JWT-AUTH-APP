import "./Users.css"
import {getAllUsersTC, removeUserTC} from "../../store/reducers/UserReducer";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useEffect, useState} from "react";
import {Button} from "../Button/Button";
import {modalMessage} from "../../store/reducers/appReduser";
import {ModalBoxAnswer} from "../../enums/MODAL_BOX_ANSWER";
import {Popup} from "../Popup/Popup";
import {AddUser} from "./AddUser/AddUser";
import {PathNavigation} from "../../enums/NAVIGATION";
import {Link} from "react-router-dom";

export const Users = () => {
    let dispatch = useAppDispatch();
    const storeToken = useAppSelector(state=> state.app.token);
    const users = useAppSelector(state => state.user.users);
    const currentUserId = useAppSelector(state => state.user.currentUser.id);

    const [isActivePopup, setIsActivePopup] = useState(false);


    useEffect(() => {
        dispatch(getAllUsersTC(storeToken));
    }, []);

    const addUserResult = (result: boolean) => {
        result && setIsActivePopup(false);
    }
    return (
        <div className={"users-block"}>
            <div className="users-block__header">
                <h1 className={"users-block__count"}>All Users - {users.count}</h1>
                <div className="adduser--button">
                    <Button name={"Add new user"} callBack={() => {
                        setIsActivePopup(true)
                    }}/>
                </div>
            </div>


            <div className="users-table">
                <div className="user-table__header">
                    <div className="user-table__block user-table__block--name">Name</div>
                    <div className="user-table__block user-table__block--surname">Surname</div>
                    <div className="user-table__block user-table__block--email">E-mail</div>
                    <div className="user-table__block user-table__block--action">Actions</div>
                </div>
                <ul className="users-list">
                    {users.items.map(item => {
                        return (
                            <li key={item.id} className="user-item">
                                <div className="user-list__block user-list__block--name">{item.name}</div>
                                <div className="user-list__block user-list__block--surname">{item.surname}</div>
                                <div className="user-list__block user-list__block--email">{item.email}</div>
                                <div className="user-list__block user-list__block--action">
                                    <div className={`profile-action__item profile-action__item--delete`} onClick={()=>{
                                        if(item.id !== currentUserId) {
                                            dispatch(removeUserTC(storeToken, item.id))
                                        } else {
                                            dispatch(modalMessage(true, ModalBoxAnswer.DENIED_USER_DELETED))
                                        }}}
                                    >

                                    </div>
                                    <Link className={"profile-action__item profile-action__item--edit"} to={`${PathNavigation.USER_PROFILE}/${item.id}`}></Link>
                                </div>
                            </li>
                        )
                    })}
                </ul>

            </div>
            <Popup isActive={isActivePopup} setActive={setIsActivePopup}>
                <AddUser callBack={addUserResult}/>
            </Popup>

        </div>
    );
};
