import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import useFormValidator from '../hooks/useFormValidator.js';
import Input from "./Input.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const avatarRef = React.useRef();
    const { values, errors, isValid, handleChange,
        resetForm } = useFormValidator('form');
    
    React.useEffect(() => {
        avatarRef.current.value = "";
        }, [isOpen]);

    function handleSubmit() {
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }
     
    React.useEffect(() => {
        resetForm();
    }, [isOpen, resetForm])

    return (
        <PopupWithForm
            name="edit-avatar"
            title="Обновить аватар"
            submitBtnText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            isValid={isValid}
            onSubmit={handleSubmit}
        >
            <div className="form__section">
                <Input
                    name="avatar"
                    type="url"
                    handleChange={handleChange}
                    placeholder="Аватар"
                    inputRef={avatarRef}
                    values={values}
                    errors={errors}
                    className='form__input'
                />
            </div>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;