import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.css";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const { theme, changeTheme } = useContext(ThemeContext);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  return (
    <div>
      <header className="hide-when-mobile">
        <Link to="/">
          <h1 className="bigTitle">C4A.dev</h1>
        </Link>

        <button
          onClick={() => {
            changeTheme(theme === "light" ? "dark" : "light");
          }}
          className="theme-btn sun"
          type="button"
        >
          ☀️
        </button>
        <button
          onClick={() => {
            changeTheme(theme === "light" ? "dark" : "light");
          }}
          className="theme-btn moon"
          type="button"
        >
          🌙
        </button>

        <ul className="flex">
          <li className="main-list">
            <button className="main-link btn3">
              <p>{t("lang")}</p>
            </button>
            <ul className="sub-lang">
              <li
                onClick={() => {
                  i18n.changeLanguage("ar");
                }}
                dir="auto"
                style={{ textAlign: "start" }}
              >
                <p>العربية</p>
                {i18n.language === "ar" && (
                  <i className="fa-solid fa-check"></i>
                )}
              </li>
              <li
                onClick={() => {
                  i18n.changeLanguage("en");
                }}
                style={{ textAlign: "start" }}
              >
                <p>english</p>
                {i18n.language === "en" && (
                  <i className="fa-solid fa-check"></i>
                )}
              </li>
              <li
                onClick={() => {
                  i18n.changeLanguage("fr");
                }}
                style={{ textAlign: "center" }}
              >
                <p>français</p>
                {i18n.language === "fr" && (
                  <i className="fa-solid fa-check"></i>
                )}
              </li>
            </ul>
          </li>
          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signIn">
                Sign-in
              </NavLink>
            </li>
          )}

          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signUp">
                Sign-up
              </NavLink>
            </li>
          )}

          {user && (
            <li className="main-list">
              <button
                onClick={() => {
                  signOut(auth)
                    .then(() => {
                      // Sign-out successful.
                      navigate("/signIn");
                    })
                    .catch((error) => {
                      // An error happened.
                    });
                }}
                className="main-link btn3"
              >
                {t("signout")}
              </button>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/about">
                {t("about")}
              </NavLink>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/profile">
                {t("profile")}
              </NavLink>
            </li>
          )}
        </ul>
      </header>
    </div>
  );
};

export default Header;
