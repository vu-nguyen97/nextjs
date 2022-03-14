import React, { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import api from "../src/services/axios.config";
import Router from "next/router";
import FormikControl from "src/components/form-control/FormikControl";
import SweetAlert from "react-bootstrap-sweetalert";

function signup() {
  const formRef = useRef(null);
  const [isConfirmEmail, setIsConfirmEmail] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required().min(8).max(32),
    confirmPassword: Yup.string()
      .required("Confirm Password is a required field")
      .min(8)
      .max(32)
      .oneOf([Yup.ref("password"), null], "passwords must match"),
  });

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values) => {
    api
      .post("/auth/register", {
        email: values.email,
        password: values.password,
      })
      .then(
        () => setIsConfirmEmail(true),
        () => {}
      );
  };

  const onConfirmAlert = () => {
    Router.push("https://mail.google.com/");
    setIsConfirmEmail(false);
  };

  return (
    <Formik
      innerRef={formRef}
      validationSchema={schema}
      onSubmit={(values) => handleSubmit(values)}
      initialValues={initialValues}
    >
      {(formik) => (
        <Form className="formSignUp d-flex justify-content-center align-items-center">
          <div className="formWrapper shadow-lg">
            <div className="fw-bold h3 mb-5 text-center">Sign up</div>

            <FormikControl
              type="text"
              control="input"
              name="email"
              placeholder="Email"
            />
            <FormikControl
              classNames="mt-4"
              type="password"
              control="input"
              name="password"
              placeholder="Password"
            />
            <FormikControl
              classNames="mt-4"
              type="password"
              control="input"
              name="confirmPassword"
              placeholder="Confirm password"
            />

            {/* <div className="d-flex align-items-center mt-2">
              <Field type="checkbox" name="terms" className="me-2" />
              <div className="d-flex align-items-center">
                <label htmlFor="terms" className="font-size-14">
                  I have read and agree to the
                </label>
                <span className="font-size-14 ms-1">
                  <a href="#">terms of service</a>
                </span>
              </div>
            </div> */}

            <Button variant="primary" className="w-100 mt-4" type="submit">
              Sign up
            </Button>

            {/* <div className="my-3 text-center">-- or --</div>
            <div className="bg-facebook w-100 mt-3 text-center">
              <i className="bi bi-facebook"></i>
              <span className="ms-2">Facebook</span>
            </div>
            <div className="bg-google w-100 mt-2 text-center">
              <i className="bi bi-google"></i>
              <span className="ms-2">Google</span>
            </div> */}

            <div className="mt-4 text-center font-size-14">
              Have already an account ?{" "}
              <Link href="/login">
                <a>Login here</a>
              </Link>
            </div>
          </div>

          {isConfirmEmail && (
            <SweetAlert
              custom
              title="Confirm your email address"
              customIcon="/falcon.png"
              onConfirm={onConfirmAlert}
              onCancel={() => setIsConfirmEmail(false)}
              confirmBtnText="Confirm Email"
              confirmBtnBsStyle="success"
              confirmBtnStyle={{ boxShadow: "none" }}
              btnSize="xs"
            >
              To finish signing up, please confirm your email address. This
              ensures we have the right email in case we need to contact you.
            </SweetAlert>
          )}
        </Form>
      )}
    </Formik>
  );
}

export default signup;
