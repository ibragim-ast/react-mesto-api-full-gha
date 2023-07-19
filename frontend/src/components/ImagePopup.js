import Popup from "./Popup";

function ImagePopup({ isOpen, onClose, card }) {

    return (
        <Popup isOpen={isOpen} onClose={onClose} card={card} name="large-image" >
            <figure className="popup__figure">
                <img
                    className="popup__image"
                    src={card.link}
                    alt={card.name}
                />
                <figcaption
                    className="popup__image-caption">{card.name}
                </figcaption>
            </figure>
        </Popup>
    )
}

export default ImagePopup;