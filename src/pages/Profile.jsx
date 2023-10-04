import React from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import Loading from '../Components/Loading';
import { Helmet } from 'react-helmet-async';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Moment from 'react-moment';
import { deleteUser } from "firebase/auth";

const Profile = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const deleteAcct = () => {
    deleteUser(user).then(() => {
      // User deleted.
      console.log("User deleted")
      navigate("/signIn")
    }).catch((error) => {
      // An error ocurred
      // ...
    });
  }

  useEffect(() => {
    if (!user && !loading) {
      navigate("/signIn")
    }
    if (user) {
      if (!user.emailVerified) {
        navigate("/")
      }
    }
  });
  if (loading) {
    return (
      <div>
        <Header />
        <main>< Loading /></main>
        <Footer />
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <Header />
        <main>Error: {error.message}</main>
        <Footer />
      </div>
    );
  }
if (user) {
  if (user.emailVerified) {
    return (
      <div>
        <Helmet>
          <title>Javascript</title>
        </Helmet>
        <Header />
        <main>
          <h6>userName: {user.displayName}</h6>
          <h6>email: {user.email}</h6>
          <h6>Last sign-in: <Moment fromNow>{user.metadata.lastSignInTime}</Moment></h6>
          <h6>Account created: <Moment fromNow>{user.metadata.creationTime}</Moment></h6>
          <button onClick={() => {
            deleteAcct();
          }} className="btn btn2">Delete account</button>
        </main>
        <Footer />
      </div>
    );
  }
}
};

export default Profile;
