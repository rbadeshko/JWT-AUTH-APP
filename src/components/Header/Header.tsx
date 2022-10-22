import logo from 'assets/img/logo.svg'
import user from "assets/img/user.png"
import "./header.css"
import {Link} from "react-router-dom";
import {PathNavigation} from "../../enums/NAVIGATION";
import {useAppSelector} from "../../store/hooks";

export const Header = () => {
    const isAuth = useAppSelector(state => state.app.isLoggedIn);
    const isLoading = useAppSelector(state => state.app.isLoading);
    const currentUser = useAppSelector(state => state.user.currentUser);

    const {name, surname} = currentUser;

    return (

        <div className="header">

            <div className={`container container--header ${!isAuth && "_not-logged"}`}>
                <div className="logo logo--header">
                    <Link className="header__link" to={PathNavigation.MAIN}>
                        <img className="logo__img" src={logo} alt="Test Coding Logo"/>
                    </Link>
                </div>

                    {isAuth && <Link className={"header__link link--dotted"} to={PathNavigation.USERS}>Users</Link>}

                <div className={`login login--header ${!isAuth && "_not-logged"}`}>
                    {!isAuth && <Link to={PathNavigation.SING_IN} className="button link--button login__button">Log in</Link>}
                    {!isAuth && <Link to={PathNavigation.SING_UP} className="button link--button login__button">Sing up</Link>}
                    {isAuth &&
                        <div className="header__user">
                            <Link className="header__link link--dotted mob-hide tablet-hide" to={PathNavigation.MY_PROFILE}>
                                Hi, {name} {surname}
                            </Link>
                            <Link className="header__link" to={PathNavigation.MY_PROFILE}>
                                <div className="user__avatar">
                                    <img className="user-avatar__img" src={user} alt="user"/>
                                </div>
                            </Link>


                        </div>
                }
                </div>
            </div>
            <div className={!isLoading ? "loader" : "loader active"}></div>
        </div>

    )
}