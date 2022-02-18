import React from "react";
import { Layout, Main } from "@components";
import AuthRoute from "../src/services/auth.config";

function faq() {
  return (
    <Layout>
      <Main title="FAQ" />
    </Layout>
  );
}

export default AuthRoute(faq);
