import React from "react"

export default function Footer(props) {
    return (
        <footer className="footer">
            <span className="footer__copyright">© {new Date().getFullYear()} Mesto Russia</span>
        </footer>
    )
}