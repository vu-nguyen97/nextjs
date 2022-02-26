import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormikControl from "src/components/form-control/FormikControl";

export const BillingForm = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
  };
  const schema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    streetAddress: Yup.string().required(),
    city: Yup.string().required(),
    state: Yup.string().required(),
    country: Yup.string().required(),
    postalCode: Yup.string().required(),
    phoneNumber: Yup.string().required(),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => {}}
      validationSchema={schema}
    >
      {(formik) => (
        <Form>
          <div className="mt-3">
            <div className="font-size-14 text-uppercase">Billing detail</div>

            <div className="d-flex justify-content-between mt-3">
              <FormikControl
                type="text"
                control="input"
                formik={formik}
                name="firstName"
                placeholder="First Name"
                classNames="half-width"
              />
              <FormikControl
                type="text"
                control="input"
                formik={formik}
                name="lastName"
                placeholder="Last Name"
                classNames="half-width"
              />
            </div>

            <div className="mt-3">
              <FormikControl
                type="text"
                control="input"
                formik={formik}
                name="streetAddress"
                placeholder="Street Address"
                classNames="half-width"
              />
            </div>

            <div className="d-flex justify-content-between mt-3">
              <FormikControl
                type="text"
                control="input"
                formik={formik}
                name="city"
                placeholder="City"
                classNames="half-width"
              />
              <FormikControl
                type="text"
                control="input"
                formik={formik}
                name="state"
                placeholder="State"
                classNames="half-width"
              />
            </div>

            <div className="d-flex justify-content-between mt-3">
              <FormikControl
                type="text"
                control="input"
                formik={formik}
                name="postalCode"
                placeholder="Postal code"
                classNames="half-width"
              />
              <FormikControl
                type="text"
                control="input"
                formik={formik}
                name="country"
                placeholder="Country"
                classNames="half-width"
              />
            </div>

            <div className="mt-3">
              <FormikControl
                type="text"
                control="input"
                formik={formik}
                name="phoneNumber"
                placeholder="Phone number"
                classNames="half-width"
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
