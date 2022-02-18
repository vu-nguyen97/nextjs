import React from "react";
import { Layout, Main } from "@components";
import AuthRoute from "../src/services/auth.config";

function help() {
  return (
    <Layout>
      <Main title="Help" />
    </Layout>
  );
}

export default AuthRoute(help);
