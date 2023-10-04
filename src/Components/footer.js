import React from "react";
import "./footer.css"
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t} = useTranslation();
  return (
    <div className="myfooter">
      <footer dir="auto">
      {t("footer")}
        <span className="anim">🧡</span>
      </footer>
    </div>
  );
};

export default Footer;
