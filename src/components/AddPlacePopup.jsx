import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      name,
      link,
    });
  }

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name="cards"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={'Добавить'}
      onSubmit={handleSubmit}
    >
      <label className="pop-up__field">
        <input
          onChange={(e) => setName(e.target.value)}
          className="pop-up__input pop-up__input_type_placeName"
          type="text"
          name="name"
          id="pop-up__input-placeName"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          value={name}
        />
        <span className="pop-up__input-error pop-up__input-placeName-error" />
      </label>
      <label className="pop-up__field">
        <input
          onChange={(e) => setLink(e.target.value)}
          className="pop-up__input pop-up__input_type_placeLink"
          type="url"
          name="link"
          id="pop-up__input-placeLink"
          placeholder="Ссылка на картинку"
          required
          value={link}
        />
        <span className="pop-up__input-error pop-up__input-placeLink-error" />
      </label>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
