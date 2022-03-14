import Link from "next/link";
import React, { useRef, useState } from "react";
import Router from "next/router";
import { Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import api from "../src/services/axios.config";
import { useAppDispatch } from "@redux/store";
import { login } from "@redux/actions";
import { Loading } from "@components";

function signin() {
  const formRef = useRef(null);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    setIsLoading(true);
    api
      .post("/auth/login", {
        email: values.email,
        password: values.password,
      })
      .then(
        (res) => {
          const { token, user } = res?.data;

          setIsLoading(false);
          dispatch(login({ token, user }));
          Router.push(urlParams.get("from") || "/");
        },
        () => setIsLoading(false)
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
          {isLoading && <Loading />}

          <div className="formWrapper shadow-lg">
            <div className="fw-bold h3 mb-5 text-center">Login</div>

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

            <div className="mt-4">
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

            <Button variant="primary" className="w-100 mt-4" type="submit">
              Login
            </Button>

            <div className="mt-4 text-center font-size-14">
              <Link href="/forgot-password">
                <a>Forgot your password?</a>
              </Link>
            </div>

            {/* <div className="my-3 text-center">-- or --</div>
            <div className="bg-facebook w-100 text-center">
              <i className="bi bi-facebook"></i>
              <span className="ms-2">Facebook</span>
            </div>
            <div className="bg-google w-100 mt-2 text-center">
              <i className="bi bi-google"></i>
              <span className="ms-2">Google</span>
            </div> */}

            <div className="mt-2 text-center font-size-14">
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
