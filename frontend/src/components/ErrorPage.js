import { Link } from "react-router-dom";

function ErrorPage({ onLogin }) {

    return (

        <div className="error__container">
            <h1 className="error__title">404</h1>
            <h2 className="error__text">УПС! ТУТ ПУСТО!</h2>
            <br />
            <br />
            <br />
            <p className="error__text">нажми на свято</p>
            <Link className="error__link" to='/sign-in '>МЕСТО</Link>
            <p className="error__text">тут пусто не бывает</p>
        </div>
    )
}

export default ErrorPage;