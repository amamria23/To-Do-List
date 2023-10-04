import { useState } from "react";
import Header from "../../Components/header";
import Footer from "../../Components/footer";
import Loading from "../../Components/Loading";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
//lvl3
import { auth, db } from "../../firebase/config";
import "./Home.css";
import { doc, setDoc } from "firebase/firestore";
import MainModal from "./MainModal";
import AlltaskSection from "./AlltaskSection";
import { useTranslation } from "react-i18next";
import Pup from "../../pages/Shared/Pup";

const Home = () => {
  const { t } = useTranslation();
  const [user, loading, error] = useAuthState(auth);
  const sendEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      // Email verification sent!
      // ...
    });
  };

  //lvl3
  const [showModal, setshowModal] = useState(false);
  const [array, setArray] = useState([]);
  const [subtask, setSubtask] = useState("");
  const [title1, setTitle] = useState("");
  const [showLoading, setshowLoading] = useState(false);
  const [showpup, setshowpup] = useState(false);

  // function about taskModal

  const closeModal = () => {
    setshowModal(false);
    setTitle("");
    setArray([]);
    setSubtask("");
  };
  const titleInput = (eo) => {
    setTitle(eo.target.value);
  };
  const detailsInput = (eo) => {
    setSubtask(eo.target.value);
  };
  const addBTN = (eo) => {
    eo.preventDefault();
    if (!array.includes(subtask)) {
      array.push(subtask);
    }
    setSubtask("");
  };
  const submitBTN = async (eo) => {
    eo.preventDefault();
    setshowLoading(true);
    const keys = new Date().getTime();
    await setDoc(doc(db, user.uid, `${keys}`), {
      title: title1,
      details: array,
      id: keys,
      completed: false,
    });
    setshowLoading(false);
    setTitle("");
    setArray([]);
    setshowModal(false);
    setshowpup(true);
    setTimeout(() => {
      setshowpup(false);
    }, 3500);
  };

  if (loading) {
    return (
      <div>
        <Header />
        <main>
          <Loading />
        </main>
        <Footer />
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <Header />
        <main>Error</main>
        <Footer />
      </div>
    );
  }
  if (!user) {
    return (
      <div>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <Header />

        <main>
          <p>
            Please <Link to="/signIn">Sign-in</Link> to continue...🧡
          </p>
        </main>

        <Footer />
      </div>
    );
  }
  if (user) {
    if (!user.emailVerified) {
      return (
        <div>
          <Helmet>
            <title>Home</title>
          </Helmet>
          <Header />

          <main style={{ alignItems: "center" }}>
            <div>
              Welcome: {user.displayName} <span className="anim">🧡</span>
            </div>

            <div className="email">
              <p>Please verify your email to continue </p>
              <button
                onClick={() => {
                  sendEmail();
                }}
                className="btn btn2"
              >
                Send email
              </button>
            </div>
          </main>

          <Footer />
        </div>
      );
    }
    if (user.emailVerified) {
      return (
        <div>
          <Helmet>
            <title>Home</title>
          </Helmet>
          <Header />

          <main className="home">
            <AlltaskSection user={user} />
            {/* add new task btn */}
            <section className="mt">
              <button
                dir="auto"
                onClick={() => {
                  setshowModal(true);
                }}
                className="add-nex-task"
              >
                {t("add")} <i className="fa-solid fa-plus"></i>
              </button>
            </section>
            {showModal && (
              <MainModal
                closeModal={closeModal}
                titleInput={titleInput}
                detailsInput={detailsInput}
                addBTN={addBTN}
                submitBTN={submitBTN}
                title1={title1}
                subtask={subtask}
                array={array}
                showLoading={showLoading}
              />
            )}
            <Pup showpup={showpup} />
          </main>

          <Footer />
        </div>
      );
    }
  }
};

export default Home;
