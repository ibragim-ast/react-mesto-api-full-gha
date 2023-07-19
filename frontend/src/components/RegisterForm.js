import AuthForm from "./AuthForm";
import { Link } from "react-router-dom";

const Register = ({ onSubmit }) => {

    const handleRegister = (values) => {
        onSubmit(values);
    }

    return (
        <>
            <AuthForm
                title="Регистрация"
                submitBtnText="Зарегистрироваться"
                onSubmit={handleRegister}
            />
            <Link to='/sign-in' className='auth-form__link'>
                <p>Уже зарегистрированы? Войти</p>
            </Link>
        </>
    );
}

export default Register;