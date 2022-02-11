import Link from "next/link";
import React from "react";
import styles from "../src/styles/pages/signin.module.scss";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

function signin() {
  const schema = yup.object().shape({
    email: yup.string().email(),
    password: yup.string().required(),
    city: yup.string().required(),
    // terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
  });

  const initialValues = {
    email: "",
    password: "",
    terms: false,
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={() => console.log("onSubmit")}
      initialValues={initialValues}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form
          noValidate
          onSubmit={handleSubmit}
          className="formSignIn d-flex justify-content-center align-items-center"
        >
          <div className="formWrapper shadow-lg">
            <div className="h3 mb-3 text-center">Sign in</div>

            <Form.Group controlId="validationEmail">
              <Form.Control
                type="text"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />

              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="validationPassword" className="mt-3">
              <Form.Control
                type="text"
                name="password"
                placeholder="Password"
                value={values.email}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />

              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="my-3">
              <Form.Check
                required
                name="terms"
                label="Agree to terms and conditions"
                // onChange={handleChange}
                // isInvalid={!!errors.terms}
                // feedback={errors.terms}
                // feedbacktype="invalid"
                id="validationFormik0"
              />
            </Form.Group>

            <Button variant="primary" className="w-100" type="submit">
              Sign in
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
