import React, { useContext } from 'react';

import Card from '../components/Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Main = ({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
  currentUserEmail,
  onSignOut,
  isAuth,
}) => {
  const userContext = useContext(CurrentUserContext);

  return (
    <>
      <Header
        currentUserEmail={currentUserEmail}
        onSignOut={onSignOut}
        isAuth={isAuth}
      />
      <main>
        <section className="profile">
          <div className="profile__wrapper">
            <button
              onClick={onEditAvatar}
              type="button"
              className="profile__btn profile__btn_type_avatar"
            >
              <img
                src={userContext.avatar}
                alt="Аватар профиля"
                className="profile__avatar"
              />
            </button>
            <div className="profile__info">
              <div className="profile__title">
                <h1 className="profile__name">{userContext.name}</h1>
                <button
                  onClick={onEditProfile}
                  className="profile__btn profile__btn_type_edit"
                  type="button"
                  aria-label="Редактировать"
                />
              </div>
              <p className="profile__subtitle">{userContext.about}</p>
            </div>
          </div>
          <button
            onClick={onAddPlace}
            className="profile__btn profile__btn_type_add"
            type="button"
            aria-label="Добавить"
          />
        </section>

        <section className="gallery">
          {cards.map((item, i) => (
            <Card
              name={item.name}
              link={item.link}
              likes={[...item.likes]}
              key={item._id}
              _id={item._id}
              owner={item.owner}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Main;
