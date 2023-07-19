import succesImage from '../images/icon-succes.svg'
import failImage from '../images/icon-fail.svg'

function InfoTooltip({ isOpen, onClose, isSuccess, message }) {

    return (
        <section
            className={`popup popup_type_success ${isOpen ? "popup_opened" : ""}`}
            onClick={onClose} >
            <div className="popup__container popup__container_open">
                <button
                    className="popup__close"
                    type="reset"
                    onClick={onClose}
                />
                <img
                    className="popup__image-open"
                    src={isSuccess ? succesImage : failImage}
                    alt="#"
                />
                <h2 className="popup__title">{message}</h2>
            </div>
        </section >
    )
}

export default InfoTooltip;