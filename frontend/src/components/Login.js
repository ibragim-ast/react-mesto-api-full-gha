import AuthForm from "./AuthForm";

const Login = ({ onLogin }) => {

    const handleLogin = (values) => {
        onLogin(values);
    }

    return (
        <AuthForm
            title="Вход"
            submitBtnText="Войти"
            onSubmit={handleLogin}
            linkText="Уже зарегистрированы? Войти"
            linkUrl="/sign-in"
        />
    )
}

export default Login;