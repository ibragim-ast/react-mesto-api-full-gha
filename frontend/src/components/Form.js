import React from "react";

const Form = ({ name, title, onSubmit, isValid, submitBtnText, children, ...props }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <form className="form" name={name} onSubmit={handleSubmit}>
            <h2 className="form__title">{title}</h2>
            <div className="form__section-container">{children}</div>
            <button
                className={`form__submit ${!isValid ? "form__submit_inactive" : ""}`}
                type="submit"
                disabled={!isValid}
            >
                {submitBtnText}
            </button>
        </form>
    );
};

export default Form;
