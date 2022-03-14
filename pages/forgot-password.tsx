import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import api from "../src/services/axios.config";
import FormikControl from "src/components/form-control/FormikControl";
import SweetAlert from "react-bootstrap-sweetalert";
import { useRouter } from "next/router";
import { Loading } from "@components/";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [alertContent, setAlertContent] = useState("");

  const router = useRouter();

  const schema = Yup.object().shape({
    email: Yup.string().required().email(),
  });
  const initialValues = {
    email: "",
  };

  const handleSubmit = (values: any) => {
    setIsLoading(true);

    api({
      method: "post",
      url: "/auth/send-mail-reset-password",
      data: { email: values.email },
    }).then(
      (res) => {
        setAlertContent(res.data || "");
        setIsLoading(false);
      },
      () => setIsLoading(false)
    );
  };

  const onConfirm = () => {
    setAlertContent("");
    router.push("/login");
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values) => handleSubmit(values)}
      initialValues={initialValues}
    >
      {() => (
        <Form>
          {isLoading && <Loading />}

          <div className="formSignIn d-flex justify-content-center align-items-center">
            <div className="formWrapper shadow-lg text-center">
              <div className="fw-bold h3 mb-3">Forgot your password?</div>

              <div>
                Insert your e-mail and we will send you a link to create your
                new password.
              </div>

              <FormikControl
                type="text"
                control="input"
                name="email"
                placeholder="Email"
                classNames="mt-4 text-start"
              />

              <Button variant="primary" className="w-100 mt-4" type="submit">
                Reset password
              </Button>

              <div className="mt-3 font-size-14">
                <Link href="/login">
                  <a>Back to Login</a>
                </Link>
              </div>

              {alertContent && (
                <SweetAlert
                  custom
                  title="Check your email!"
                  customIcon="/falcon.png"
                  onConfirm={onConfirm}
                  confirmBtnText="Ok"
                  confirmBtnStyle={{ boxShadow: "none" }}
                  btnSize="xs"
                >
                  {alertContent}
                </SweetAlert>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPassword;
