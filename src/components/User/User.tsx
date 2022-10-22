import React, {ChangeEvent, useEffect, useState} from "react";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import "./User.css"
import userAvatar from 'assets/img/user.png'
import {logOut, modalMessage} from "../../store/reducers/appReduser";
import {useAppDispatch, useAppSelector} from "store/hooks";
import {PathNavigation} from "../../enums/NAVIGATION";
import {Button} from "../Button/Button";
import {ModalBoxAnswer} from "enums/MODAL_BOX_ANSWER";
import {UniversalFormik} from "../Forms/UniversalFormik/UniversalFormik";
import {FormVariables} from "../../types/FormTypes";
import {FormInput} from "../Forms/FormTemplate/FormInput/FormInput";
import {FormTemplate} from "../Forms/FormTemplate/FormTemplate";
import {updateCurrentUserTC, updateUserTC} from "../../store/reducers/UserReducer";


interface UserComponentType {
    isCurrent: boolean
}

export const User = (props: UserComponentType) => {

    let {isCurrent} = props;
    let param = useParams();

    const dispatch = useAppDispatch();
    const appState = useAppSelector(state => state.app);
    const userState = useAppSelector(state => state.user);
    const isAuth = appState.isLoggedIn;
    const currentUser = userState.currentUser;
    const navigate = useNavigate();
    const userById = param && userState.users.items.find(item => item.id === param.id)
    const user = !isCurrent ? userById : currentUser;

    const [userName, setUserName] = useState("");
    const [userSurname, setUserSurname] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);


    useEffect(() => {
        if (!isAuth) navigate(PathNavigation.SING_IN);
        setUserName("")
        setUserSurname("")
        setIsEditMode(false)
        param.id === currentUser.id && navigate(PathNavigation.MY_PROFILE);
    }, [user]);

    /*SETTING FORMIK FUNCTION*/
    let validateOnChange = false;
    let validateOnBlur = false;
    const initialValues = {
        email: '',
        password: '',
        name: userName,
        surname: userSurname,
    }


    const onSubmitAction = (values: FormVariables) => {
        !isCurrent && dispatch(updateUserTC(user?.email ?? "", values.name, values.surname, user?.id ?? ""));
        isCurrent && dispatch(updateCurrentUserTC(user?.email ?? "", values.name, values.surname, user?.id ?? ""));
        setIsEditMode(false);
    };
    const validationFields = {email: false, password: false, name: true, surname: true}
    const {
        formik,
        handleChangeWrapper
    } = UniversalFormik(validateOnChange, validateOnBlur, onSubmitAction, validationFields, initialValues);

    const getCurrenNameInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.currentTarget.value)
    }
    const getCurrenSurNameInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setUserSurname(e.currentTarget.value)
    }
    /*SETTING FORMIK FUNCTION*/

    formik.values.name = userName;
    formik.values.surname = userSurname;

    const onClickEditHandle = () => {
        setIsEditMode(true)
        setUserName(user?.name ?? "No Name")
        setUserSurname(user?.surname ?? "No Name")
    }

    return (
        <>
            {user &&

                <div className="block user-block">
                    <h1 className="block__header">{isCurrent? "Current User Information" : "User Information"}</h1>
                    <div className="user-image-container">
                        <img className="user-image" src={userAvatar} alt="Avatar"/>
                    </div>
                    <div className="user-info-block">
                        <div className="user-block--name">
                            <span className="full-name">
                                {`${user.name} ${user.surname}`}
                            </span>
                            <div className={isEditMode ? "edit-button _hide" : "edit-button"} onClick={onClickEditHandle}></div>
                        </div>
                        {isEditMode && <FormTemplate mainStyle={""} onSubmit={formik.handleSubmit}>

                            <>
                                <FormInput label={"Name"} name={"name"} style={"input-block--name"}
                                           placeholder={"Xavier"} type={"text"} onChangeHandle={(e) => {
                                    handleChangeWrapper(e);
                                    getCurrenNameInputValue(e);
                                }} value={userName} error={formik.errors.name} touch={formik.touched.name}/>

                                <FormInput label={"Surname"} name={"surname"} style={"input-block--surname"}
                                           placeholder={"Gabriele"} type={"text"} onChangeHandle={(e) => {
                                    handleChangeWrapper(e);
                                    getCurrenSurNameInputValue(e);
                                }} value={userSurname} error={formik.errors.surname}
                                           touch={formik.touched.surname}/>

                                <div className="save-button__container">
                                    <Button type={"submit"} name={"Save"} form={"square"} style={"button__right-margin"}
                                            callBack={() => {
                                            }}/>
                                    <Button name={"Cancel"} form={"square"} style={"button__cancel"}
                                            callBack={() => setIsEditMode(false)}/>
                                </div>


                            </>
                        </FormTemplate>
                        }
                        <div className="user-email">
                            {user.email}<br/>
                        </div>

                    </div>

                    {isCurrent && <Button name={"Log out"} style={"button-logout button__white"} callBack={() => {
                        dispatch(logOut())
                    }}/>}
                </div>
            }
            {!user &&
                dispatch(modalMessage(true, ModalBoxAnswer.USER_NOT_FOUND)) &&
                <Navigate to={PathNavigation.USERS} replace={true}/>
            }
        </>
    );
}