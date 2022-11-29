import {useState} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import logo from '../images/icons/logo.svg';

const Header = ({setIsAuth, userEmail}) => {
  const [isVisibleInfo, setIsVisibleInfo] = useState(false);
  const handleLogout = () => {
    setIsVisibleInfo(false);
    setIsAuth(false);
    localStorage.removeItem('token');
  };
  const onClickBurger = () => {
    setIsVisibleInfo(!isVisibleInfo);
  };
  return (
    <header className={`header ${isVisibleInfo ? 'active' : ''}`}>
      <img src={logo} alt="Логотип сервиса Место" className="header__logo" />
      <Switch>
        <Route exact path="/">
          <>
            <div
              className={`burger ${isVisibleInfo ? 'active' : ''}`}
              onClick={onClickBurger}>
              <span className="burger-line"></span>
            </div>
            <div className={`header__info ${isVisibleInfo ? 'active' : ''}`}>
              <p className="header__mail">{userEmail}</p>
              <p
                className="button header__button header__button_place_info"
                onClick={handleLogout}>
                Выйти
              </p>
            </div>
          </>
        </Route>
        <Route path="/sign-up">
          <Link className="button header__button" to="/sign-in">
            Войти
          </Link>
        </Route>
        <Route>
          <Link className="button header__button" to="/sign-up">
            Регистрация
          </Link>
        </Route>
      </Switch>
    </header>
  );
};

export default Header;
