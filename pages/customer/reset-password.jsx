import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../../src/services/axios.config";
import { Button } from "react-bootstrap";
import FormikControl from "@components/form-control/FormikControl";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Loading } from "@components/";

function ConfirmSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");

  const router = useRouter();

  const schema = Yup.object().shape({
    password: Yup.string()
      .min(8)
      .max(32)
      .required("New password is a required field"),
    confirmPassword: Yup.string()
      .required("Confirm password is a required field")
      .min(8)
      .max(32)
      .oneOf([Yup.ref("password"), null], "passwords must match"),
  });
  const initialValues = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };

  useEffect(() => {
    if (!Object.keys(router.query).length) return;

    // @ts-ignore
    setToken(router.query?.token || "");
  }, [router]);

  const onSubmit = (values) => {
    setIsLoading(true);
    api({
      method: "post",
      url: "/auth/reset-password",
      data: {
        token,
        password: values.password,
      },
    }).then(
      (res) => {
        setIsLoading(false);
        if (res.data && typeof res.data === "string") {
          toast(res.data, { type: "success" });
        }
        setTimeout(() => {
          router.push("/login");
        }, 800);
      },
      () => setIsLoading(false)
    );
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={(values) => onSubmit(values)}
    >
      <Form className="formSignIn d-flex justify-content-center align-items-center">
        {isLoading && <Loading />}

        <div className="formWrapper shadow-lg">
          <div className="text-center fw-bold h4">Reset your password</div>

          <div className="mt-4">
            <div>New password</div>
            <FormikControl
              classNames="mt-2"
              type="password"
              control="input"
              name="password"
            />

            <div className="mt-2">Re-type password</div>
            <FormikControl
              classNames="mt-2"
              type="password"
              control="input"
              name="confirmPassword"
            />
          </div>

          <div className="text-center">
            <Button className="mt-4" type="submit">
              Reset password
            </Button>
          </div>
        </div>
      </Form>
    </Formik>
  );
}

export default ConfirmSignUp;
