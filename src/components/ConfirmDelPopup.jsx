import React from 'react';
import PopupWithForm from './PopupWithForm';

const ConfirmDelPopup = ({ onClose, isOpen, onCardDelete, selectCard }) => {
  const onDeleteCard = (e) => {
    e.preventDefault();
    onCardDelete(selectCard);
  };

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      buttonText={'Да'}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={onDeleteCard}
    />
  );
};

export default ConfirmDelPopup;
