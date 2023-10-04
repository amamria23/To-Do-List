import { t } from "i18next";
import { Helmet } from "react-helmet-async";

const Pup = ({ showpup, BGcolor="whitesmoke" }) => {
  return (
    <div>
      <Helmet>
        <style type="text/css">
          {`.pupTask{
  position: fixed;
  top: 100px;
  right: 28px;
  font-size: medium;
  background-color: ${BGcolor};
  color: #666;
  padding: 8px 12px;
  border-radius: 7px;
  transition: all 1s;
}
.fa-clipboard-check{
  color: teal;
  margin-left: 7px;
}`}
        </style>
      </Helmet>
      <p
        style={{
          transform: showpup ? "translateX(0)" : "translateX(270px)",
        }}
        className="pupTask"
      >
        {t("pup")}
        <i className="fa-solid fa-clipboard-check"></i>
      </p>
    </div>
  );
};

export default Pup;
