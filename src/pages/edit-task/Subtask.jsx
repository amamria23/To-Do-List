import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/config";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import Moment from "react-moment";
import {  useState } from "react";
import { useTranslation } from "react-i18next";

const Subtask = ({ user, id, updateCompltd, trush }) => {
  const { t} = useTranslation();
  const [value, loading, error] = useDocument(doc(db, user.uid, id));
  const [showAddNewTask, setshowAddNewTask] = useState(false);
  const [subtitle, setsubtitle] = useState("");

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
      <section className="sub-task mtt">
        <div className="parent-time flex">
          <p className="time">
          {t("created")}: <Moment fromNow>{value.data().id}</Moment>
          </p>
          <div className="completed">
            <input
              onChange={(eo) => {
                updateCompltd(eo);
              }}
              checked={value.data().completed}
              type="checkbox"
              name="fff"
              id="completed"
            />
            <label htmlFor="completed">{t("complt")}</label>
          </div>
        </div>
        <ul className="mt">
          {value.data().details.map((item) => {
            return (
              <li key={item} className="card-task flex">
                <p>{item}</p>
                <i
                  onClick={() => {
                    trush(item);
                  }}
                  className="fa-regular fa-trash-can"
                ></i>
              </li>
            );
          })}
        </ul>
        {showAddNewTask && (
          <form className="add-new-task">
            <input
              value={subtitle}
              onChange={(eo) => {
                setsubtitle(eo.target.value);
              }}
              type="text"
            />
            <button
              onClick={async (eo) => {
                eo.preventDefault()
                setsubtitle("")
                await updateDoc(doc(db, user.uid, id), {
                  details: arrayUnion(subtitle),
                });
                
              }}
            >
              {t("add1")}
            </button>
            <button
              onClick={() => {
                setshowAddNewTask(false);
              }}
            >
              {t("cancel")}
            </button>
          </form>
        )}
        <div className="center mtt">
          <button
            dir="auto"
            onClick={() => {
              setshowAddNewTask(true);
            }}
            className="add-more"
          >
            {t("addmore")} <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </section>
    );
  }
};

export default Subtask;
