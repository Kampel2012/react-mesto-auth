import React from 'react';
import usePopupClose from '../hooks/usePopupClose';

const ImagePopup = ({ card, onClose }) => {
  const classes = `pop-up pop-up_data_image-card ${card && 'pop-up_opened'}`;
  usePopupClose(card, onClose);

  return (
    <div className={classes}>
      {card && (
        <div className="pop-up__container pop-up__container_data_image-card">
          <button
            onClick={onClose}
            type="button"
            className="pop-up__btn pop-up__btn_type_close"
            aria-label="Закрыть"
          />
          <img className="pop-up__image-card" src={card.link} alt={card.name} />
          <p className="pop-up__subtitle">{card.name}</p>
        </div>
      )}
    </div>
  );
};

export default ImagePopup;
