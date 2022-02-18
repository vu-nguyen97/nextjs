import React from "react";
import { ProfileLayout } from "@components";
import AuthRoute from "../../../src/services/auth.config";

function Comunications() {
  const childrenEl = <div>Comunications</div>;

  return <ProfileLayout children={childrenEl} />;
}

export default AuthRoute(Comunications);
