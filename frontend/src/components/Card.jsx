import {useContext} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

const Card = ({card, onCardClick, onCardLike, onCardDelete}) => {
  const currentUser = useContext(CurrentUserContext);

  const handleClick = () => {
    onCardClick(card);
  };
  const handleLikeClick = () => {
    onCardLike(card);
  };
  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `button card__delete-button ${!isOwn ? 'none' : ''}`;

  const isLiked = card.likes.some(user => user._id === currentUser._id);
  const cardLikeButtonClassName = `button card__like-button ${isLiked ? 'active' : ''}`;

  return (
    <li className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-block">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}></button>
          <p className="card__like-count">{card.likes.length}</p>
        </div>
      </div>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}></button>
    </li>
  );
};

export default Card;
