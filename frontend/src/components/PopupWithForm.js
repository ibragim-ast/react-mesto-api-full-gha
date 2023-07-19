import React from "react";
import Popup from "./Popup";
import Form from "./Form";

function PopupWithForm({ isOpen, name, onClose, onSubmit, ...props }) {

    return (
        <Popup isOpen={isOpen} name={name} onClose={onClose}>
            <Form
                name={name}
                title={props.title}
                onSubmit={onSubmit}
                isValid={props.isValid}
                submitBtnText={props.submitBtnText}
            >
                {props.children}
            </Form>
        </Popup>
    );
}

export default PopupWithForm;
