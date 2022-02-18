import React, { useEffect } from "react";
import Router, { useRouter } from "next/router";
import api from "../../src/services/axios.config";

function ConfirmSignUp() {
  const router = useRouter();

  useEffect(() => {
    if (!Object.keys(router.query).length) return;

    api
      .get(
        `/auth/register/confirmation?i=${router.query?.i}&t=${router.query?.t}`
      )
      .then(
        () => {
          setTimeout(() => {
            Router.push("/login");
          }, 800);
        },
        (err) => console.log("err", err)
      );
  }, [router]);

  return <></>;
}

export default ConfirmSignUp;
