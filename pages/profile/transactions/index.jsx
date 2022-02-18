import React from "react";
import { ProfileLayout } from "@components";
import AuthRoute from "../../../src/services/auth.config";

function Transactions() {
  const childrenEl = <div>Transactions</div>;

  return <ProfileLayout children={childrenEl} />;
}

export default AuthRoute(Transactions);
