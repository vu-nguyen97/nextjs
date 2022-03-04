import React, { useState } from "react";
import { ProfileLayout, Loading } from "@components";
import styles from "@styles/pages/profile/general.module.scss";
import AuthRoute from "../../src/services/auth.config";
import { useSelector } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { RootState } from "@redux/store";
import FormikControl from "@components/form-control/FormikControl";
import classNames from "classnames";
import { Button } from "react-bootstrap";
import api from "../../src/services/axios.config";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function General() {
  const [isLoading, setIsLoading] = useState(false);

  const accountInfo = useSelector((state: RootState) => state?.account?.user);
  const router = useRouter();

  const schema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(8)
      .max(32)
      .required("Old password is a required field"),
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

  const onSubmit = (values: any) => {
    setIsLoading(true);
    api({
      method: "post",
      url: "/auth/change-password",
      data: {
        currentPassword: values.oldPassword,
        newPassword: values.password,
      },
    }).then(
      (res) => {
        setIsLoading(false);
        toast(res.data, { type: "success" });

        setTimeout(() => {
          router.push("/login");
        }, 1000);
      },
      () => setIsLoading(false)
    );
  };

  return (
    <ProfileLayout>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values) => onSubmit(values)}
      >
        {({}) => (
          <Form>
            {isLoading && <Loading />}

            <div>
              <h5 className="text-uppercase">Account info</h5>

              <div className="mt-3">
                <div className="mb-2">Email</div>
                <div
                  className={classNames(
                    "text-truncate w-50",
                    styles.disabledInput
                  )}
                >
                  {accountInfo.email}
                </div>
              </div>

              <div className="mt-5">
                <h5 className="text-uppercase">Change password</h5>

                <div className="mt-3">
                  <FormikControl
                    classNames="mt-2 w-50"
                    type="password"
                    control="input"
                    name="oldPassword"
                    placeholder="Old password"
                  />
                  <FormikControl
                    classNames="mt-2 w-50"
                    type="password"
                    control="input"
                    name="password"
                    placeholder="New password"
                  />
                  <FormikControl
                    classNames="mt-2 w-50"
                    type="password"
                    control="input"
                    name="confirmPassword"
                    placeholder="Confirm password"
                  />
                </div>
              </div>

              <Button className="mt-3" type="submit">
                Change
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </ProfileLayout>
  );
}

export default AuthRoute(General);
