import React, { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({ onClose, isOpen, onUpdateAvatar }) => {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={'Сохранить'}
      onSubmit={handleSubmit}
    >
      <label className="pop-up__field">
        <input
          ref={avatarRef}
          className="pop-up__input pop-up__input_type_placeLink"
          type="url"
          name="link"
          id="pop-up__input-linkAvatar"
          placeholder="Ссылка на аватар"
          required
          defaultValue={''}
        />
        <span className="pop-up__input-error pop-up__input-linkAvatar-error" />
      </label>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
