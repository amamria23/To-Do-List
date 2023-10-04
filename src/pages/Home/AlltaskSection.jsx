import { Link } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import ReactLoading from "react-loading";
import Moment from "react-moment";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const AlltaskSection = ({ user }) => {
  const { t} = useTranslation();
  const [active, setactive] = useState(false);
  const [value1, setvalue] = useState("all-task");
  const AllTasks = query(collection(db, user.uid), orderBy("id", "asc"))
  const CompletedTasks = query(collection(db, user.uid),where("completed", "==", true))
  const NotCompletedTasks = query(collection(db, user.uid),where("completed", "==", false))
  const [initialData, setinitialData] = useState(AllTasks);
  const [value, loading, error] = useCollection(initialData);

  //all function about query firestore:
  const newestBTN = () => {
    setactive(true);
    setinitialData(query(collection(db, user.uid), orderBy("id", "desc")));
  };
  const oldestBTN = () => {
    setactive(false);
    setinitialData(query(collection(db, user.uid), orderBy("id", "asc")));
  };
  const selectChange = (eo) => {
    if (eo.target.value === "all-task") {
      setvalue("all-task");
      setactive(false)
      setinitialData(AllTasks);
    } else if (eo.target.value === "completed") {
      setvalue("completed");
      setinitialData(CompletedTasks);
    } else if (eo.target.value === "not-completed") {
      setvalue("not-completed");
      setinitialData(NotCompletedTasks);
    }
  }

  if (loading) {
    return (
      <ReactLoading
        className="mtt"
        type={"spin"}
        color={"#3467c2"}
        height={77}
        width={77}
      />
    );
  }
  if (error) {
    return <h1>Error</h1>;
  }
  if (value) {
    return (
      <div>
        {/* options (filtered date) */}
        <section
          style={{ justifyContent: "center" }}
          className="parent-of-btn flex mtt"
        >
          {value1 === "all-task" && (
            <div>
              <button
                style={{ opacity: active ? "1" : "0.3" }}
                onClick={() => {
                  newestBTN();
                }}
              >
                {t("filter1")}
              </button>
              <button
                style={{ opacity: active ? "0.3" : "1" }}
                onClick={() => {
                  oldestBTN();
                }}
              >
                {t("filterN")}
              </button>
            </div>
          )}
          <select
            value={value1}
            onChange={(eo) => {
              selectChange(eo)
            }}
            name=""
            id=""
          >
            <option value="all-task">{t("task")}</option>
            <option value="completed">{t("completed")}</option>
            <option value="not-completed">{t("notCompleted")}</option>
          </select>
        </section>
        {/* show all task */}
        <section className="all-task flex mtt">
          {value.docs.length === 0 && <h1>All task are deleted </h1>}

          {value.docs.map((item) => {
            return (
              <article key={item.data().id} dir="auto" className="one-task">
                <Link className="link" to={`/edit-task/${item.data().id}`}>
                  <h2>{item.data().title}</h2>
                  <ul>
                    {item.data().details.map((item, index) => {
                      if (index < 2) {
                        return <li key={item}>{item}</li>;
                      } else {
                        return false;
                      }
                    })}
                  </ul>
                  <p className="time">
                    <Moment fromNow>{item.data().id}</Moment>
                  </p>
                </Link>
              </article>
            );
          })}
        </section>
      </div>
    );
  }
};

export default AlltaskSection;
