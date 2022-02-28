import React from "react";
import FormikControl from "src/components/form-control/FormikControl";

export const BillingForm = () => {
  return (
    <div className="mt-3">
      <div className="h2 text-center">Payment</div>
      <div className="font-size-14 text-uppercase">Billing detail</div>

      <div className="d-flex justify-content-between mt-3">
        <FormikControl
          type="text"
          control="input"
          name="firstName"
          placeholder="First Name"
          classNames="half-width"
        />
        <FormikControl
          type="text"
          control="input"
          name="lastName"
          placeholder="Last Name"
          classNames="half-width"
        />
      </div>

      <div className="mt-3">
        <FormikControl
          type="text"
          control="input"
          name="streetAddress"
          placeholder="Street Address"
          classNames="half-width"
        />
      </div>

      <div className="d-flex justify-content-between mt-3">
        <FormikControl
          type="text"
          control="input"
          name="city"
          placeholder="City"
          classNames="half-width"
        />
        <FormikControl
          type="text"
          control="input"
          name="state"
          placeholder="State"
          classNames="half-width"
        />
      </div>

      <div className="d-flex justify-content-between mt-3">
        <FormikControl
          type="text"
          control="input"
          name="postalCode"
          placeholder="Postal code"
          classNames="half-width"
        />
        <FormikControl
          type="text"
          control="input"
          name="country"
          placeholder="Country"
          classNames="half-width"
        />
      </div>

      <div className="mt-3">
        <FormikControl
          type="text"
          control="input"
          name="phoneNumber"
          placeholder="Phone number"
          classNames="half-width"
        />
      </div>
    </div>
  );
};
