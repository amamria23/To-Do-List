import React from "react";
import Header from "../Components/header";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/footer";
import Loading from "../Components/Loading";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import ReactLoading from "react-loading";

const SignUp = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errormes, seterrormes] = useState(false);
  const [message, setmessage] = useState("");
  const [showLoading, setshowLoading] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const signUpBTN = async (eo) => {
    eo.preventDefault();
    setshowLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        //send email verification
        sendEmailVerification(auth.currentUser).then(() => {
          // Email verification sent!
          // ...
          console.log(user)
        });
        //update userName
        updateProfile(auth.currentUser, {
          displayName: username,
        })
          .then(() => {
            // Profile updated!
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        seterrormes(true);
        const errorMessage = error.message;
        console.log(errorMessage);
        setmessage(errorCode);
        // ..
      });
    setshowLoading(false);
  };

  useEffect(() => {
    if (user) {
      if (user.emailVerified) {
        navigate("/");
      }
    }
  });

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
        <main>Error: {error.message}</main>
        <Footer />
      </div>
    );
  }
  if (!user) {
    return (
      <div>
        <Helmet>
          <title>Sign-up</title>
        </Helmet>
        <Header />
        <main>
          <form>
            <h5>Create new account </h5>
            <input
              onChange={(eo) => {
                setusername(eo.target.value);
              }}
              type="text"
              placeholder="username:"
              required
            />
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
                signUpBTN(eo);
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
              have account put on <Link to="/signIn">Sign-in</Link>
            </p>
          </form>
          {errormes && <p>{message}</p>}
        </main>
        <Footer />
      </div>
    );
  }
  if (user) {
    if (!user.emailVerified) {
      return (
        <div>
          <Header />
          <main style={{ alignItems: "center" }}>
            <p>we send you an email to verify your Account</p>
            <button
              onClick={() => {
                sendEmailVerification(auth.currentUser).then(() => {
                  // Email verification sent!
                  // ...
                });
              }}
              className="btn btn2"
            >
              Send again
            </button>
          </main>
          <Footer />
        </div>
      );
    }
  }
};

export default SignUp;
