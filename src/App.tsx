import React, {useEffect} from 'react';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import './App.css';
import {Header} from "components/Header/Header";
import {Footer} from "components/Footer/Footer";
import {LoginForm} from "components/Forms/LoginForm/LoginForm";
import {SingUpForm} from "components/Forms/SingUpForm/SingUpForm";
import {User} from "components/User/User";
import {PageNotFound} from "components/PageNotFound/PageNotFound";
import {PathNavigation} from "enums/NAVIGATION";
import {Users} from "components/Users/Users";
import {useAppDispatch, useAppSelector} from "./store/hooks";
import {setCurrentUserTC} from "./store/reducers/UserReducer";
import {Modal} from "./components/Modal/Modal";
import {hideMessage} from "utils/message/message-util";
import {modalMessage} from "./store/reducers/appReduser";
import {ModalBoxAnswer} from "./enums/MODAL_BOX_ANSWER";


function App() {
    let dispatch = useAppDispatch();
    const isAuth = useAppSelector(state => state.app.isLoggedIn);
    const storeToken = useAppSelector(state=> state.app.token);
    const appState = useAppSelector(state => state.app)


    useEffect(()=>{
        storeToken && !isAuth && dispatch(setCurrentUserTC(storeToken));
        appState.isMessage && hideMessage(dispatch);
    },[storeToken,appState.isMessage])

    return (
        <div className="app">
            <Header/>
            <div className="main-content">
                <div className="container">
                    <Routes>
                        <Route path={PathNavigation.MAIN} element={!isAuth ?
                            <LoginForm/> :
                            <Navigate to={PathNavigation.MY_PROFILE} replace={true}/>}/>
                        <Route path={PathNavigation.SING_IN} element={!isAuth ?
                            <LoginForm/> :
                            <Navigate to={PathNavigation.MY_PROFILE} replace={true}/>}/>
                        <Route path={PathNavigation.SING_UP} element={<SingUpForm/>}/>

                        <Route path={PathNavigation.MY_PROFILE} element={isAuth ?
                            <User isCurrent={true}/> :
                            <Navigate to={PathNavigation.SING_IN} replace={true}/>}/>
                        <Route path={PathNavigation.USERS} element={isAuth ?
                            <Users/> :
                            <Navigate to={PathNavigation.SING_IN} replace={true}/>}/>
                        <Route path={`${PathNavigation.USER_PROFILE}/:id`} element={isAuth ?
                            <User isCurrent={false}/> :
                            <Navigate to={PathNavigation.SING_IN} replace={true}/>}/>
                        <Route path={PathNavigation.PAGE_NOT_FOUND} element={<PageNotFound/>}/>
                        <Route path={PathNavigation.OTHER_PAGES} element={<PageNotFound/>}/>
                    </Routes>
                </div>
            </div>
            <Modal isActive={appState.isMessage} message={appState.message} isError={appState.isError}/>
            <Footer/>
        </div>
    );
}

export default App;
