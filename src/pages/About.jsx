import React from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import Loading from '../Components/Loading';
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";

const Html = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !loading) {
      navigate("/signIn");
    }
    if (user) {
      if (!user.emailVerified) {
        navigate("/");
      }
    }
  });
  if (loading) {
    return (
      <div>
        <Header />
        <main> < Loading /> </main>
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
            <title>About</title>
          </Helmet>
          <Header />
          <main>About Page</main>
          <Footer />
        </div>
      );
    }
  }
};

export default Html;
