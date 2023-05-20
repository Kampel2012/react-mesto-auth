import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Main from '../pages/Main';
import ImagePopup from './ImagePopup';
import { api, apiAuth } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './../pages/Login';
import Register from './../pages/Register';
import ProtectedRoute from './ProtectedRoute';
import PopupRegistrationOutcome from './InfoTooltip/InfoTooltip';
import ConfirmDelPopup from './ConfirmDelPopup';

function App() {
  const [popupsState, setPopupsState] = useState({
    editProfilePopup: false,
    addPlacePopup: false,
    editAvatarPopup: false,
    regOutcomePopup: false,
    confirmDelPopup: false,
    imagePopup: false,
  });

  const [selectCard, setSelectCard] = useState(null);
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      if (!localStorage.getItem('TOKEN')) return;
      try {
        const res = await apiAuth.checkToken(localStorage.getItem('TOKEN'));
        if (res.data) {
          setCurrentUserEmail(res.data.email);
          setIsAuth(true);
        }
      } catch (error) {
        setIsAuth(false);
        console.warn(error);
      }
    }
    checkAuth();
  }, [isAuth]);

  function onLogin(token) {
    localStorage.setItem('TOKEN', token.token);
    setIsAuth(true);
  }

  function onSignOut() {
    localStorage.removeItem('TOKEN');
    setIsAuth(false);
    navigate('/signin');
  }

  useEffect(() => {
    async function getUser() {
      try {
        const user = await api.getUserInfoData();
        setCurrentUser(user);
        const cards = await api.getInitialCards();
        setCards([...cards]);
      } catch (error) {
        console.warn(error);
      }
    }
    getUser();
  }, []);

  function closeAllPopups() {
    setPopupsState((prev) => {
      let obj = { ...prev };
      for (let prop in obj) {
        obj[prop] = false;
      }
      return obj;
    });
    setSelectCard(null);
  }

  function handleChangePopupState(popupName) {
    return () => setPopupsState((prev) => ({ ...prev, [popupName]: true }));
  }

  function handleEditProfileClick() {
    handleChangePopupState('editProfilePopup')();
  }

  function handleAddPlaceClick() {
    handleChangePopupState('addPlacePopup')();
  }

  function handleEditAvatarClick() {
    handleChangePopupState('editAvatarPopup')();
  }

  function handleRegisterPopupOpen() {
    handleChangePopupState('regOutcomePopup')();
  }

  function handleConfirmDelPopupOpen(card) {
    setSelectCard(card);
    handleChangePopupState('confirmDelPopup')();
  }

  function handleCardClick(card) {
    handleChangePopupState('imagePopup')();
    setSelectCard(card);
  }

  function handleCardLike(likes, _id) {
    const isLiked = likes.some((i) => i._id === currentUser._id);
    const method = isLiked ? 'DELETE' : 'PUT';
    api
      .changeLikeCardStatus(_id, method)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === _id ? newCard : c)));
      })
      .catch(console.warn);
  }

  function handleDeleteClick(id) {
    api
      .deleteCard(id)
      .then(() => setCards((state) => state.filter((item) => item._id !== id)))
      .then(() => closeAllPopups())
      .catch(console.warn);
  }

  async function handleUpdateUser(userData) {
    try {
      const res = await api.editProfile(userData);
      setCurrentUser(res);
      closeAllPopups();
    } catch (error) {
      console.warn(error);
    }
  }

  async function handleUpdateAvatar(link) {
    try {
      const res = await api.editProfileAvatar(link);
      setCurrentUser(res);
      closeAllPopups();
    } catch (error) {
      console.warn(error);
    }
  }

  async function handleAddPlaceSubmit(params) {
    try {
      const newCard = await api.addNewCard(params);
      setCards([newCard, ...cards]);
      closeAllPopups();
    } catch (error) {
      console.warn(error);
    }
  }

  const handleRegisterSubmit = async (e, email, password) => {
    e.preventDefault();
    try {
      const res = await apiAuth.signup({
        email,
        password,
      });
      handleRegisterPopupOpen();
      if (res.data) {
        navigate('/signin');
      }
    } catch (error) {
      handleRegisterPopupOpen();
      console.warn(error);
    }
  };

  const handleLoginSubmit = async (e, email, password) => {
    e.preventDefault();
    try {
      const token = await apiAuth.signin({
        email,
        password,
      });
      if (token) {
        onLogin(token);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App page">
        <Routes>
          <Route
            path="/signup"
            element={
              <Register
                isAuth={isAuth}
                handleRegisterSubmit={handleRegisterSubmit}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login isAuth={isAuth} handleLoginSubmit={handleLoginSubmit} />
            }
          />
          <Route
            path="/"
            index
            element={
              <ProtectedRoute
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleConfirmDelPopupOpen}
                cards={cards}
                currentUserEmail={currentUserEmail}
                onSignOut={onSignOut}
                isAuth={isAuth}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={popupsState.editProfilePopup}
          onClose={closeAllPopups}
        />

        <EditAvatarPopup
          isOpen={popupsState.editAvatarPopup}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={popupsState.addPlacePopup}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ConfirmDelPopup
          onClose={closeAllPopups}
          isOpen={popupsState.confirmDelPopup}
          onCardDelete={handleDeleteClick}
          selectCard={selectCard}
        />

        <ImagePopup
          card={selectCard}
          onClose={closeAllPopups}
          isOpen={popupsState.imagePopup}
        />

        <PopupRegistrationOutcome
          isOpen={popupsState.regOutcomePopup}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
