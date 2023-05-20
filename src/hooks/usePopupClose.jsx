import { useEffect } from 'react';
import styles from '../components/InfoTooltip/InfoTooltip.module.css';

export default function usePopupClose(isOpen, closePopup) {
  useEffect(() => {
    if (!isOpen) return;

    const handleOverlay = (event) => {
      if (
        event.target.classList.contains('pop-up_opened') ||
        event.target.classList.contains(styles.popup_opened)
      ) {
        closePopup();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closePopup();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleOverlay);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleOverlay);
    };
  }, [isOpen, closePopup]);
}

// thanks a lot =)
