import PopupWithForm from "./PopupWithForm"

const ConfirmDeletePopup = () => {
    return (
        <PopupWithForm name="card-delete" title="Вы уверены?">
            <h2 className="form__title">Вы уверены?</h2>
            <button
                className="form__submit"
                type="submit"
                value="Да">Да
            </button>
        </PopupWithForm>
    )
}

export default ConfirmDeletePopup;