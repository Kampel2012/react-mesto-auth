import React from 'react';
import usePopupClose from '../../hooks/usePopupClose';
import styles from './InfoTooltip.module.css';

const InfoTooltip = ({ isOpen, onClose, isCompleted, infoTooltipMessage }) => {
  usePopupClose(isOpen, onClose);
  const classesPopup = [
    styles.popup,
    isCompleted !== null && isOpen && styles.popup_opened,
  ].join(' ');

  const classesIcon = [
    styles.icon,
    isCompleted ? styles.icon__success : styles.icon__error,
  ].join(' ');

  const text = isCompleted
    ? infoTooltipMessage.success || 'Успешно!'
    : infoTooltipMessage.error || 'Что-то пошло не так! Попробуйте ещё раз.';

  return (
    <div className={classesPopup}>
      <div className={styles.container}>
        <div className={classesIcon}></div>
        <h2 className={styles.title}>{text}</h2>
        <button
          onClick={onClose}
          type="button"
          className={styles.close__btn}
          aria-label="Закрыть"
        />
      </div>
    </div>
  );
};

export default InfoTooltip;
