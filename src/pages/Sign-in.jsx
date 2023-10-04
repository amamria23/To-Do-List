import React from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import Modal from "./Shared/Modal";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false);
  const [message, setmessage] = useState("");
  const [showLoading, setshowLoading] = useState(false);
  const [notfica, setnotfica] = useState(false);
  const resetPass = (eo) => {
    eo.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
        console.log("Password reset email sent!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode);
        console.log(errorMessage);
      });
    setnotfica(true);
  };
  const signInBTN = async(eo) => {
    eo.preventDefault();
    setshowLoading(true)
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        seterror(true);
        setmessage(errorCode);
      });
      setshowLoading(false)
  };
  //lvl3
  const [modal, setModal] = useState(false);
  const closeModal = () => {
    setModal(false);
  };
  return (
    <div>
      <Helmet>
        <title>Sign-in</title>
      </Helmet>
      <Header />
      <main>
        {modal && (
          <Modal closeModal={closeModal}>
            <input
              onChange={(eo) => {
                setemail(eo.target.value);
              }}
              type="email"
              placeholder="email:"
              required
            />
            <button
              onClick={(eo) => {
                resetPass(eo);
              }}
              className="btn"
            >
              Reset email
            </button>
            {notfica && <p>check email to reset password</p>}
          </Modal>
        )}
        <form>
          <input
            onChange={(eo) => {
              setemail(eo.target.value);
            }}
            type="email"
            placeholder="email:"
            required
          />
          <input
            onChange={(eo) => {
              setpassword(eo.target.value);
            }}
            type="password"
            placeholder="password:"
            required
          />
          <button
            onClick={(eo) => {
              signInBTN(eo);
            }}
            className="btn"
          >
              {showLoading ? (
                <ReactLoading
                  type={"spin"}
                  color={"white"}
                  height={20}
                  width={20}
                />
              ) : (
                "Sign-Up"
              )}
          </button>
          <p>
            have not account plz <Link to="/signUp">Sign-up</Link>
          </p>
          <p
            onClick={() => {
              setModal(true);
            }}
            className="forgot"
          >
            forgot password
          </p>
        </form>
        {error && <p>{message}</p>}
      </main>

      <Footer />
    </div>
  );
};

export default SignIn;
