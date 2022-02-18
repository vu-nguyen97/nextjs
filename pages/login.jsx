import Link from "next/link";
import React, { useRef } from "react";
import Router from "next/router";
import { Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import api from "../src/services/axios.config";
import { TOKEN } from "../src/components/constants";

function signin() {
  const formRef = useRef(null);

  const schema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values) => {
    api
      .post("/auth/login", {
        email: values.email,
        password: values.password,
      })
      .then(
        (res) => {
          const token = res.data?.data?.token;

          sessionStorage.setItem(TOKEN, token);
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
      {({ touched, errors }) => (
        <Form className="formSignIn d-flex justify-content-center align-items-center">
          <div className="formWrapper shadow-lg">
            <div className="h3 mb-3 text-center">Login</div>

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

            <Button variant="primary" className="w-100 mt-3" type="submit">
              Login
            </Button>

            <div className="my-3 text-center">-- or --</div>
            <div className="bg-facebook w-100 text-center">
              <i className="bi bi-facebook"></i>
              <span className="ms-2">Facebook</span>
            </div>
            <div className="bg-google w-100 mt-2 text-center">
              <i className="bi bi-google"></i>
              <span className="ms-2">Google</span>
            </div>

            <div className="mt-3 text-center">
              Haven't an account ?{" "}
              <Link href="/signup">
                <a>Sign up here</a>
              </Link>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default signin;