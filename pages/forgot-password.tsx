import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import api from "../src/services/axios.config";
import FormikControl from "src/components/form-control/FormikControl";
import SweetAlert from "react-bootstrap-sweetalert";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  const [isShowAlert, setIsShowAlert] = useState(false)

  const router = useRouter();

  const schema = Yup.object().shape({
    email: Yup.string().required().email(),
  });
  const initialValues = {
    email: "",
  };

  const handleSubmit = (values) => {
    console.log('values.email', values.email);

    setIsShowAlert(true)
    // api
    // .post("/auth/forgot-password", { email: values.email })
    // .then(
    //   (res) => {
    //     console.log('res', res)
    //   },
    //   () => {}
    // );
  }

  const onConfirm = () => {
    setIsShowAlert(false);
    router.push('/login')
  }

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values) => handleSubmit(values)}
      initialValues={initialValues}
    >
      {() => (
        <Form>
          <div className="formSignIn d-flex justify-content-center align-items-center">
            <div className="formWrapper shadow-lg text-center">
              <div className="fw-bold h3 mb-3">
                Forgot your password?  
              </div>

              <div>Please enter the email you use to login.</div>

              <FormikControl
                type="text"
                control="input"
                name="email"
                placeholder="Email"
                classNames="mt-3 text-start"
              />

              <Button variant="primary" className="w-100 mt-3" type="submit">
                Reset password
              </Button>

              <div className="mt-3 font-size-14">
                <Link href="/login">
                  <a>Back to Login</a>
                </Link>
              </div>

              {isShowAlert && (
                <SweetAlert
                  custom
                  title="Check your email!"
                  customIcon="/falcon.png"
                  onConfirm={onConfirm}
                  confirmBtnText="Ok"
                  confirmBtnStyle={{ boxShadow: "none" }}
                  btnSize="xs"
                >
                  We have sent a new password to your gmail. Please login again and change your password for security.
                </SweetAlert>
              )}
            </div>
          </div>
        </Form>
      )}  
    </Formik>
  )
}

export default ForgotPassword
