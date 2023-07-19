import React from "react";
import CurrentUserContext from "./CurrentUserContext";

function Card({ card, onCardLike, onCardDelete, onCardClick }) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `card__like-button ${isLiked && 'card__like-button_active'}`
    );

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }

    function handleCardClick() {
        onCardClick(card)
    }

    return (
        <div className="card">
            {isOwn &&
                <button
                    className='card__remove-button'
                    onClick={handleDeleteClick}
                />}
            <img
                className="card__image"
                src={card.link}
                alt={card.name}
                onClick={handleCardClick}
            />
            <div className="card__description">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like-group">
                    <button
                        className={cardLikeButtonClassName}
                        type="button"
                        aria-label="Лайк"
                        onClick={handleLikeClick}>
                    </button>
                    <span className="card__like-counter">{card.likes.length}</span>
                </div>
            </div>
        </div>
    )
}

export default Card;