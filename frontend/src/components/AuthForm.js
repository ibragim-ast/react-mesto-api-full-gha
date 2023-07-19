import useFormValidator from "../hooks/useFormValidator"
import Input from "./Input";

const AuthForm = ({ title, submitBtnText, onSubmit, linkText, linkUrl }) => {

    const { values, errors, handleChange, resetForm, isValid } = useFormValidator('auth-form');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(values);
        resetForm();
    }

    return (
        <>
            <form
                className="auth-form"
                onSubmit={handleSubmit}
                name="signInForm"
            >
                <h1 className="auth-form__title">{title}</h1>
                <Input
                    name="email"
                    type="email"
                    values={values}
                    errors={errors}
                    placeholder="Email"
                    handleChange={handleChange}
                    className="auth-form__input"
                />
                <Input
                    name="password"
                    type="password"
                    values={values}
                    errors={errors}
                    handleChange={handleChange}
                    placeholder="Пароль"
                    className="auth-form__input"
                />
                <button
                    type="submit"
                    className={`auth-form__submit ${!isValid ? 'auth-form__submit_disabled' : ''}`}
                    aria-label="Кнопка входа"
                    disabled={!isValid}
                >{submitBtnText}
                </button>
            </form >
        </>
    )
}

export default AuthForm;