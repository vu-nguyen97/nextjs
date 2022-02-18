import React from "react";
import { Main, Layout } from "@components";
import AuthRoute from "../src/services/auth.config";

const Home = () => {
  return (
    <Layout>
      <Main title="Store" />
    </Layout>
  );
};

export default AuthRoute(Home);
