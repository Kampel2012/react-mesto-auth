import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = ({
  onCardClick,
  link,
  name,
  likes,
  owner,
  _id,
  onCardLike,
  onCardDelete,
}) => {
  function handleClick() {
    onCardClick({ link, name });
  }

  const user = useContext(CurrentUserContext);

  const isOwn = owner._id === user._id;

  const isLiked = likes.some((i) => i._id === user._id);
  const cardLikeButtonClassName = `card__btn card__btn_type_like ${
    isLiked && 'card__btn_like_active'
  }`;

  return (
    <article className="card">
      <img
        onClick={handleClick}
        className="card__image"
        src={link}
        alt={name}
      />
      <div className="card__wrapper">
        <h2 className="card__title">{name}</h2>
        <div>
          <button
            onClick={() => onCardLike(likes, _id)}
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Лайкнуть"
          />
          <p className="card__counter">{likes.length}</p>
        </div>
      </div>
      {isOwn && (
        <button
          onClick={() => onCardDelete(_id)}
          className="card__btn card__btn_type_delete"
          type="button"
          aria-label="Удалить"
        />
      )}
    </article>
  );
};

export default Card;
