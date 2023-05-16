import headerLogo from '../images/logo.svg';
import { Link } from 'react-router-dom';

const Header = ({ btnText, link, onSignOut }) => {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      {btnText && (
        <div className="header__btn">
          <Link
            className="header__link"
            to={link || '/signin'}
            onClick={onSignOut}
          >
            {btnText}
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
