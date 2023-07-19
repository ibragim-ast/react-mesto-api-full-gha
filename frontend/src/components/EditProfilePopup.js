import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from './CurrentUserContext';
import useFormValidator from '../hooks/useFormValidator.js';
import Input from "./Input.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const currentUser = React.useContext(CurrentUserContext);
    const { values, errors, isValid, handleChange, resetForm } = useFormValidator('form');

    useEffect(() => {
        if (currentUser) {
            resetForm(currentUser);
        } else {
            resetForm();
        }
    }, [currentUser, resetForm, isOpen]);

    function handleSubmit() {
        onUpdateUser(values);
        onClose();
    }

    return (
        <PopupWithForm
            name="edit-profile"
            title="Редактировать профиль"
            submitBtnText="Сохранить"
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
                    placeholder="Введите имя"
                    errors={errors}
                    values={values}
                    className='form__input'
                />
                <Input
                    name="about"
                    type="text"
                    handleChange={handleChange}
                    placeholder="О себе"
                    errors={errors}
                    values={values}
                    className='form__input'
                />
            </div>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
