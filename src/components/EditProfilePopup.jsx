import React, { useContext, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={'Сохранить'}
      onSubmit={handleSubmit}
    >
      <label className="pop-up__field">
        <input
          className="pop-up__input pop-up__input_type_name"
          type="text"
          name="name"
          id="pop-up__input-name"
          placeholder="Имя профиля"
          required
          minLength="2"
          maxLength="40"
          onChange={(e) => setName(e.target.value)}
          value={name || ''}
        />
        <span className="pop-up__input-error pop-up__input-name-error" />
      </label>
      <label className="pop-up__field">
        <input
          className="pop-up__input pop-up__input_type_job"
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          name="job"
          id="pop-up__input-job"
          placeholder="Вид деятельности"
          required
          minLength="2"
          maxLength="200"
          value={description || ''}
        />
        <span className="pop-up__input-error pop-up__input-job-error" />
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
