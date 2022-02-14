import React from "react";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

function signup() {
  const schema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
    confirmPassword: Yup.string().required(),
  });

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values) => console.log("onSubmit", values)}
      initialValues={initialValues}
    >
      {({ touched, errors }) => (
        <Form className="formSignUp d-flex justify-content-center align-items-center">
          <div className="formWrapper shadow-lg">
            <div className="h3 mb-3 text-center">Sign up</div>

            <div>
              <Field
                type="text"
                name="email"
                placeholder="Email"
                className={
                  touched.email && errors.email
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
              {touched.email && errors.email ? (
                <div className="invalid-feedback">{errors.email}</div>
              ) : null}
            </div>

            <div className="mt-3">
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className={
                  touched.password && errors.password
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
              {touched.password && errors.password ? (
                <div className="invalid-feedback">{errors.password}</div>
              ) : null}
            </div>

            <div className="mt-3">
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                className={
                  touched.confirmPassword && errors.confirmPassword
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
              {touched.confirmPassword && errors.confirmPassword ? (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              ) : null}
            </div>

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
