import React from "react";
import { Header, Main, Footer } from "@components";
import AuthRoute from "../src/services/auth.config";

const Home = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Main title="Store" />
      <Footer />
    </div>
  );
};

export default AuthRoute(Home);
