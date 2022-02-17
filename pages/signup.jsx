import React, { useRef } from "react";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import api from "../src/services/axios.config";
import Router from "next/router";
import FormikControl from "src/components/form-control/FormikControl";

function signup() {
  const formRef = useRef(null);

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
        (response) => {
          console.log("response", response);
          Router.push("/");
        },
        () => {}
      );
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
            <div className="h3 mb-3 text-center">Sign up</div>

            <FormikControl
              type="text"
              control="input"
              formik={formik}
              name="email"
              placeholder="Email"
            />
            <FormikControl
              classNames="mt-3"
              type="password"
              control="input"
              formik={formik}
              name="password"
              placeholder="Password"
            />
            <FormikControl
              classNames="mt-3"
              type="password"
              control="input"
              formik={formik}
              name="confirmPassword"
              placeholder="Confirm password"
            />

            <div className="d-flex align-items-center mt-2">
              <Field type="checkbox" name="terms" className="me-2" />
              <div className="d-flex align-items-center">
                <label htmlFor="terms" className="font-size-14">
                  I have read and agree to the
                </label>
                <span className="font-size-14 ms-1">
                  <a href="#">terms of service</a>
                </span>
              </div>
            </div>

            <Button variant="primary" className="w-100 mt-3" type="submit">
              Sign up
            </Button>

            <div className="my-3 text-center">-- or --</div>
            <div className="bg-facebook w-100 mt-3 text-center">
              <i className="bi bi-facebook"></i>
              <span className="ms-2">Facebook</span>
            </div>
            <div className="bg-google w-100 mt-2 text-center">
              <i className="bi bi-google"></i>
              <span className="ms-2">Google</span>
            </div>

            <div className="mt-3 text-center">
              Have already an account ?{" "}
              <Link href="/login">
                <a>Login here</a>
              </Link>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default signup;
