
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { api } from "../utils/Api";
import { CurrentUserContext } from './CurrentUserContext';
import ProtectedRoute from './ProtectedRoute.js';
import auth from '../utils/Auth.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import Register from './RegisterForm.js';
import Login from './Login.js';
import EditProfilePopup from './EditProfilePopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js'
import ImagePopup from './ImagePopup.js';
import InfoTooltip from './InfoTooltip.js';
import ErrorPage from './ErrorPage';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPopupImageOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isInfoTooltipMessage, setIsInfoTooltipMessage] = useState('');
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const location = useLocation();

  const isMainPage = location.pathname === '/';
  const isSignUpPage = location.pathname === '/sign-up';
  const isSignInPage = location.pathname === '/sign-in';

  const tokenCheck = useCallback(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt && !loggedIn) {
      auth
        .checkToken(jwt)
        .then(res => {
          if (res) {
            setIsLoading(false)
            setLoggedIn(true);
            navigate('/', { replace: true });
            setEmail(res.email);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setIsLoading(true);
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    tokenCheck();
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getCardsList()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
          setIsLoading(false);
        }).catch((err) => {
          console.error(err)
          setIsLoading(false)
        });
    }
  }, [loggedIn, tokenCheck]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setSelectedCard(null)
    setIsInfoTooltipOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(cardData) {
    api.createNewCard(cardData)
      .then(
        (newCard) => {
          setCards([newCard, ...cards]);
          closeAllPopups();
        })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSignup(message) {
    setIsInfoTooltipMessage(message);
    setIsInfoTooltipOpen(true);
  }

  function handleSignout() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    navigate('/sign-in', { replace: true })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((prevCards) => {
          const newCards = prevCards.filter((currentCard) => currentCard._id !== card._id);
          return newCards;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(userData) {
    api.setUserInfo(userData)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(userData) {
    api
      .setUserAvatar(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegisterSubmit(formValue) {
    auth.register(formValue)
      .then(() => {
        navigate('/sign-in', { replace: true })
        setIsRegistrationSuccess(true);
        handleSignup("Вы успешно зарегистрировались!");
      })
      .catch((err) => {
        console.log(err);
        setIsRegistrationSuccess(false);
        handleSignup("Что-то пошло не так! Попробуйте еще раз.");
      });
  }

  function handleLoginSubmit(data) {
    auth.authorize(data)
      .then(res => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          setEmail(data.email);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsRegistrationSuccess(false);
        handleSignup("Что-то пошло не так! Попробуйте еще раз.");
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          isMainPage={isMainPage}
          isSignUpPage={isSignUpPage}
          isSignInPage={isSignInPage}
          onSignout={handleSignout}
          email={email}
        />
        <Routes>
        <Route
        path="/"
        element={loggedIn ? <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
          email={email}
          onSignout={handleSignout}
        /> : <Navigate to="/sign-up" replace />}
      />
          <Route path="/sign-up" element={<Register onSubmit={handleRegisterSubmit} />} />
          <Route path="/sign-in" element={<Login title="Вход" buttonText="Войти" onLogin={handleLoginSubmit} />} />
          <Route path='*' element={<ErrorPage />} onLogin={handleLoginSubmit} />
        </Routes>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        {selectedCard && (
          <ImagePopup
            isOpen={isPopupImageOpen}
            onClose={closeAllPopups}
            card={selectedCard}
          />
        )}
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          message={isInfoTooltipMessage}
          isSuccess={isRegistrationSuccess}
          onClose={closeAllPopups}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;