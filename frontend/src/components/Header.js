import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import React, { useState } from 'react';

function Header({ email, onSignout, isMainPage, isSignUpPage, isSignInPage }) {

    const [isMenuOpened, setIsMenuOpened] = useState(false);

    const handleOpenMenu = () => {
        setIsMenuOpened(!isMenuOpened);
    };

    return (
        <header className={`header ${isMenuOpened && 'header_active'}`}>
            <div className="header__container">
                <img className="header__logo" src={logo} alt="Логотип" />
                <nav className={`header__menu ${isMenuOpened && 'header__menu_active'}`}>
                    <ul className='header__list'>
                        <li>
                            {isMainPage && <span className="header__email">{email}</span>}
                        </li>
                        <li>
                            <Link
                                className='header__burger-link'
                                to={isMainPage ? '/sign-up' : (isSignUpPage ? '/sign-in' : '/sign-up')}
                                onClick={isMainPage ? () => {
                                    handleOpenMenu();
                                    onSignout();
                                } : undefined}
                            >
                                {isMainPage && "Выйти"}
                                {isSignUpPage && "Войти"}
                                {isSignInPage && "Регистрация"}
                            </Link>
                        </li>
                    </ul>
                </nav>

                {isMainPage && <div className={`header__burger ${isMenuOpened && 'header__burger_active'}`} onClick={handleOpenMenu}>
                    <div className='header__body'>
                        <span className={`header__burger-line ${isMenuOpened && 'header__burger-line_active'}`} />
                        <span className={`header__burger-line ${isMenuOpened && 'header__burger-line_active'}`} />
                        <span className={`header__burger-line ${isMenuOpened && 'header__burger-line_active'}`} />
                    </div>
                </div>
                }
            </div>
        </header >
    )
}

export default Header;

