import "./Edit-task.css";
import Header from "../../Components/header";
import Footer from "../../Components/footer";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import Loading from "../../Components/Loading";
import Title from "./Title";
import Subtask from "./Subtask";
import BTN from "./BTN";
import { useNavigate, useParams } from "react-router-dom";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import ReactLoading from "react-loading";

const EditTask = () => {
  const [user, loading, error] = useAuthState(auth);
  const [showtask, setshowtask] = useState(true);
  const [complet, setcomplet] = useState(false);
  const navigate = useNavigate();
  let { id } = useParams();
  // function about update firestore

  const updateTitle = async (eo) => {
    await updateDoc(doc(db, user.uid, id), {
      title: eo.target.value,
    });
  };
  const updateCompltd = async (eo) => {
    await updateDoc(doc(db, user.uid, id), {
      completed: eo.target.checked,
    });
    if (!complet) {
      setcomplet(true);
    } else {
      setcomplet(false);
    }
  };
  const trush = async (item) => {
    await updateDoc(doc(db, user.uid, id), {
      details: arrayRemove(item),
    });
  };

  const deleteBTN = async () => {
    setshowtask(false);
    await deleteDoc(doc(db, user.uid, id));
    navigate("/", { replace: true });
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
        <Helmet>
          <title>HTML</title>
        </Helmet>
        <Header />
        <main>{error.message}</main>
        <Footer />
      </div>
    );
  }
  if (user) {
    return (
      <div>
        <Helmet>
          <title>Edit task</title>
        </Helmet>
        <Header />
        {!showtask && (
          <main>
            <ReactLoading
              className="mtt"
              type={"spin"}
              color={"#3467c2"}
              height={77}
              width={77}
            />
          </main>
        )}
        {showtask && (
          <div className="edit-task">
            {/* title */}
            <Title
              user={user}
              id={id}
              updateTitle={updateTitle}
              complet={complet}
            />

            {/* sub-task section */}
            <Subtask
              user={user}
              id={id}
              updateCompltd={updateCompltd}
              trush={trush}
            />

            {/* add more && delete btn */}
            <BTN user={user} id={id} deleteBTN={deleteBTN} />
          </div>
        )}
        <Footer />
      </div>
    );
  }
};

export default EditTask;
