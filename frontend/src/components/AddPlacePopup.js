import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";
import useFormValidator from "../hooks/useFormValidator.js";
import Input from "./Input.js";


function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const { values, errors, isValid, handleChange, resetForm } = useFormValidator('form');

    function handleSubmit() {
        onAddPlace(values);
        onClose();
    }

    useEffect(() => {
        resetForm();
    },
        [isOpen, resetForm]);

    return (
        <PopupWithForm
            name="add-card"
            title="Новое место"
            submitBtnText="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isValid={isValid}
        >
            <div className="form__section">
                <Input
                    name="name"
                    type="text"
                    handleChange={handleChange}
                    placeholder="Введите название"
                    errors={errors}
                    values={values}
                    className='form__input'
                />
                <Input
                    name="link"
                    type="url"
                    handleChange={handleChange}
                    placeholder="Ссылка на картинку"
                    errors={errors}
                    values={values}
                    className='form__input'
                />
            </div>
        </PopupWithForm>
    );
}

export default AddPlacePopup;