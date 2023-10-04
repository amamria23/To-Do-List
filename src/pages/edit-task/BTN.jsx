import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/config";
import { doc } from "firebase/firestore";
import { useTranslation } from "react-i18next";

const BTN = ({ user, id, deleteBTN }) => {
  const { t} = useTranslation();
  const [value, loading, error] = useDocument(doc(db, user.uid, id));

  if (loading) {
    return (
      <div></div>
    );
  }
  if (error) {
    return <h1>Error</h1>;
  }
  if (value) {
    return (
      <section className="center">
        <div>
          <button
            onClick={ () => {
              deleteBTN()
            }}
            className="delete"
          >
            {t("delete")}
          </button>
        </div>
      </section>
    );
  }
};

export default BTN;
