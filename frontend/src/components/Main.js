import Card from "./Card.js";
import { CurrentUserContext } from "./CurrentUserContext";
import React from "react";
import Footer from "./Footer.js";

function Main({
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    onCardLike,
    onCardDelete,
    cards,
}) {

    const currentUser = React.useContext(CurrentUserContext);

    const cardElements = cards.map((card) => {
        return (
            <li key={card._id}>
                <Card
                    card={card}
                    onCardClick={onCardClick}
                    onCardLike={onCardLike}
                    onCardDelete={onCardDelete}
                />
            </li>
        )
    })

    return (
        <>
            <main className="main">
                <section className="profile">
                    <div className="profile__avatar-container">
                        <img
                            className="profile__image"
                            src={currentUser.avatar}
                            alt="Аватар пользователя"
                        />
                        <button
                            className="profile__avatar-edit-btn"
                            onClick={onEditAvatar}
                        >
                        </button>
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__user-name">{currentUser.name}</h1>
                        <button
                            className="profile__edit-button"
                            type="button"
                            aria-label="Редактировать"
                            onClick={onEditProfile}>
                        </button>
                        <p className="profile__user-profession">{currentUser.about}</p>
                    </div>
                    <button
                        className="profile__add-button"
                        type="button"
                        aria-label="Добавить"
                        onClick={onAddPlace}>
                    </button>
                </section>
                <section className="cards">
                    <ul className="cards__list">
                        {cardElements}
                    </ul>
                </section>
            </main>
            <Footer className="footer" />
        </>
    )
}

export default Main;