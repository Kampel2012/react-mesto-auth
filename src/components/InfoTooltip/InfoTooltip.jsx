import React from 'react';
import usePopupClose from '../../hooks/usePopupClose';
import styles from './InfoTooltip.module.css';
import { useLocation } from 'react-router-dom';

const PopupRegistrationOutcome = ({ isOpen, onClose }) => {
  usePopupClose(isOpen, onClose);
  let isSuccess = false;
  const location = useLocation();
  if (location.pathname === '/signin') isSuccess = true;
  const classesPopup = [styles.popup, isOpen && styles.popup_opened].join(' ');
  const classesIcon = [
    styles.icon,
    isSuccess ? styles.icon__success : styles.icon__error,
  ].join(' ');
  const text = isSuccess
    ? 'Вы успешно зарегистрировались!'
    : 'Что-то пошло не так! Попробуйте ещё раз.';

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

export default PopupRegistrationOutcome;
