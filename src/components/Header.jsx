import headerLogo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ onSignOut, currentUserEmail, isAuth }) => {
  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      {location.pathname === '/signin' && (
        <div className="header__btn">
          <Link className="header__link" to={'/signup'}>
            Регистрация
          </Link>
        </div>
      )}
      {location.pathname === '/signup' && (
        <div className="header__btn">
          <Link className="header__link" to={'/signin'}>
            Вход
          </Link>
        </div>
      )}
      {isAuth && (
        <div className="header__btn">
          {currentUserEmail}
          <Link className="header__link" to={'/signin'} onClick={onSignOut}>
            Выйти
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
